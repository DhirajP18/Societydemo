"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function FloorMasterPage() {
  const [activeTab, setActiveTab] = useState("list");

  // 🔹 Static Buildings
  const buildings = [
    "Sunshine Residency",
    "Green Valley",
    "Blue Heights",
  ];

  // 🔹 Floor List (Static)
  const [floors, setFloors] = useState([
    {
      id: 1,
      building: "Sunshine Residency",
      floor: "1st Floor",
      flats: 8,
      status: "Active",
    },
    {
      id: 2,
      building: "Green Valley",
      floor: "2nd Floor",
      flats: 6,
      status: "Inactive",
    },
  ]);

  // 🔹 Form State
  const [form, setForm] = useState({
    building: "",
    floor: "",
    flats: "",
    status: "Active",
  });

  const handleSave = () => {
    if (!form.building || !form.floor || !form.flats) {
      toast.error("Please fill all fields");
      return;
    }

    setFloors([
      ...floors,
      {
        id: floors.length + 1,
        building: form.building,
        floor: form.floor,
        flats: Number(form.flats),
        status: form.status,
      },
    ]);

    toast.success("Floor added successfully");

    setForm({
      building: "",
      floor: "",
      flats: "",
      status: "Active",
    });

    setActiveTab("list");
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">🏬 Floor Master</h1>
        <p className="text-sm text-muted-foreground">
          Manage building floors
        </p>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Floor List</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>

        {/* ================= LIST ================= */}
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Floor List</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Building</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Total Flats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {floors.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.building}</TableCell>
                      <TableCell className="font-medium">
                        {f.floor}
                      </TableCell>
                      <TableCell>{f.flats}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            f.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {f.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= ADD ================= */}
        <TabsContent value="add" className="mt-0">
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">
                  Add New Floor
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Building */}
                <Select
                  value={form.building}
                  onValueChange={(value) =>
                    setForm({ ...form, building: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Building" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Floor Name */}
                <Input
                  placeholder="Floor Name (e.g. 1st Floor)"
                  value={form.floor}
                  onChange={(e) =>
                    setForm({ ...form, floor: e.target.value })
                  }
                />

                {/* Flats */}
                <Input
                  type="number"
                  placeholder="Total Flats"
                  value={form.flats}
                  onChange={(e) =>
                    setForm({ ...form, flats: e.target.value })
                  }
                />

                {/* Status */}
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full" onClick={handleSave}>
                  Save Floor
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
