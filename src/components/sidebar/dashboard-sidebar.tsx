"use client";

import { IconLayoutDashboard, IconLink } from "@tabler/icons-react";

import { AppSidebar } from "./app-sidebar";

const SIDEBAR_MENUS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Links",
    url: "/dashboard/links",
    icon: IconLink,
  },
];

export const DashboardSidebar = () => {
  return <AppSidebar menus={SIDEBAR_MENUS} />;
};
