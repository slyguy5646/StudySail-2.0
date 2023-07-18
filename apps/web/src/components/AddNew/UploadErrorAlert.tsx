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
import { Dispatch, SetStateAction, useState } from "react";
import { useDash } from "../Dashboard/Nav/DashboardRouterContext";

export default function UploadError({
  title,
  description,
  open,
  setOpen,
}: {
  title: string | null;
  description: string | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //   const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AlertDialog open={open && title != null && description != null} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger>
          <IconTrash className="w-8 h-8 text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 hover:bg-opacity-80 hover:cursor-pointer rounded-md p-1" />
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-cyan-500 hover:bg-cyan-600">Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
