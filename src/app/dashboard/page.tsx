"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  Building2,
  Users,
  IndianRupee,
  ClipboardList,
  CheckCircle,
  Clock,
  Loader2,
  Wrench,
  Droplets,
  Zap,
  ArrowUpDown,
} from "lucide-react";

export default function DashboardPage() {
  const pieData = [
    { name: "Completed", value: 45 },
    { name: "Pending", value: 30 },
    { name: "In Progress", value: 25 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#3b82f6"];

  const tableData = [
    { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Inactive" },
    { name: "Bob Johnson", email: "bob@example.com", role: "Staff", status: "Active" },
    { name: "Alice Williams", email: "alice@example.com", role: "Staff", status: "Active" },
  ];

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
        <Card>
          <CardHeader>
            <CardTitle>Maintanance Status</CardTitle>
          </CardHeader>
          <CardContent className="h-64 grid grid-cols-1 md:grid-cols-2 items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={18} /> Completed
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Clock size={18} /> Pending
              </div>
              <div className="flex items-center gap-2 text-blue-500">
                <Loader2 size={18} /> In Progress
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Wrench />
            <CardTitle>Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-2">
                  <Droplets size={16} /> Water Supply
                </span>
                <span>80%</span>
              </div>
              <Progress value={80} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-2">
                  <Zap size={16} /> Electricity
                </span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-2">
  <ArrowUpDown size={16} /> Lift
</span>
                <span>40%</span>
              </div>
              <Progress value={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= USERS TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((user, idx) => (
                <TableRow key={idx}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= TABS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <p className="text-sm text-muted-foreground">
                Showing all recent activities.
              </p>
            </TabsContent>

            <TabsContent value="user">
              <p className="text-sm text-muted-foreground">
                User related activities.
              </p>
            </TabsContent>

            <TabsContent value="system">
              <p className="text-sm text-muted-foreground">
                System generated activities.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
}
