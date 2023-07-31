import * as allIcons from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function StringToTabler({ iconTitle, className }: { iconTitle: string | undefined, className?: string }) {
  //@ts-ignore
  const IconToBeUsed = iconTitle ? allIcons[iconTitle] : allIcons["IconFileDescription"];
  return (
    <IconToBeUsed className={cn("w-8 h-8 text-cyan-500", className)}/>
  )
}
