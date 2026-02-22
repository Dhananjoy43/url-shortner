"use client";

import { motion } from "motion/react";

import { DashboardKPIs } from "@/features/links/components/dashboard-kpis";
import { RecentLinksTable } from "@/features/links/components/recent-links-table";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-8">
          <DashboardKPIs />
          <RecentLinksTable />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
