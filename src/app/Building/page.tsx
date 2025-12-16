"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BuildingPage() {
  const [activeTab, setActiveTab] = useState("list");

  const [buildings, setBuildings] = useState([
    { id: 1, name: "Sunshine Residency", floors: 10, flats: 80, status: "Active" },
    { id: 2, name: "Green Valley", floors: 8, flats: 64, status: "Inactive" },
  ]);

  const [form, setForm] = useState({
    name: "",
    floors: "",
    flats: "",
  });

  const handleSave = () => {
    if (!form.name || !form.floors || !form.flats) {
      toast.error("Please fill all fields");
      return;
    }

    setBuildings([
      ...buildings,
      {
        id: buildings.length + 1,
        name: form.name,
        floors: Number(form.floors),
        flats: Number(form.flats),
        status: "Active",
      },
    ]);

    toast.success("Building added successfully");

    setForm({ name: "", floors: "", flats: "" });
    setActiveTab("list");
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">🏢 Building Master</h1>
        <p className="text-sm text-muted-foreground">
          Manage society buildings
        </p>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Building List</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>

        {/* ================= LIST ================= */}
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Building List</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Floors</TableHead>
                    <TableHead>Flats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {buildings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.name}
                      </TableCell>
                      <TableCell>{b.floors}</TableCell>
                      <TableCell>{b.flats}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            b.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {b.status}
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
                  Add New Building
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Building Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Input
                  type="number"
                  placeholder="Total Floors"
                  value={form.floors}
                  onChange={(e) =>
                    setForm({ ...form, floors: e.target.value })
                  }
                />

                <Input
                  type="number"
                  placeholder="Total Flats"
                  value={form.flats}
                  onChange={(e) =>
                    setForm({ ...form, flats: e.target.value })
                  }
                />

                <Button className="w-full" onClick={handleSave}>
                  Save Building
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
