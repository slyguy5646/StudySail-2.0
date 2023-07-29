import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { IconPlus, IconFileDescription, IconChevronDown, IconTrash } from "@tabler/icons-react";
import * as allIcons from "@tabler/icons-react"

import { useState } from "react";

type IconIndex = typeof allIcons
interface DocumentRowProps {
  router: AppRouterInstance;
  currentPage: string;
  item: DocumentRowItem;
  icon?: string
}

export interface DocumentRowItem {
  title: string;
  slug: string;
}

export default function DocumentRow({ router, currentPage, item, icon }: DocumentRowProps) {
  //   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

//@ts-ignore
  const IconToBeUsed = icon ? allIcons[icon] : allIcons["IconFileDescription"];

  return (
    <div className="my-1">
      <div
        onClick={() => {
          router.push(`/${item.slug}`);
        }}
        className={`${
          item.slug == currentPage ? "bg-slate-100 dark:bg-neutral-900" : " bg-transparent"
        } inline-flex h-9 w-full items-center justify-start truncate whitespace-nowrap rounded-md px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-neutral-900  dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent`}
      >
        <IconToBeUsed className="mr-2 h-4 w-4 flex-shrink-0" />

        {/* {item.icon} */}
        <span className="w-full overflow-hidden text-ellipsis text-left cursor-pointer capitalize">{item.title}</span>
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
