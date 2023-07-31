import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import StringToTabler from "../StringToTabler";


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



  return (
    <div className="my-1">
      <div
        onClick={() => {
          router.push(`/${item.slug}`);
        }}
        className={`${
          item.slug == currentPage ? "bg-slate-100 dark:bg-neutral-700" : " bg-transparent"
        } inline-flex h-9 w-full items-center justify-start truncate whitespace-nowrap rounded-md px-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-neutral-700  focus:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-neutral-900  dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent`}
      >
        <StringToTabler iconTitle={icon} className="mr-2 h-4 w-4 flex-shrink-0 text-cyan-500" />

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
