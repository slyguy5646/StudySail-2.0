"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  IconKeyboard,
  IconLogout,
  IconPuzzle,
  IconUser,
  IconKey,
  IconClick,
  IconList,
  IconSportBillard,
  IconListNumbers,
  IconBallAmericanFootball,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function NavAvatar({ pfp_url }: { pfp_url: string | null | undefined }) {
  const router = useRouter();
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={pfp_url ?? undefined} />
            <AvatarFallback>
              <IconUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 bg-white text-black relative`}
        align="end"
        forceMount
      >
        <DropdownMenuLabel className={`w-56 bg-white  text-black`}>
          {"My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={"bg-slate-200"} />
        <DropdownMenuGroup onClick={() => router.push("/dashboard/profile")}>
          <DropdownMenuItem className={"focus:bg-slate-100"}>
            <IconUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={"bg-slate-200"} />
        <DropdownMenuItem
          className={"focus:bg-slate-100"}
          onClick={() => {
            signOut(() => router.push("/"));
          }}
        >
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <input type="submit" value={""} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavAvatar;
