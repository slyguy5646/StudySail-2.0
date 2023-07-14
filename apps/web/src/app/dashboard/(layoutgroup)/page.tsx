import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function Done() {
  const { userId } = auth();
  if (!userId) redirect("/");
  const docs = await prisma.document.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });

  if (docs.length > 0) {
    redirect(`/dashboard/${docs[0].id}`);
  }else {
    redirect("/dashboard/add-new")
  }

  return <></>;
}
