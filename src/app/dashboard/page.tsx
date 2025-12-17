"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  PieChart,
  Pie,
  Sector,
  Label,
} from "recharts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Building2,
  Users,
  IndianRupee,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ================= DATA ================= */
const barChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const barChartConfig = {
  desktop: {
    label: "Monthly Rent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


const maintenanceData = [
  { status: "completed", value: 70, fill: "var(--color-completed)" },
  { status: "pending", value: 30, fill: "var(--color-pending)" },
];

const maintenanceConfig = {
  completed: { label: "Completed", color: "hsl(var(--chart-2))" },
  pending: { label: "Pending", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const maintenanceDetails = [
  {
    month: "January",
    tasks: [
      {
        task: "Water Pipe Fix",
        doneBy: "John",
        date: "05-Jan-2024",
        details: "Replaced broken water pipe in building A.",
        status: "Completed",
        remarks: "Tested water pressure after fix."
      },
      {
        task: "Lift Oil Change",
        doneBy: "Bob",
        date: "12-Jan-2024",
        details: "Changed oil in lift #2.",
        status: "Completed",
        remarks: "Lift running smoothly after maintenance."
      },
    ],
  },
  {
    month: "February",
    tasks: [
      {
        task: "Electricity Check",
        doneBy: "Alice",
        date: "10-Feb-2024",
        details: "Checked electrical connections in lobby.",
        status: "Completed",
        remarks: "All circuits normal."
      },
      {
        task: "Water Tank Cleaning",
        doneBy: "Jane",
        date: "18-Feb-2024",
        details: "Cleaned and sanitized rooftop water tank.",
        status: "Completed",
        remarks: "Water tested clean."
      },
    ],
  },
];

export default function DashboardPage() {
  const [activeStatus, setActiveStatus] = React.useState(maintenanceData[0].status);
  const [selectedMonth, setSelectedMonth] = React.useState(maintenanceDetails[0].month);

  const activeIndex = React.useMemo(
    () => maintenanceData.findIndex((item) => item.status === activeStatus),
    [activeStatus]
  );

  const filteredMaintenance = React.useMemo(
    () => maintenanceDetails.find((m) => m.month === selectedMonth)?.tasks || [],
    [selectedMonth]
  );

  return (
    <div className="flex flex-col gap-6 w-full p-4 md:p-6">

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-4 py-2">
            <CardTitle className="text-sm text-muted-foreground">Total Flats</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pt-0 pb-3">
            <h2 className="text-2xl font-semibold">245</h2>
            <Progress value={75} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">75% occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-4 py-2">
            <CardTitle className="text-sm text-muted-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pt-0 pb-3">
            <h2 className="text-2xl font-semibold">18</h2>
            <Progress value={60} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">60% online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-4 py-2">
            <CardTitle className="text-sm text-muted-foreground">Monthly Rent</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pt-0 pb-3">
            <h2 className="text-2xl font-semibold">₹12,450</h2>
            <Progress value={50} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">50% collected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between px-4 py-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pt-0 pb-3">
            <h2 className="text-2xl font-semibold">32</h2>
            <Progress value={40} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">40% in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= MAINTENANCE PIE CHART ================= */}
        <Card data-chart="maintenance-pie">
          <ChartStyle id="maintenance-pie" config={maintenanceConfig} />
          <CardHeader className="flex flex-row items-start justify-between pb-0">
            <div className="grid gap-1">
              <CardTitle>Maintenance Status</CardTitle>
              <CardDescription>Completed vs Pending</CardDescription>
            </div>
            <Select value={activeStatus} onValueChange={setActiveStatus}>
              <SelectTrigger className="h-7 w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {maintenanceData.map((item) => (
                  <SelectItem key={item.status} value={item.status}>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                      {maintenanceConfig[item.status as keyof typeof maintenanceConfig].label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="flex flex-1 justify-center pb-4">
            <ChartContainer id="maintenance-pie" config={maintenanceConfig} className="aspect-square w-full max-w-[280px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={maintenanceData}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius = 0, ...props }: any) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector {...props} outerRadius={outerRadius + 22} innerRadius={outerRadius + 12} />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              {maintenanceData[activeIndex].value}%
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                              {maintenanceConfig[maintenanceData[activeIndex].status as keyof typeof maintenanceConfig].label}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ================= MONTHLY RENT OVERVIEW BAR CHART - FIXED FOR DARK MODE ================= */}
        <Card data-chart="bar">
          <ChartStyle id="bar" config={barChartConfig} />
          <CardHeader>
            <CardTitle>Monthly Rent Overview</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
              <BarChart
                accessibilityLayer
                data={barChartData}
                layout="vertical"
                margin={{ left: -20 }}
              >
                {/* Added CartesianGrid for better visibility in dark mode */}
                <CartesianGrid horizontal strokeDasharray="3 3" className="stroke-muted/30" />

                <XAxis type="number" hide />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="fill-muted-foreground"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
               <Bar
                  dataKey="desktop"
                  radius={6}
                  fill="var(--bar-fill)"
/>

              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total rent collection for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* ================= MAINTENANCE ACCORDION ================= */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Maintenance Done</CardTitle>
            <CardDescription>View month-wise maintenance details</CardDescription>
          </div>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="h-9 w-[160px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end">
              {maintenanceDetails.map((m) => (
                <SelectItem key={m.month} value={m.month}>
                  {m.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="pt-2">
          <Accordion type="single" collapsible className="space-y-3">
            {filteredMaintenance.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No maintenance tasks for this month</p>
            ) : (
              filteredMaintenance.map((task, idx) => (
                <AccordionItem key={idx} value={`task-${idx}`} className="border rounded-lg">
                  <AccordionTrigger className="hover:no-underline px-4 py-3 font-medium">
                    {task.task}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 space-y-2 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <strong>Done By:</strong> <span className="text-foreground">{task.doneBy}</span>
                      </div>
                      <div>
                        <strong>Date:</strong> <span className="text-foreground">{task.date}</span>
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        <Badge variant={task.status === "Completed" ? "default" : "secondary"} className="ml-1">
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <strong>Details:</strong> {task.details}
                    </div>
                    <div>
                      <strong>Remarks:</strong> {task.remarks || "—"}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}