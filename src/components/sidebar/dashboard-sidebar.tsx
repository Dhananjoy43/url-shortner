"use client";

import {
  IconChartBar,
  IconLayoutDashboard,
  IconLink,
  IconQrcode,
} from "@tabler/icons-react";

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
  {
    title: "QR Codes",
    url: "/dashboard/qr-codes",
    icon: IconQrcode,
  },
  {
    title: "Analytics",
    url: "/dashboard/admin/gallery",
    icon: IconChartBar,
  },
];

export const DashboardSidebar = () => {
  return <AppSidebar menus={SIDEBAR_MENUS} />;
};
