"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconProps } from "@tabler/icons-react";
import { LucideIcon } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menus: {
    title: string;
    url: string;
    icon:
      | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
      | LucideIcon;
  }[];
}

export function AppSidebar({ menus, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenuButton size="lg" className="hover:bg-sidebar">
          <h3 className="text-primary truncate text-2xl font-bold">
            {APP_NAME}
          </h3>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {menus?.map((item) => (
              <SidebarMenuItem key={item.title} className="py-1">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-full"
                  isActive={pathname === item.url}
                >
                  <Link href={item.url} className="font-medium">
                    <item.icon />
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
