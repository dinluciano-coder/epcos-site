import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";

export const metadata = {
  title: "Política de Privacidade | EPCOS Engenharia",
  description: "Como a EPCOS trata e protege seus dados em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32">
      <Header />
      
      <section className="max-w-4xl mx-auto px-6 py-16 text-[#F5F5F7]">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Política de Privacidade</h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[#00D4FF] prose-a:text-[#00D4FF] hover:prose-a:text-white prose-a:transition-colors">
          <p className="lead text-[#A0A0A0]">
            A EPCOS Engenharia valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">1. Coleta de Dados</h2>
          <p className="text-[#A0A0A0]">
            Coletamos as seguintes informações quando você interage com nosso site:
          </p>
          <ul className="text-[#A0A0A0] list-disc pl-6 space-y-2 mb-6">
            <li><strong>Dados de Contato:</strong> Nome, E-mail, Telefone e Empresa (coletados via formulários de contato ou download de materiais).</li>
            <li><strong>Dados de Navegação:</strong> Cookies, endereço IP, tipo de navegador e páginas visitadas (utilizados para estatísticas e melhorias de performance).</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">2. Uso dos Dados</h2>
          <p className="text-[#A0A0A0]">
            As informações coletadas são utilizadas exclusivamente para as seguintes finalidades:
          </p>
          <ul className="text-[#A0A0A0] list-disc pl-6 space-y-2 mb-6">
            <li>Responder às suas solicitações de contato e enviar propostas comerciais.</li>
            <li>Liberar acesso a materiais ricos (logotipo, apresentações institucionais) em nosso portal.</li>
            <li>Melhorar a experiência de navegação no site (através de cookies de performance).</li>
            <li>Cumprir obrigações legais ou regulatórias.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">3. Compartilhamento de Dados</h2>
          <p className="text-[#A0A0A0]">
            A EPCOS Engenharia <strong>não vende, aluga ou compartilha</strong> seus dados pessoais com terceiros não autorizados. Os dados podem ser compartilhados apenas com parceiros tecnológicos (como provedores de hospedagem e envio de e-mails) estritamente necessários para o funcionamento do serviço, sempre sob rigorosos contratos de confidencialidade.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">4. Política de Cookies</h2>
          <p className="text-[#A0A0A0]">
            Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os visitantes interagem com nossas páginas. Você pode gerenciar suas preferências de cookies através do banner flutuante em nosso site ou diretamente nas configurações do seu navegador.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">5. Direitos do Titular</h2>
          <p className="text-[#A0A0A0]">
            Conforme a LGPD, você tem o direito de:
          </p>
          <ul className="text-[#A0A0A0] list-disc pl-6 space-y-2 mb-6">
            <li>Confirmar a existência de tratamento dos seus dados.</li>
            <li>Acessar, corrigir ou atualizar seus dados incompletos ou desatualizados.</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
          </ul>
          <p className="text-[#A0A0A0]">
            Para exercer seus direitos, entre em contato conosco através do e-mail oficial disponível na página de contato.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">6. Alterações nesta Política</h2>
          <p className="text-[#A0A0A0]">
            Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento para garantir conformidade com novas exigências legais ou adaptações operacionais. Recomendamos a visita periódica a esta página.
          </p>

          <p className="mt-12 text-sm text-[#6B6B6B]">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
