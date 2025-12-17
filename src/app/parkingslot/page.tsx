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
    <div className="min-h-screen p-4">
      <Toaster position="top-right" />

      {/* Simple Header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <ParkingCircle className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Parking Management</h1>
      </div>

      {/* Simple Static Instruction Line - No Animation, 100% Error-Free */}
      <p className="text-center text-base font-medium text-primary mb-6">
        Click a parking slot to assign or free it
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
        <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-4">
          <TabsTrigger value="dashboard">Floor Plan</TabsTrigger>
          <TabsTrigger value="list">Flat List</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0">
          <Card className="overflow-hidden">
            <CardHeader className="py-3 bg-muted/40">
              <CardTitle className="text-base text-center">Ground Floor Parking</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative bg-muted/30 rounded-lg p-4 border border-border">
                <div className="absolute inset-x-0 top-1/2 h-10 bg-muted-foreground/20 -translate-y-1/2 flex items-center justify-center text-muted-foreground text-xs font-medium rounded">
                  DRIVEWAY
                </div>

                <div className="grid grid-cols-6 gap-3 mb-8">
                  {parkingSlots.slice(0, 6).map((slot) => (
                    <ParkingSlot key={slot.id} slot={slot} onEmptyClick={handleEmptySlotClick} onOccupiedClick={handleOccupiedSlotClick} direction="down" />
                  ))}
                </div>

                <div className="grid grid-cols-6 gap-3">
                  {parkingSlots.slice(6, 12).map((slot) => (
                    <ParkingSlot key={slot.id} slot={slot} onEmptyClick={handleEmptySlotClick} onOccupiedClick={handleOccupiedSlotClick} direction="up" />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-destructive" />
                  <span>Occupied</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base">Flats & Tenants</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Flat</TableHead>
                      <TableHead className="text-xs">Tenant</TableHead>
                      <TableHead className="text-xs">Building</TableHead>
                      <TableHead className="text-xs">BHK</TableHead>
                      <TableHead className="text-xs">Rent</TableHead>
                      <TableHead className="text-xs">Parking</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flats.map((f) => (
                      <TableRow key={f.flat}>
                        <TableCell className="font-medium text-sm">{f.flat}</TableCell>
                        <TableCell className="text-sm">{f.name}</TableCell>
                        <TableCell className="text-sm">{f.building}</TableCell>
                        <TableCell className="text-sm">{f.bhk}</TableCell>
                        <TableCell className="text-sm">₹ {f.rent.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">
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
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Car className="w-5 h-5" />
              Assign {selectedSlot}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
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
                <p className="text-center py-6 text-muted-foreground text-sm">No flats found</p>
              ) : (
                filteredFlats.map((tenant) => {
                  const isAssigned = parkingSlots.some((p) => p.assignedTo?.flat === tenant.flat);
                  return (
                    <div
                      key={tenant.flat}
                      onClick={() => !isAssigned && setSelectedTenant(tenant)}
                      className={`p-3 rounded-md border cursor-pointer transition-colors text-sm
                        ${selectedTenant?.flat === tenant.flat ? "border-primary bg-accent" : "border-border"}
                        ${isAssigned ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{tenant.flat}</div>
                          <div className="text-muted-foreground">{tenant.name}</div>
                        </div>
                        {isAssigned && <Badge variant="secondary" className="text-xs">Assigned</Badge>}
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
              <AlertTriangle className="w-5 h-5 text-destructive" />
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

// Parking Slot Component - Theme-aware
function ParkingSlot({ slot, onEmptyClick, onOccupiedClick, direction }: any) {
  const isOccupied = !!slot.assignedTo;

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => (isOccupied ? onOccupiedClick(slot.id) : onEmptyClick(slot.id))}
      className={`relative flex flex-col items-center justify-center h-28 rounded-md border-2 cursor-pointer transition-all shadow-sm
        ${isOccupied 
          ? "bg-destructive/10 border-destructive/50 hover:bg-destructive/20" 
          : "bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500/20 border-dashed"
        }`}
    >
      {isOccupied ? (
        <>
          <Car className={`w-14 h-14 ${direction === "down" ? "" : "rotate-180"} text-destructive`} />
          <div className="absolute bottom-1 text-center px-1">
            <div className="font-semibold text-xs leading-tight">{slot.assignedTo.flat}</div>
            <div className="text-[10px] text-muted-foreground leading-tight truncate max-w-full">
              {slot.assignedTo.name}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="font-bold text-sm">{slot.id}</div>
          <div className="text-xs text-muted-foreground">Empty</div>
        </div>
      )}
    </motion.div>
  );
}