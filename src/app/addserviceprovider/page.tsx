"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  List,
  Phone,
  Wrench,
  Droplets,
  Zap,
  Leaf,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const mockProviders = [
  {
    id: 1,
    name: "Ramesh Kumar",
    category: "Electrician",
    mobile: "9876543210",
    area: "Block A",
    status: "Active",
  },
  {
    id: 2,
    name: "Suresh Patil",
    category: "Plumber",
    mobile: "9123456780",
    area: "Block B",
    status: "Active",
  },
  {
    id: 3,
    name: "Mahesh Veggies",
    category: "Vegetable Provider",
    mobile: "9988776655",
    area: "Block C",
    status: "Inactive",
  },
];

const categoryIcon = (category: string) => {
  switch (category) {
    case "Electrician":
      return <Zap size={16} className="text-yellow-500" />;
    case "Plumber":
      return <Droplets size={16} className="text-blue-500" />;
    case "Mechanic":
      return <Wrench size={16} className="text-gray-500" />;
    case "Vegetable Provider":
      return <Leaf size={16} className="text-green-500" />;
    default:
      return null;
  }
};

export default function ServiceProviderPage() {
  const [tab, setTab] = useState<"list" | "add">("list");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredProviders = mockProviders.filter(
    (p) => filterCategory === "all" || p.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Service Providers</h1>
            <p className="text-sm text-muted-foreground">
              Manage electricians, plumbers, mechanics and more
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={tab === "list" ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setTab("list")}
            >
              <List size={16} /> List
            </Button>

            <Button
              variant={tab === "add" ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setTab("add")}
            >
              <Plus size={16} /> Add New
            </Button>
          </div>
        </div>

        {/* LIST VIEW */}
        {tab === "list" && (
          <Card className="rounded-2xl border border-border bg-card">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-lg">Providers List</CardTitle>

              <Select onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electrician">Electrician</SelectItem>
                  <SelectItem value="Plumber">Plumber</SelectItem>
                  <SelectItem value="Mechanic">Mechanic</SelectItem>
                  <SelectItem value="Vegetable Provider">Vegetable Provider</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredProviders.map((p) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-muted transition"
                    >
                      <TableCell className="font-medium">
                        {p.name}
                      </TableCell>

                      <TableCell className="flex items-center gap-2">
                        {categoryIcon(p.category)}
                        {p.category}
                      </TableCell>

                      <TableCell>{p.area}</TableCell>
                      <TableCell>{p.mobile}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            p.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {p.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Phone size={14} /> Call
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* ADD FORM */}
        {tab === "add" && (
          <Card className="rounded-2xl border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">
                Add Service Provider
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill the details below and save
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Name</Label>
                <Input placeholder="Provider full name" />
              </div>

              <div>
                <Label>Mobile Number</Label>
                <Input placeholder="10-digit mobile number" />
              </div>

              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Mechanic">Mechanic</SelectItem>
                    <SelectItem value="Vegetable Provider">Vegetable Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Service Area</Label>
                <Input placeholder="Block / Society / Area" />
              </div>

              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input placeholder="Full service address" />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setTab("list")}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    toast.success("Provider added successfully");

                    setTimeout(() => {
                      setTab("list");
                    }, 800);
                  }}
                >
                  Save Provider
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
