"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import {
  Phone,
  IndianRupee,
  Calendar,
  Home,
  AlertCircle,
  CreditCard,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Resident {
  id: number;
  name: string;
  flat: string;
  amount: number;
  status: "Paid" | "Pending";
  paidOn?: string;
  dueTill: string;
  paidVia: string;
  trnId?: string;
}

const MAINTENANCE_DATA: Resident[] = [
  {
    id: 1,
    name: "Dhiraj Patil",
    flat: "Apt 4B",
    amount: 3000,
    status: "Paid",
    paidOn: "10 Dec 2025",
    dueTill: "31 Dec 2025",
    paidVia: "UPI",
    trnId: "UPI87654321",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    flat: "Apt 2A",
    amount: 3000,
    status: "Pending",
    dueTill: "31 Dec 2025",
    paidVia: "-",
  },
  {
    id: 3,
    name: "Anjali Deshmukh",
    flat: "Apt 3C",
    amount: 3200,
    status: "Pending",
    dueTill: "31 Dec 2025",
    paidVia: "-",
  },
  {
    id: 4,
    name: "Vikram Singh",
    flat: "Apt 5D",
    amount: 3500,
    status: "Paid",
    paidOn: "12 Dec 2025",
    dueTill: "31 Dec 2025",
    paidVia: "Net Banking",
    trnId: "NB123456789",
  },
  {
    id: 5,
    name: "Priya Mehta",
    flat: "Apt 1B",
    amount: 3000,
    status: "Pending",
    dueTill: "31 Dec 2025",
    paidVia: "-",
  },
  {
    id: 6,
    name: "Suresh Kumar",
    flat: "Apt 6A",
    amount: 3000,
    status: "Paid",
    paidOn: "15 Dec 2025",
    dueTill: "31 Dec 2025",
    paidVia: "UPI",
    trnId: "UPI555666777",
  },
];

export default function MaintenanceReportPage() {
  const [showReminderMode, setShowReminderMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending">("All");
  const [selectedMonth, setSelectedMonth] = useState("December 2025");

  const filteredData = MAINTENANCE_DATA.filter(
    (t) => filterStatus === "All" || t.status === filterStatus
  );

  const totalAmount = filteredData.reduce((sum, t) => sum + t.amount, 0);
  const collectedAmount = filteredData
    .filter((t) => t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = totalAmount - collectedAmount;

  const pendingResidents = MAINTENANCE_DATA.filter((t) => t.status === "Pending");
  const isAllPendingSelected =
    selectedIds.length === pendingResidents.length && pendingResidents.length > 0;

  const toggleSelectAll = () => {
    if (isAllPendingSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingResidents.map((t) => t.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sendBulkReminder = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one pending resident");
      return;
    }
    toast.success(`Reminder sent to ${selectedIds.length} resident(s)! 📱`);
    setSelectedIds([]);
    setShowReminderMode(false);
  };

  const sendSingleReminder = (name: string) => {
    toast.success(`Reminder sent to ${name}! 📱`);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const today = new Date().toLocaleDateString("en-IN");

    // Header
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Society-365", 105, 25, { align: "center" });

    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
    doc.text("Maintenance Report", 105, 35, { align: "center" });

    doc.setFontSize(13);
    doc.text(`Month: ${selectedMonth} | Generated on: ${today}`, 105, 45, { align: "center" });

    // Table Body Data
    const bodyData = filteredData.map((resident, index) => [
      (index + 1).toString(),
      resident.name,
      resident.flat,
      resident.amount.toLocaleString("en-IN"),
      resident.status === "Paid" ? resident.amount.toLocaleString("en-IN") : "0",
      resident.paidVia,
      resident.trnId || "-",
      resident.dueTill,
    ]);

    // AutoTable
    autoTable(doc, {
      head: [["Sr No.", "Name", "Flat No.", "Maintenance Amount", "Paid Amount", "Paid By", "TRN ID", "Valid Till"]],
      body: bodyData,
      startY: 55,
      theme: "grid",
      headStyles: {
        fillColor: [30, 144, 255],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 11,
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 6,
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255],
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: 48 },
        2: { cellWidth: 25, halign: "center" },
        3: { cellWidth: 35, halign: "right" },
        4: { cellWidth: 30, halign: "right" },
        5: { cellWidth: 28 },
        6: { cellWidth: 38 },
        7: { cellWidth: 28, halign: "center" },
      },
      margin: { left: 12, right: 12 },
      styles: { overflow: "linebreak", font: "helvetica" },
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Maintenance Amount: ₹${totalAmount.toLocaleString("en-IN")}`, 14, finalY);
    doc.text(`Collected Amount: ₹${collectedAmount.toLocaleString("en-IN")}`, 14, finalY + 10);
    doc.text(`Pending Amount: ₹${pendingAmount.toLocaleString("en-IN")}`, 14, finalY + 20);

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated by Society-365 Management System", 105, 285, { align: "center" });

    // Save
    doc.save(`Maintenance_Report_${selectedMonth.replace(/ /g, "_")}.pdf`);
    toast.success("Maintenance PDF Report Generated Successfully! 📄");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Report</h1>
            <p className="text-muted-foreground mt-1">
              {selectedMonth} • Society-365
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="December 2025">December 2025</SelectItem>
                <SelectItem value="November 2025">November 2025</SelectItem>
                <SelectItem value="October 2025">October 2025</SelectItem>
                <SelectItem value="September 2025">September 2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Residents</SelectItem>
                <SelectItem value="Paid">Paid Only</SelectItem>
                <SelectItem value="Pending">Pending Only</SelectItem>
              </SelectContent>
            </Select>

            {showReminderMode && (
              <>
                <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                  <Checkbox checked={isAllPendingSelected} className="mr-2 h-4 w-4" />
                  Select All
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={sendBulkReminder}
                  disabled={selectedIds.length === 0}
                >
                  Send SMS ({selectedIds.length})
                </Button>
              </>
            )}

            <Button
              variant={showReminderMode ? "destructive" : "default"}
              size="sm"
              onClick={() => {
                setShowReminderMode(!showReminderMode);
                if (showReminderMode) setSelectedIds([]);
              }}
            >
              {showReminderMode ? "Cancel" : "Send Reminder"}
            </Button>

            <Button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-muted shadow-sm">
            <p className="text-sm text-muted-foreground">Total Maintenance</p>
            <p className="text-3xl font-bold mt-2">
              ₹{totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 shadow-sm">
            <p className="text-sm text-green-700 dark:text-green-400">Collected</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400 mt-2">
              ₹{collectedAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 shadow-sm">
            <p className="text-sm text-red-700 dark:text-red-400">Pending</p>
            <p className="text-3xl font-bold text-red-700 dark:text-red-400 mt-2">
              ₹{pendingAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Accordion List */}
        <Accordion type="multiple" className="rounded-xl border bg-card shadow-md divide-y dark:divide-gray-700">
          {filteredData.map((resident) => {
            const isPending = resident.status === "Pending";
            const isSelected = selectedIds.includes(resident.id);

            return (
              <AccordionItem key={resident.id} value={resident.id.toString()} className="last:border-b-0">
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-6">
                    <div className="flex items-center gap-5 flex-1">
                      {showReminderMode && isPending && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(resident.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-5 w-5"
                        />
                      )}
                      <div className="text-left">
                        <p className="font-semibold text-lg">{resident.name}</p>
                        <p className="text-sm text-muted-foreground">Flat No: {resident.flat}</p>
                      </div>
                    </div>
                    <Badge
                      variant={isPending ? "destructive" : "default"}
                      className={cn(
                        "px-5 py-1.5 text-sm font-medium",
                        isPending
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      )}
                    >
                      {resident.status}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">₹{resident.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span>01 Dec 2025 – 31 Dec 2025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-muted-foreground" />
                      <span>Flat No: {resident.flat}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span>Paid via: {resident.paidVia}</span>
                    </div>
                    {resident.trnId && (
                      <div className="flex items-center gap-3 md:col-span-2">
                        <span className="font-medium">TRN ID: {resident.trnId}</span>
                      </div>
                    )}
                    {resident.paidOn && (
                      <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">Paid on: {resident.paidOn}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <AlertCircle className="w-5 h-5" />
                      <span>Due till: {resident.dueTill}</span>
                    </div>
                  </div>

                  {isPending && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-5"
                      onClick={() => sendSingleReminder(resident.name)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}