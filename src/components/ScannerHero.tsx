"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Ray {
  spreadOffset: number;  // offset fixo do ângulo central (leque)
  speed: number;
  phase: number;
  width: number;
  reach: number;
  color: [number, number, number];
}

interface ImpactParticle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; hue: number;
}

// Arco permitido (risco amarelo): upper-left ↔ lower-left. Arco reduzido pela metade.
const ARC_MIN = 137.5 * Math.PI / 180;   // ~137.5°
const ARC_MAX = 202.5 * Math.PI / 180;   // ~202.5°
const ARC_CENTER = (ARC_MIN + ARC_MAX) / 2;  // ~170°, ligeiramente acima da horizontal

export default function ScannerHero() {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const animRef         = useRef<number>(0);
  const sectionRef      = useRef<HTMLDivElement>(null);
  const scannerImgRef   = useRef<HTMLDivElement>(null);   // rotação 2D via DOM
  const textDivRef      = useRef<HTMLDivElement>(null);
  const scanLineRef     = useRef<HTMLDivElement>(null);

  // Mouse em coordenadas de cliente
  const mouseRef        = useRef({ x: -1, y: -1 });
  // Ângulo suavizado (interpolado frame a frame)
  const smoothAimRef    = useRef(ARC_CENTER);

  const scanRef = useRef({
    intensity: 0,
    particles: [] as ImpactParticle[],
  });

  const stateRef = useRef({ rays: [] as Ray[], t: 0, W: 0, H: 0 });

  const [visible,    setVisible]    = useState(false);
  const [isHovered,  setIsHovered]  = useState(false);
  const [counter,    setCounter]    = useState(0);
  const [scanActive, setScanActive] = useState(false);

  // ── Intersection Observer ──────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Counter ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(v + 1020000 / 90, 1020000);
      setCounter(Math.floor(v));
      if (v >= 1020000) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [visible]);

  // ── Mouse & Touch tracking ─────────────────────────────────────────────────
  const onSectionPointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    mouseRef.current = { x: clientX, y: clientY };
  }, []);
  const onSectionPointerLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);

  // ── Canvas loop ────────────────────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rebuild = () => {
      const W = canvas.width;
      const H = canvas.height;
      stateRef.current.W = W;
      stateRef.current.H = H;

      // Paleta ajustada para tons de azul/violeta baseados na imagem de referência
      const palette: [number, number, number][] = [
        [100, 130, 255], [120, 140, 255], [110, 120, 255],
        [140, 150, 255], [105, 115, 250], [90, 110, 255],
        [130, 145, 255], [85, 100, 245],
      ];

      // Leque de 22 raios espalhados ±22° ao redor do ângulo central
      const spreadTotal = 44 * Math.PI / 180;  // 44° total
      stateRef.current.rays = Array.from({ length: 22 }, (_, i) => ({
        spreadOffset: (i / 21 - 0.5) * spreadTotal,
        speed:        0.35 + Math.random() * 0.55,
        phase:        Math.random() * Math.PI * 2,
        width:        0.5 + Math.random() * 2.4,
        reach:        0.35 + Math.random() * 0.15, // Alcance aumentado significativamente
        color:        palette[i % palette.length],
      }));
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      rebuild();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = performance.now();
    let prevScanActive = false;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const s  = stateRef.current;
      const sc = scanRef.current;
      const { W, H } = s;
      if (!W || !H) { animRef.current = requestAnimationFrame(draw); return; }

      // ── Posição da lente (cálculo dinâmico e responsivo) ───────────────────
      // Em vez de posição fixa, lemos a posição real da imagem na tela (mobile/PC)
      let lx = W * 0.835;
      let ly = H * 0.285;
      if (scannerImgRef.current) {
        const rect = scannerImgRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        // A lente (pivô) está em 65% width e 28% height da imagem
        lx = (rect.left - canvasRect.left + rect.width * 0.65) * (W / canvasRect.width);
        ly = (rect.top - canvasRect.top + rect.height * 0.28) * (H / canvasRect.height);
      }

      // ── Calcula ângulo alvo com base no mouse ──────────────────────────────
      const { x: mx, y: my } = mouseRef.current;
      let targetAim = ARC_CENTER;

      if (mx >= 0 && my >= 0) {
        const rect = canvas.getBoundingClientRect();
        const cmx  = (mx - rect.left)  * (W / rect.width);
        const cmy  = (my - rect.top)   * (H / rect.height);

        const rawAngle = Math.atan2(cmy - ly, cmx - lx);

        // Clamp ao arco permitido (risco amarelo)
        // atan2 retorna -π..π; normaliza para 0..2π
        const norm = rawAngle < 0 ? rawAngle + 2 * Math.PI : rawAngle;
        targetAim  = Math.max(ARC_MIN, Math.min(ARC_MAX, norm));
      }

      // Suaviza o ângulo (lerpring para evitar saltos bruscos)
      smoothAimRef.current += (targetAim - smoothAimRef.current) * 0.10;
      const aim = smoothAimRef.current;

      // ── Rotação 2D do scanner (sem perspectiva) ────────────────────────────
      // aim=ARC_CENTER → 0°; aim=ARC_MIN → ~-15°; aim=ARC_MAX → ~+15° (ajustado para o novo arco)
      const halfArc = (ARC_MAX - ARC_MIN) / 2;
      const rotDeg  = ((aim - ARC_CENTER) / halfArc) * 15;  // ±15° máx (metade da rotação anterior)
      if (scannerImgRef.current) {
        scannerImgRef.current.style.transform = `rotate(${rotDeg.toFixed(2)}deg)`;
      }

      // ── Intensidade de varredura (ativo se mouse estiver na seção) ─────────
      const isScanning = mx >= 0 && my >= 0;
      const targetIntensity = isScanning ? 1 : 0;
      sc.intensity += (targetIntensity - sc.intensity) * 0.08;

      if ((sc.intensity > 0.1) !== prevScanActive) {
        prevScanActive = sc.intensity > 0.1;
        setScanActive(sc.intensity > 0.1);
      }

      // Glow difuso no texto
      if (textDivRef.current) {
        textDivRef.current.style.filter = sc.intensity > 0.05
          ? `drop-shadow(0 0 ${sc.intensity * 12}px rgba(60,200,255,0.65))`
          : "";
      }
      // Scan line CSS
      if (scanLineRef.current) {
        scanLineRef.current.style.opacity = sc.intensity > 0.05
          ? String(sc.intensity * 0.85)
          : "0";
      }

      // ── Trail ──────────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(5,8,18,0.22)";
      ctx.fillRect(0, 0, W, H);

      const boost = isHovered ? 1.3 : 1;

      // ── Raios seguindo o mouse ─────────────────────────────────────────────
      s.rays.forEach((ray) => {
        const wobble = Math.sin(s.t * ray.speed + ray.phase) * 0.038
                     + Math.sin(s.t * ray.speed * 2.1 + ray.phase + 1.4) * 0.018;
        const angle  = aim + ray.spreadOffset + wobble;
        const len    = W * ray.reach * boost;

        const ex = lx + Math.cos(angle) * len;
        const ey = ly + Math.sin(angle) * len;

        const perp = angle + Math.PI * 0.5;
        const flex = Math.sin(s.t * ray.speed * 0.88 + ray.phase + 2.3) * len * 0.20;
        const cpx  = lx + Math.cos(angle) * len * 0.5 + Math.cos(perp) * flex;
        const cpy  = ly + Math.sin(angle) * len * 0.5 + Math.sin(perp) * flex;

        const [r, g, b] = ray.color;
        const alpha = (0.28 + Math.sin(s.t * ray.speed * 1.8 + ray.phase) * 0.12) * boost;

        const grad = ctx.createLinearGradient(lx, ly, ex, ey);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${Math.min(alpha * 2.2, 1)})`);
        grad.addColorStop(0.55, `rgba(${r},${g},${b},${alpha * 0.55})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.quadraticCurveTo(cpx, cpy, ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = ray.width * 1.2;
        ctx.shadowColor = `rgba(${r},${g},${b},0.60)`;
        ctx.shadowBlur  = 12 * boost;
        ctx.stroke();
        ctx.restore();

        // Partículas na ponta dos raios quando escaneando
        if (isScanning && Math.random() < 0.04 * sc.intensity) {
          sc.particles.push({
            x: ex, y: ey,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0, maxLife: 20 + Math.random() * 30,
            size: 0.7 + Math.random() * 1.6,
            hue: 230 + Math.random() * 15, // Hue azul/violeta correspondente aos raios
          });
        }
      });

      // ── Glow na lente ─────────────────────────────────────────────────────
      const gr = (38 + Math.sin(s.t * 2.4) * 7) * boost;
      const gl = ctx.createRadialGradient(lx, ly, 0, lx, ly, gr);
      gl.addColorStop(0,    `rgba(120,140,255,${0.45 * boost})`);
      gl.addColorStop(0.45, `rgba(100,120,255,${0.16 * boost})`);
      gl.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = gl;
      ctx.beginPath();
      ctx.arc(lx, ly, gr, 0, Math.PI * 2);
      ctx.fill();

      // ── Partículas ────────────────────────────────────────────────────────
      sc.particles = sc.particles.filter((p) => {
        p.life++;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.04;
        const prog = p.life / p.maxLife;
        const a    = (1 - prog) * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - prog * 0.3), 0, Math.PI * 2);
        ctx.fillStyle   = `hsla(${p.hue},100%,78%,${a})`;
        ctx.shadowColor = `hsla(${p.hue},100%,78%,0.5)`;
        ctx.shadowBlur  = 5;
        ctx.fill();
        return p.life < p.maxLife;
      });
      if (sc.particles.length > 180) sc.particles = sc.particles.slice(-140);

      s.t += 0.020;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  const hudData = [
    { label: "Precisão",  value: "até 0,02 mm",                                         color: "#64c8ff" },
    { label: "Pontos/s",  value: `até ${counter.toLocaleString("pt-BR")}`, subText: "no modo laser azul de 34 linhas", color: "#a855f7" },
    { label: "Cobertura", value: "360°",                                                color: "#f472b6" },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-3xl"
      style={{
        background: "linear-gradient(135deg,#05080f 0%,#0b1122 55%,#090415 100%)",
        minHeight: "clamp(360px,48vw,500px)",
      }}
      onMouseMove={onSectionPointerMove}
      onMouseLeave={onSectionPointerLeave}
      onTouchMove={onSectionPointerMove}
      onTouchStart={onSectionPointerMove}
      onTouchEnd={onSectionPointerLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Grid de pontos */}
      <div className="absolute inset-0 opacity-[0.09]" style={{
        backgroundImage: "radial-gradient(circle,rgba(80,180,255,0.5) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }}
      />

      <div
        className="relative flex flex-col lg:flex-row items-center h-full px-6 lg:px-10 py-10 gap-6 lg:gap-0"
        style={{ zIndex: 10 }}
      >
        {/* ESQUERDA — texto */}
        <div
          ref={textDivRef}
          className="flex flex-col gap-5 lg:w-[55%] lg:pr-6"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease, filter 0.15s ease",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Linha de varredura CSS — sem bordas visíveis */}
          <div
            ref={scanLineRef}
            style={{
              position: "absolute",
              left: "-8%", width: "116%",
              height: "1px",
              background: "linear-gradient(90deg,transparent 0%,rgba(60,210,255,0.85) 25%,rgba(160,240,255,1) 50%,rgba(60,210,255,0.85) 75%,transparent 100%)",
              boxShadow: "0 0 22px 14px rgba(60,200,255,0.25), 0 0 6px 3px rgba(120,240,255,0.45)",
              pointerEvents: "none",
              opacity: 0,
              top: 0,
              zIndex: 30,
              animation: "scanSweep 1.4s linear infinite",
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background: "rgba(80,180,255,0.10)", border: "1px solid rgba(80,180,255,0.22)", color: "#64c8ff" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#64c8ff] animate-pulse" />
              Tecnologia de Precisão
            </span>
            {scanActive && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(60,200,255,0.14)",
                  border: "1px solid rgba(60,200,255,0.48)",
                  color: "#60e0ff",
                  animation: "scanPulse 0.8s ease-in-out infinite",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#60e0ff]" />
                Escaneando...
              </span>
            )}
          </div>

          <h3
            className="text-2xl lg:text-[1.9rem] font-extrabold leading-snug"
            style={{ color: "#eef8ff" }}
          >
            Scanner 3D em ação —{" "}
            <span style={{
              background: "linear-gradient(90deg,#64c8ff,#a855f7,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              precisão real, resultado digital.
            </span>
          </h3>

          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(190,215,255,0.60)" }}>
            Cada varredura captura milhões de pontos em milissegundos, transformando geometrias complexas em modelos prontos para engenharia reversa.
          </p>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 lg:mt-1">
            {hudData.map(hud => (
              <div
                key={hud.label}
                className="flex flex-col gap-1 sm:gap-2 rounded-xl p-2 sm:p-3 backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${hud.color}2e`,
                  boxShadow: `0 0 14px ${hud.color}12`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: hud.color }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: hud.color }} />
                  </span>
                  <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: hud.color }}>
                    {hud.label}
                  </span>
                </div>
                <span className="text-base font-extrabold" style={{ color: "#eef8ff" }}>
                  {hud.value}
                </span>
                {hud.subText && (
                  <span className="text-[9px] leading-tight mt-0.5" style={{ color: "rgba(190,215,255,0.45)" }}>
                    {hud.subText}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            paddingRight: 0,
          }}
        >
          {/* Float wrapper */}
          <div
            style={{
              animation: "scannerFloat 4.5s ease-in-out infinite",
              filter: isHovered
                ? "drop-shadow(0 0 36px rgba(80,180,255,0.85)) drop-shadow(0 0 70px rgba(168,85,247,0.55))"
                : "drop-shadow(0 0 18px rgba(80,180,255,0.38)) drop-shadow(0 0 42px rgba(168,85,247,0.20))",
              transition: "filter 0.4s ease",
            }}
          >
            {/* Div que recebe rotate() 2D via DOM — sem perspectiva 3D */}
            <div
              ref={scannerImgRef}
              style={{
                transformOrigin: "65% 28%",  // pivô na lente (cabeça óptica)
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            >
              <Image
                src="/scanner.png"
                alt="Scanner 3D de alta precisão"
                width={380}
                height={420}
                className="object-contain select-none w-auto"
                style={{
                  maxHeight: "clamp(240px,40vw,440px)",
                  mixBlendMode: "multiply",
                  filter: "brightness(1.06) contrast(1.08)",
                  pointerEvents: "none",
                  display: "block",
                }}
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hint: aparece quando mouse não está sobre a seção */}
      {visible && !isHovered && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide select-none pointer-events-none"
          style={{
            background: "rgba(80,180,255,0.08)",
            border: "1px solid rgba(80,180,255,0.18)",
            color: "rgba(100,200,255,0.65)",
            animation: "hintPulse 2.5s ease-in-out infinite",
          }}
        >
          ✦ Mova o dedo ou mouse para escanear
        </div>
      )}

      <style>{`
        @keyframes scannerFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes hintPulse {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes scanPulse {
          0%,100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
        @keyframes scanSweep {
          0%   { top: -2%; }
          100% { top: 102%; }
        }
      `}</style>
    </div>
  );
}
