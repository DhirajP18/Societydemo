"use client";

import { useState, useEffect } from "react";
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
import { toast } from "@/components/ui/use-toast"; // Shadcn Toast
import {
  Phone,
  IndianRupee,
  Calendar,
  Wallet,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------- DATA ---------- */
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
];

/* ---------- COUNT UP ---------- */
function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.ceil(value / (duration / 16));

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return <>₹{count.toLocaleString("en-IN")}</>;
}

/* ---------- PAGE ---------- */
export default function MaintenanceReportPage() {
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending">(
    "All"
  );
  const [selectedMonth, setSelectedMonth] = useState("December 2025");
  const [showReminderMode, setShowReminderMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredData = MAINTENANCE_DATA.filter(
    (t) => filterStatus === "All" || t.status === filterStatus
  );

  const totalAmount = filteredData.reduce((s, x) => s + x.amount, 0);
  const collectedAmount = filteredData
    .filter((x) => x.status === "Paid")
    .reduce((s, x) => s + x.amount, 0);
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

  /* ---------- REMINDER LOGIC ---------- */
  const sendBulkReminder = () => {
    if (selectedIds.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one pending resident",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Reminder Sent",
      description: `Reminder sent to ${selectedIds.length} resident(s)! 📱`,
      variant: "default",
    });
    setSelectedIds([]);
    setShowReminderMode(false);
  };

  const sendSingleReminder = (name: string) => {
    toast({
      title: "Reminder Sent",
      description: `Reminder sent to ${name}! 📱`,
      variant: "default",
    });
  };

  /* ---------- PDF LOGIC ---------- */
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const today = new Date().toLocaleDateString("en-IN");

    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Society-365", 105, 25, { align: "center" });

    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
    doc.text("Maintenance Report", 105, 35, { align: "center" });

    doc.setFontSize(13);
    doc.text(`Month: ${selectedMonth} | Generated on: ${today}`, 105, 45, {
      align: "center",
    });

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

    autoTable(doc, {
      head: [
        [
          "Sr No.",
          "Name",
          "Flat No.",
          "Maintenance Amount",
          "Paid Amount",
          "Paid By",
          "TRN ID",
          "Valid Till",
        ],
      ],
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
      bodyStyles: { fontSize: 10, cellPadding: 6 },
      alternateRowStyles: { fillColor: [240, 248, 255] },
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

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Maintenance Amount: ₹${totalAmount.toLocaleString("en-IN")}`, 14, finalY);
    doc.text(`Collected Amount: ₹${collectedAmount.toLocaleString("en-IN")}`, 14, finalY + 10);
    doc.text(`Pending Amount: ₹${pendingAmount.toLocaleString("en-IN")}`, 14, finalY + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated by Society-365 Management System", 105, 285, { align: "center" });

    doc.save(`Maintenance_Report_${selectedMonth.replace(/ /g, "_")}.pdf`);

    toast({
      title: "PDF Generated",
      description: "Maintenance PDF Report Generated Successfully! 📄",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ---------- HEADER + ACTIONS ---------- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Maintenance Report</h1>
            <p className="text-muted-foreground">{selectedMonth}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2 lg:mt-0">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="December 2025">December 2025</SelectItem>
                <SelectItem value="November 2025">November 2025</SelectItem>
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

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 flex items-center"
              onClick={generatePDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* ---------- SUMMARY CARDS ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => setFilterStatus("All")}
            className="cursor-pointer rounded-xl border bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Wallet className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">
                  <CountUp value={totalAmount} />
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setFilterStatus("Paid")}
            className="cursor-pointer rounded-xl border bg-green-50/70 dark:bg-green-900/20 backdrop-blur-md p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Collected
                </p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  <CountUp value={collectedAmount} />
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setFilterStatus("Pending")}
            className="cursor-pointer rounded-xl border bg-red-50/70 dark:bg-red-900/20 backdrop-blur-md p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <XCircle className="h-10 w-10 text-red-600" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-400">
                  Pending
                </p>
                <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                  <CountUp value={pendingAmount} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- LIST ---------- */}
        <Accordion type="multiple" className="rounded-xl border bg-card shadow">
          {filteredData.map((r) => {
            const isPending = r.status === "Pending";
            const isSelected = selectedIds.includes(r.id);

            return (
              <AccordionItem key={r.id} value={r.id.toString()}>
                <AccordionTrigger className="px-6 py-5">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      {showReminderMode && isPending && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(r.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-5 w-5"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-muted-foreground">{r.flat}</p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        isPending ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      )}
                    >
                      {r.status}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    ₹{r.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due till {r.dueTill}
                  </div>
                  {isPending && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendSingleReminder(r.name)}
                      className="mt-2"
                    >
                      <Phone className="h-4 w-4 mr-2" />
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
