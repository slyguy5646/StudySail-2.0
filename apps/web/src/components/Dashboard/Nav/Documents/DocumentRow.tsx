import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {
  IconPlus,
  IconFileDescription,
  IconChevronDown,
  IconTrash,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DocumentRowProps {
  router: AppRouterInstance;
  currentPage: string;
  item: DocumentRowItem;
}

export interface DocumentRowItem {
  title: string;
  docId: number | string;
}

export default function DocumentRow({
  router,
  currentPage,
  item,
}: DocumentRowProps) {
  //   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="my-1">
      <div
        onClick={() => {
          router.push(`/dashboard/${item.docId.toString()}`);
        }}
        className={`${
          item.docId == currentPage
            ? "bg-slate-100 dark:bg-neutral-900"
            : " bg-transparent"
        } inline-flex h-9 w-full items-center justify-start truncate whitespace-nowrap rounded-md px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-neutral-900  dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent`}
      >
        <IconFileDescription className="mr-2 h-4 w-4 flex-shrink-0" />

        {/* {item.icon} */}
        <span className="w-full overflow-hidden text-ellipsis text-left cursor-pointer capitalize">
          {item.title}
        </span>
      </div>
      {/* <IconChevronDown
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          className="mr-2 h-5 w-5 flex-shrink-0  rounded-md hover:bg-slate-200 "
        /> */}

      {/* 
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="outline-none"></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(item.href)}>
            Open
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">
            <IconTrash className="mr-2 h-4 w-4 flex-shrink-0  rounded-md " />{" "}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
