"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ParkingCircle, Car, Building2, Home, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function FlatMasterPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Parking Slots
  const [parkingSlots, setParkingSlots] = useState([
    { id: "P1", assignedTo: { flat: "A-101", name: "Rajesh Kumar" } },
    { id: "P2", assignedTo: null },
    { id: "P3", assignedTo: { flat: "B-202", name: "Priya Singh" } },
    { id: "P4", assignedTo: null },
    { id: "P5", assignedTo: null },
    { id: "P6", assignedTo: null },
    { id: "P7", assignedTo: null },
    { id: "P8", assignedTo: null },
    { id: "P9", assignedTo: null },
    { id: "P10", assignedTo: null },
  ]);

  // All Flats (for search & assign)
  const [flats, setFlats] = useState([
    { flat: "A-101", name: "Rajesh Kumar", building: "Sunshine Residency", bhk: "2 BHK", rent: 18000 },
    { flat: "A-102", name: "Amit Sharma", building: "Sunshine Residency", bhk: "3 BHK", rent: 22000 },
    { flat: "B-201", name: "Neha Gupta", building: "Green Valley", bhk: "1 BHK", rent: 12000 },
    { flat: "B-202", name: "Priya Singh", building: "Green Valley", bhk: "2 BHK", rent: 16000 },
    { flat: "C-301", name: "Vikram Patel", building: "Sunshine Residency", bhk: "3 BHK", rent: 25000 },
  ]);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const handleSlotClick = (slotId: string) => {
    const slot = parkingSlots.find((s) => s.id === slotId);
    if (slot?.assignedTo) {
      toast(`Already assigned to ${slot.assignedTo.flat} (${slot.assignedTo.name})`, {
        icon: "ℹ️",
        duration: 4000,
        style: { background: "#3b82f6", color: "white" },
      });
      return;
    }
    setSelectedSlot(slotId);
    setOpenDialog(true);
    setSearchQuery("");
    setSelectedTenant(null);
  };

  const filteredFlats = flats.filter(
    (f) =>
      f.flat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedTenant || !selectedSlot) return;

    setParkingSlots((prev) =>
      prev.map((s) =>
        s.id === selectedSlot
          ? { ...s, assignedTo: { flat: selectedTenant.flat, name: selectedTenant.name } }
          : s
      )
    );

    toast.success(`Parking ${selectedSlot} assigned to ${selectedTenant.flat}`);
    setOpenDialog(false);
    setSelectedSlot(null);
    setSelectedTenant(null);
  };

  const handleUnassign = (slotId: string) => {
    setParkingSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, assignedTo: null } : s))
    );
    toast.success(`${slotId} parking slot freed`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      <Toaster position="top-right" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 flex items-center justify-center gap-3">
          <ParkingCircle className="w-9 h-9" />
          Admin Parking Management
        </h1>
        <p className="text-indigo-600 mt-1 text-sm md:text-base">
          Click on any parking slot to assign or view details
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
        <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="dashboard">Parking Dashboard</TabsTrigger>
          <TabsTrigger value="list">Flat List</TabsTrigger>
        </TabsList>

        {/* ================= PARKING DASHBOARD ================= */}
        <TabsContent value="dashboard" className="mt-0">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl text-center text-indigo-700">
                Parking Slots Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
                <AnimatePresence>
                  {parkingSlots.map((slot) => (
                    <motion.div
                      key={slot.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.15, y: -6 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        slot.assignedTo ? handleUnassign(slot.id) : handleSlotClick(slot.id)
                      }
                      className={`relative p-3 md:p-4 rounded-xl text-center cursor-pointer shadow-md transition-all
                        ${slot.assignedTo
                          ? "bg-gradient-to-br from-red-500 to-pink-600 text-white"
                          : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                        }`}
                    >
                      <Car className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1" />
                      <div className="text-lg md:text-xl font-bold">{slot.id}</div>
                      <div className="text-xs mt-1 max-w-full overflow-hidden">
                        {slot.assignedTo ? (
                          <div className="truncate">{slot.assignedTo.flat}</div>
                        ) : (
                          "Free"
                        )}
                      </div>
                      {slot.assignedTo && (
                        <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 bg-white/30">
                          Occupied
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-green-500 to-emerald-600"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-red-500 to-pink-600"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= FLAT LIST ================= */}
        <TabsContent value="list" className="mt-0">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl text-indigo-700">All Flats & Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead>Flat No</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Building</TableHead>
                      <TableHead>BHK</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Parking</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flats.map((f, i) => (
                      <motion.tr
                        key={f.flat}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-indigo-50"
                      >
                        <TableCell className="font-medium">{f.flat}</TableCell>
                        <TableCell>{f.name}</TableCell>
                        <TableCell>{f.building}</TableCell>
                        <TableCell>{f.bhk}</TableCell>
                        <TableCell>₹ {f.rent.toLocaleString()}</TableCell>
                        <TableCell>
                          {parkingSlots.find((p) => p.assignedTo?.flat === f.flat)?.id || "-"}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ================= ASSIGN DIALOG ================= */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Assign Parking {selectedSlot}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search flat no or tenant name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-64 overflow-y-auto border rounded-lg bg-gray-50">
              {filteredFlats.length === 0 ? (
                <p className="text-center py-10 text-gray-500">No flats found</p>
              ) : (
                <div className="divide-y">
                  {filteredFlats.map((tenant) => {
                    const isAssigned = parkingSlots.some(
                      (p) => p.assignedTo?.flat === tenant.flat
                    );
                    return (
                      <div
                        key={tenant.flat}
                        onClick={() => !isAssigned && setSelectedTenant(tenant)}
                        className={`p-3 hover:bg-indigo-100 transition-colors cursor-pointer ${
                          selectedTenant?.flat === tenant.flat ? "bg-indigo-200" : ""
                        } ${isAssigned ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold">{tenant.flat}</div>
                            <div className="text-sm text-gray-700">{tenant.name}</div>
                            <div className="text-xs text-gray-500">
                              {tenant.building} • {tenant.bhk}
                            </div>
                          </div>
                          {isAssigned && <Badge variant="secondary">Assigned</Badge>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedTenant}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Assign {selectedSlot}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}