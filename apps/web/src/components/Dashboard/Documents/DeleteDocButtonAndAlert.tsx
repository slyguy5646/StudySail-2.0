"use client";

import { IconTrash } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDash } from "../Nav/DashboardRouterContext";

export default function DeleteDocButtonAndAlert({ docId, docTitle }: { docId: number; docTitle: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { router } = useDash();

  async function deleteDoc() {
    const res = await fetch("/api/delete-doc", { method: "POST", body: JSON.stringify({ id: docId }) });
    router.refresh();
    router.push("/dashboard");
  }
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <IconTrash className="w-8 h-8 text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 hover:bg-opacity-80 hover:cursor-pointer rounded-md p-1" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="text-cyan-500 font-semibold">{docTitle}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nope</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteDoc()} className="bg-red-500 hover:bg-red-600">
              Yup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
