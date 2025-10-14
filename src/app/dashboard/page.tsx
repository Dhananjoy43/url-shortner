"use client";

import { motion } from "motion/react";

import { AnalyticsCharts } from "@/features/analytics/components/charts";
import { KPICards } from "@/features/analytics/components/kpi-cards";
import { RecentLinksTable } from "@/features/links/components/recent-links-table";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <>
          <KPICards />
          <AnalyticsCharts />
          <RecentLinksTable />
          {/* <QuickActions /> */}
        </>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
