"use client";

import { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function FlatMasterPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [search, setSearch] = useState("");
  const [filterBuilding, setFilterBuilding] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");

  /* ================= STATIC DATA ================= */
  const buildings = ["Sunshine Residency", "Green Valley"];
  const floors = ["1st Floor", "2nd Floor", "3rd Floor"];
  const luxuryList = ["Parking", "Lift", "Power Backup", "Gym", "Swimming Pool"];

  /* ================= STATE ================= */
  const [flats, setFlats] = useState([
    {
      id: 1,
      building: "Sunshine Residency",
      floor: "1st Floor",
      flat: "A-101",
      bhk: "2 BHK",
      rent: 15000,
      features: ["Parking", "Lift"],
      status: "Available",
    },
    {
      id: 2,
      building: "Green Valley",
      floor: "2nd Floor",
      flat: "B-202",
      bhk: "3 BHK",
      rent: 22000,
      features: ["Gym", "Power Backup"],
      status: "Occupied",
    },
  ]);

  const [form, setForm] = useState({
    building: "",
    floor: "",
    flat: "",
    bhk: "",
    rent: "",
    features: [] as string[],
    status: "Available",
  });

  /* ================= FILTER LOGIC ================= */
  const filteredFlats = useMemo(() => {
    return flats.filter((f) => {
      const searchMatch =
        f.flat.toLowerCase().includes(search.toLowerCase()) ||
        f.building.toLowerCase().includes(search.toLowerCase()) ||
        f.floor.toLowerCase().includes(search.toLowerCase());

      const buildingMatch =
        filterBuilding === "all" || f.building === filterBuilding;

      const floorMatch =
        filterFloor === "all" || f.floor === filterFloor;

      return searchMatch && buildingMatch && floorMatch;
    });
  }, [flats, search, filterBuilding, filterFloor]);

  /* ================= FUNCTIONS ================= */
  const toggleFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSave = () => {
    if (!form.building || !form.floor || !form.flat || !form.bhk || !form.rent) {
      toast.error("Please fill all required fields");
      return;
    }

    setFlats([
      ...flats,
      {
        id: flats.length + 1,
        building: form.building,
        floor: form.floor,
        flat: form.flat,
        bhk: form.bhk,
        rent: Number(form.rent),
        features: form.features,
        status: form.status,
      },
    ]);

    toast.success("Flat added successfully");
    setActiveTab("list");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏠 Flat Master
          </h1>
          <p className="text-sm text-muted-foreground">
            Premium flat management system
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Flat List</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>

        {/* ================= LIST ================= */}
        <TabsContent value="list">
          <Card className="shadow-xl border backdrop-blur-lg">
            <CardHeader className="space-y-3">
              <CardTitle className="flex justify-between items-center">
                Flat List
                <Badge variant="secondary">
                  {filteredFlats.length} Records
                </Badge>
              </CardTitle>

              {/* SEARCH + FILTER */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Search Flat / Building / Floor"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Select onValueChange={setFilterBuilding}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buildings</SelectItem>
                    {buildings.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={setFilterFloor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    {floors.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setFilterBuilding("all");
                    setFilterFloor("all");
                  }}
                >
                  Reset
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flat</TableHead>
                    <TableHead>Building</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>BHK</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredFlats.map((f) => (
                    <TableRow
                      key={f.id}
                      className="hover:bg-muted/50 transition"
                    >
                      <TableCell className="font-semibold">{f.flat}</TableCell>
                      <TableCell>{f.building}</TableCell>
                      <TableCell>{f.floor}</TableCell>
                      <TableCell>{f.bhk}</TableCell>
                      <TableCell>₹ {f.rent}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            f.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
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
<TabsContent value="add">
  <Card>
    <CardHeader>
      <CardTitle className="text-center">
        Add New Flat
      </CardTitle>
    </CardHeader>

    <CardContent>
      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Building */}
        <Select
          value={form.building}
          onValueChange={(v) =>
            setForm({ ...form, building: v })
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

        {/* Floor */}
        <Select
          value={form.floor}
          onValueChange={(v) =>
            setForm({ ...form, floor: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Floor" />
          </SelectTrigger>
          <SelectContent>
            {floors.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Flat */}
        <Input
          placeholder="Flat No / Name"
          value={form.flat}
          onChange={(e) =>
            setForm({ ...form, flat: e.target.value })
          }
        />

        {/* BHK */}
        <Select
          value={form.bhk}
          onValueChange={(v) =>
            setForm({ ...form, bhk: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="BHK Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 BHK">1 BHK</SelectItem>
            <SelectItem value="2 BHK">2 BHK</SelectItem>
            <SelectItem value="3 BHK">3 BHK</SelectItem>
          </SelectContent>
        </Select>

        {/* Rent */}
        <Input
          type="number"
          placeholder="Monthly Rent"
          value={form.rent}
          onChange={(e) =>
            setForm({ ...form, rent: e.target.value })
          }
        />

        {/* Status */}
        <Select
          value={form.status}
          onValueChange={(v) =>
            setForm({ ...form, status: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Occupied">Occupied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FEATURES – FULL WIDTH */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">
          Luxury Features
        </p>
        <div className="flex flex-wrap gap-4">
          {luxuryList.map((f) => (
            <label
              key={f}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                checked={form.features.includes(f)}
                onCheckedChange={() => toggleFeature(f)}
              />
              {f}
            </label>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-6 flex justify-center">
        <Button className="w-60" onClick={handleSave}>
          Save Flat
        </Button>
      </div>
    </CardContent>
  </Card>
</TabsContent>

      </Tabs>
    </div>
  );
}
