import { ReactNode } from "react";
import Navbar from "@/components/Dashboard/Nav/DashboardNav";
import "../../dash.css";
import { prisma } from "@/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardRouterProvider from "@/components/Dashboard/Nav/DashboardRouterContext";

export default async function DashLayout({ children }: { children: ReactNode }) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const documents = await prisma.document.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
  return (
    <div>
      <DashboardRouterProvider>
        <Navbar documents={documents}>{children}</Navbar>
      </DashboardRouterProvider>
    </div>
  );
}
