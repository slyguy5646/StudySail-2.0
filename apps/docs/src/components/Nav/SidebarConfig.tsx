import { HomeIcon, LucideIcon } from "lucide-react";
import {
  IconPencil,
  IconListDetails,
  IconChartBar,
  IconBooks,
  IconActivity,
  IconUserCog,
  IconBrandAppleArcade,
} from "@tabler/icons-react";

export interface SideBarButton {
  title: string;
  icon: any;
  href: string;
}

export interface SideBarSection {
  title: string;
  items: SideBarButton[];
}

export const sideBarConfig: SideBarSection[] = [
  {
    title: "Documents",
    items: [
      {
        title: "Doc 1",
        icon: <IconUserCog className="mr-2 h-4 w-4 flex-shrink-0" />,
        href: "/dashboard/1",
      },
   
      {
        title: "Doc 2",
        icon: <IconUserCog className="mr-2 h-4 w-4 flex-shrink-0" />,
        href: "/dashboard/2",
      },
   
    ],
  },
];
