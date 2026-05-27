"use server";

import { list, del, put } from "@vercel/blob";
import { cookies } from "next/headers";

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "Epcos327905";
  
  if (password === adminPassword) {
    (await cookies()).set("epcos_admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }
  
  return { success: false, error: "Senha incorreta" };
}

export async function logout() {
  (await cookies()).delete("epcos_admin_session");
  return { success: true };
}

export async function checkAuth() {
  const session = (await cookies()).get("epcos_admin_session");
  return session?.value === "true";
}

export async function getFiles() {
  try {
    const { blobs } = await list();
    return { success: true, files: blobs };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { success: false, error: "Falha ao carregar arquivos. Verifique o BLOB_READ_WRITE_TOKEN." };
  }
}

export async function deleteFile(url: string) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Não autorizado" };

  try {
    await del(url);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Falha ao deletar arquivo." };
  }
}

export async function uploadFileAction(formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "Arquivo inválido" };

  try {
    const blob = await put(file.name, file, { access: 'public' });
    return { success: true, url: blob.url };
  } catch (error: any) {
    console.error("Server upload error:", error);
    return { success: false, error: error.message || "Falha ao comunicar com a Vercel" };
  }
}
