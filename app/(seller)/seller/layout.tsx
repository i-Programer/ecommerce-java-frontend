// import { SidebarProvider } from "@/components/ui/sidebar";

import { Sidebar } from "@/components/seller/dashboard/Sidebar";
import { Header } from "@/components/seller/dashboard/Header";


export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}