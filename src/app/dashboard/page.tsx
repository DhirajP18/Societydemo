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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
  CheckCircle,
  Clock,
  Loader2,
  TrendingUp,
} from "lucide-react";

/* ================= USERS TABLE ================= */
const tableData = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Inactive" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Staff", status: "Active" },
  { name: "Alice Williams", email: "alice@example.com", role: "Staff", status: "Active" },
];

/* ================= HORIZONTAL BAR CHART ================= */
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
    color: "#FDBA74", // Light Orange
  },
} satisfies ChartConfig;

/* ================= INTERACTIVE MAINTENANCE PIE ================= */
const maintenanceData = [
  { status: "completed", value: 70, fill: "var(--color-completed)" },
  { status: "pending", value: 30, fill: "var(--color-pending)" },
];

const maintenanceConfig = {
  completed: { label: "Completed", color: "#22c55e" },
  pending: { label: "Pending", color: "#facc15" },
} satisfies ChartConfig;

/* ================= MAINTENANCE DETAILS ================= */
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
    <div className="flex flex-col gap-6 w-full">

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Flats</CardTitle>
            <Building2 />
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">245</h2>
            <Progress value={75} className="mt-3 bg-blue-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-100 to-green-200 text-green-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Users</CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">18</h2>
            <Progress value={60} className="mt-3 bg-green-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Monthly Rent</CardTitle>
            <IndianRupee />
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">₹12,450</h2>
            <Progress value={50} className="mt-3 bg-purple-200" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Tasks</CardTitle>
            <ClipboardList />
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">32</h2>
            <Progress value={40} className="mt-3 bg-orange-200" />
          </CardContent>
        </Card>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= INTERACTIVE MAINTENANCE PIE ================= */}
        <Card data-chart="maintenance-pie" className="flex flex-col">
          <ChartStyle id="maintenance-pie" config={maintenanceConfig} />

          <CardHeader className="flex flex-row items-start justify-between pb-0">
            <div className="grid gap-1">
              <CardTitle>Maintenance Status</CardTitle>
              <CardDescription>Completed vs Pending</CardDescription>
            </div>

            <Select value={activeStatus} onValueChange={setActiveStatus}>
              <SelectTrigger className="h-7 w-[130px] rounded-lg pl-2.5">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent align="end">
                {maintenanceData.map((item) => (
                  <SelectItem key={item.status} value={item.status}>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: item.fill }}
                      />
                      {maintenanceConfig[item.status as keyof typeof maintenanceConfig].label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="flex flex-1 justify-center pb-4">
            <ChartContainer
              id="maintenance-pie"
              config={maintenanceConfig}
              className="aspect-square w-full max-w-[280px]"
            >
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
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {maintenanceData[activeIndex].value}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              {maintenanceConfig[
                                maintenanceData[activeIndex].status as keyof typeof maintenanceConfig
                              ].label}
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

        {/* ================= HORIZONTAL BAR CHART ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Rent Overview</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart
                accessibilityLayer
                data={barChartData}
                layout="vertical"
                margin={{ left: -20 }}
              >
                <XAxis type="number" dataKey="desktop" hide />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="desktop" fill="#FDBA74" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total rent collection for the last 6 months
            </div>
          </CardFooter>
        </Card>

      </div>

      {/* ================= USERS TABLE ================= */}
      <Card className="shadow-md border border-gray-200 rounded-xl">
  <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 pb-2">
    <div>
      <CardTitle className="text-lg font-semibold text-gray-800">Maintenance Done</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        View month-wise maintenance details
      </CardDescription>
    </div>

    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
      <SelectTrigger className="h-9 w-[160px] rounded-lg border border-gray-300 pl-2 pr-2 bg-white shadow-sm hover:border-gray-400">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent align="end" className="bg-white rounded-lg shadow-md border border-gray-200">
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
      {filteredMaintenance.map((task, idx) => (
        <AccordionItem key={idx} value={`task-${idx}`} className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 px-4 py-3 text-gray-700 font-medium rounded-t-lg">
            {task.task}
          </AccordionTrigger>
          <AccordionContent className="bg-white px-4 py-3 space-y-1 text-sm text-gray-600">
            <div className="flex flex-wrap gap-4">
              <p><strong>Done By:</strong> <span className="text-gray-800">{task.doneBy}</span></p>
              <p><strong>Date:</strong> <span className="text-gray-800">{task.date}</span></p>
              <p><strong>Status:</strong> <span className={`px-2 py-0.5 rounded-full text-white font-semibold ${task.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>{task.status || "Completed"}</span></p>
            </div>
            <p><strong>Task Details:</strong> {task.details || "No additional info provided."}</p>
            <p><strong>Remarks:</strong> {task.remarks || "—"}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </CardContent>
</Card>



    </div>
  );
}
