import { checkAuth } from "../actions";
import AdminClient from "./AdminClient";
import Header from "@/components/Header";

export const metadata = {
  title: "Admin | EPCOS Engenharia",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const isAuth = await checkAuth();

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl px-6 relative z-10">
        <AdminClient initialAuth={isAuth} />
      </div>
    </main>
  );
}
