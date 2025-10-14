import { Globe, Link2, MousePointerClick, Users } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpiData = [
  {
    title: "Total Links",
    value: "12,340",
    trend: "+8.2% this week",
    icon: Link2,
  },
  {
    title: "Total Clicks",
    value: "1.2M",
    trend: "+15.4% this week",
    icon: MousePointerClick,
  },
  { title: "Active Domains", value: "23", trend: "Stable", icon: Globe },
  {
    title: "Unique Visitors",
    value: "340K",
    trend: "+12.8% this week",
    icon: Users,
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex items-center space-x-2">
              <kpi.icon className="text-muted-foreground h-5 w-5" />
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-muted-foreground text-xs">{kpi.trend}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
