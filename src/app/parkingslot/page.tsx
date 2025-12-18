"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Car, Search, ParkingCircle, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
    { id: "P11", assignedTo: null },
    { id: "P12", assignedTo: null },
  ]);

  const [flats] = useState([
    { flat: "A-101", name: "Rajesh Kumar", building: "Sunshine Residency", bhk: "2 BHK", rent: 18000 },
    { flat: "A-102", name: "Amit Sharma", building: "Sunshine Residency", bhk: "3 BHK", rent: 22000 },
    { flat: "B-201", name: "Neha Gupta", building: "Green Valley", bhk: "1 BHK", rent: 12000 },
    { flat: "B-202", name: "Priya Singh", building: "Green Valley", bhk: "2 BHK", rent: 16000 },
    { flat: "C-301", name: "Vikram Patel", building: "Sunshine Residency", bhk: "3 BHK", rent: 25000 },
  ]);

  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [openUnassignDialog, setOpenUnassignDialog] = useState(false);
  const [slotToUnassign, setSlotToUnassign] = useState<string | null>(null);

  const handleEmptySlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
    setOpenAssignDialog(true);
    setSearchQuery("");
    setSelectedTenant(null);
  };

  const handleOccupiedSlotClick = (slotId: string) => {
    const slot = parkingSlots.find((s) => s.id === slotId);
    if (slot?.assignedTo) {
      toast(
        <div className="flex flex-col">
          <div className="font-semibold">Currently Assigned To:</div>
          <div className="text-sm">{slot.assignedTo.flat}</div>
          <div className="text-sm text-muted-foreground">{slot.assignedTo.name}</div>
        </div>,
        { icon: <Car className="w-5 h-5" />, duration: 5000 }
      );
      setSlotToUnassign(slotId);
      setOpenUnassignDialog(true);
    }
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
    setOpenAssignDialog(false);
    setSelectedSlot(null);
    setSelectedTenant(null);
  };

  const handleConfirmUnassign = () => {
    if (!slotToUnassign) return;
    setParkingSlots((prev) =>
      prev.map((s) => (s.id === slotToUnassign ? { ...s, assignedTo: null } : s))
    );
    toast.success(`${slotToUnassign} has been freed`);
    setOpenUnassignDialog(false);
    setSlotToUnassign(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-center gap-3 py-4">
          <ParkingCircle className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">Parking Management</h1>
        </div>
        <p className="text-center text-sm text-muted-foreground pb-3">
          Click a parking slot to assign or free it
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
          <TabsTrigger value="dashboard">Floor Plan</TabsTrigger>
          <TabsTrigger value="list">Flat List</TabsTrigger>
        </TabsList>

        {/* Floor Plan Tab */}
        <TabsContent value="dashboard" className="mt-0 p-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-lg">Ground Floor Parking</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-muted/30 rounded-t-lg p-6 pb-12">
                {/* Driveway */}
                <div className="absolute inset-x-0 top-1/2 h-12 bg-muted-foreground/20 -translate-y-1/2 flex items-center justify-center text-muted-foreground text-sm font-medium">
                  DRIVEWAY
                </div>

                {/* Top Row - 6 slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
                  {parkingSlots.slice(0, 6).map((slot) => (
                    <ParkingSlot
                      key={slot.id}
                      slot={slot}
                      onEmptyClick={handleEmptySlotClick}
                      onOccupiedClick={handleOccupiedSlotClick}
                      direction="down"
                    />
                  ))}
                </div>

                {/* Bottom Row - 6 slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {parkingSlots.slice(6, 12).map((slot) => (
                    <ParkingSlot
                      key={slot.id}
                      slot={slot}
                      onEmptyClick={handleEmptySlotClick}
                      onOccupiedClick={handleOccupiedSlotClick}
                      direction="up"
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-8 py-4 border-t bg-card">
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-5 w-5 text-destructive" />
                  <span>Occupied</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flat List Tab */}
        <TabsContent value="list" className="mt-0 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Flats & Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Flat</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Building</TableHead>
                      <TableHead>BHK</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Parking</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flats.map((f) => (
                      <TableRow key={f.flat}>
                        <TableCell className="font-medium">{f.flat}</TableCell>
                        <TableCell>{f.name}</TableCell>
                        <TableCell>{f.building}</TableCell>
                        <TableCell>{f.bhk}</TableCell>
                        <TableCell>₹ {f.rent.toLocaleString()}</TableCell>
                        <TableCell>
                          {parkingSlots.find((p) => p.assignedTo?.flat === f.flat)?.id || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign Dialog */}
      <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Assign {selectedSlot}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flat or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredFlats.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">No flats found</p>
              ) : (
                filteredFlats.map((tenant) => {
                  const isAssigned = parkingSlots.some((p) => p.assignedTo?.flat === tenant.flat);
                  return (
                    <div
                      key={tenant.flat}
                      onClick={() => !isAssigned && setSelectedTenant(tenant)}
                      className={`p-3 rounded-md border cursor-pointer transition-colors
                        ${selectedTenant?.flat === tenant.flat ? "border-primary bg-accent" : "border-border"}
                        ${isAssigned ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{tenant.flat}</div>
                          <div className="text-sm text-muted-foreground">{tenant.name}</div>
                        </div>
                        {isAssigned && <Badge variant="secondary">Assigned</Badge>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
            <Button onClick={handleAssign} disabled={!selectedTenant}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unassign Confirmation */}
      <AlertDialog open={openUnassignDialog} onOpenChange={setOpenUnassignDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Free Parking Slot?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the current assignment from {slotToUnassign}. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUnassign} className="bg-destructive hover:bg-destructive/90">
              Yes, Free Slot
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Responsive Parking Slot
function ParkingSlot({ slot, onEmptyClick, onOccupiedClick, direction }: any) {
  const isOccupied = !!slot.assignedTo;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => (isOccupied ? onOccupiedClick(slot.id) : onEmptyClick(slot.id))}
      className={`relative flex flex-col items-center justify-center h-32 sm:h-36 rounded-lg border-2 cursor-pointer transition-all shadow-md
        ${isOccupied 
          ? "bg-destructive/10 border-destructive/60 hover:bg-destructive/20" 
          : "bg-emerald-500/10 border-emerald-500/60 hover:bg-emerald-500/20 border-dashed"
        }`}
    >
      {isOccupied ? (
        <>
          <Car className={`w-16 h-16 sm:w-20 sm:h-20 ${direction === "down" ? "" : "rotate-180"} text-destructive`} />
          <div className="absolute bottom-2 text-center px-2 w-full">
            <div className="font-bold text-sm sm:text-base">{slot.assignedTo.flat}</div>
            <div className="text-xs text-muted-foreground truncate">{slot.assignedTo.name}</div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="font-bold text-base sm:text-lg">{slot.id}</div>
          <div className="text-sm text-muted-foreground">Empty</div>
        </div>
      )}
    </motion.div>
  );
}