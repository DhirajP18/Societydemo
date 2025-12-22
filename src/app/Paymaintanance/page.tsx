"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

declare global {
  interface Window {
    Razorpay: any;
  }
}

/* ------------------ STATIC DATA ------------------ */
const MAINTENANCE = [
  { id: 1, month: "November 2025", amount: 2500, dueDate: "2025-11-30" },
  { id: 2, month: "December 2025", amount: 2500, dueDate: "2025-12-31" },
  { id: 3, month: "January 2026", amount: 2500, dueDate: "2026-01-31" },
];

const ADMIN_MAINTENANCE_DETAILS: Record<
  number,
  { type: string; adminPaid: number }
> = {
  1: { type: "Lift Maintenance", adminPaid: 1800 },
  2: { type: "Security & Cleaning", adminPaid: 2200 },
  3: { type: "Water Tank Cleaning", adminPaid: 1500 },
};

const PENALTY_PER_DAY = 20;

export default function PayMaintenance() {
  const [selected, setSelected] = useState<number[]>([]);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const today = new Date();

  const getDelayDays = (due: string) => {
    const diff =
      (today.getTime() - new Date(due).getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.floor(diff) : 0;
  };

  const toggle = (id: number) => {
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  };

  const selectAll = () => {
    setSelected(
      selected.length === MAINTENANCE.length
        ? []
        : MAINTENANCE.map((m) => m.id)
    );
  };

  const selectedItems = MAINTENANCE.filter((m) =>
    selected.includes(m.id)
  );

  const totalAmount = selectedItems.reduce((sum, m) => {
    const delay = getDelayDays(m.dueDate);
    const penalty = delay * PENALTY_PER_DAY;
    return sum + m.amount + penalty;
  }, 0);

  const payNow = () => {
    if (!selectedItems.length) {
      toast.error("Select maintenance to pay");
      return;
    }

    new window.Razorpay({
      key: "rzp_test_RtMLEoBroA8R8P",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Society 365",
      description: "Maintenance Payment",
      handler: (res: any) => {
        setPaymentData({
          paymentId: res.razorpay_payment_id,
          date: new Date().toLocaleString(),
        });
        toast.success("Payment Successful");
      },
    }).open();
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.text("SOCIETY 365 - MAINTENANCE RECEIPT", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Month", "Amount", "Penalty", "Total"]],
      body: selectedItems.map((m) => {
        const delay = getDelayDays(m.dueDate);
        const penalty = delay * PENALTY_PER_DAY;
        return [
          m.month,
          `₹${m.amount}`,
          penalty ? `₹${penalty}` : "-",
          `₹${m.amount + penalty}`,
        ];
      }),
      theme: "grid",
    });

    doc.text(
      `Total Paid: ₹${totalAmount}`,
      14,
      (doc as any).lastAutoTable.finalY + 10
    );
    doc.save("Maintenance_Receipt.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center pt-4 px-2">
      <Toaster />

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 space-y-4">

        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Pay Maintenance
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select pending dues and proceed to payment
          </p>
        </div>

        {/* SELECT ALL */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selected.length === MAINTENANCE.length}
            onCheckedChange={selectAll}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Select All
          </span>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {MAINTENANCE.map((m) => {
            const delay = getDelayDays(m.dueDate);
            const penalty = delay * PENALTY_PER_DAY;
            const adminInfo = ADMIN_MAINTENANCE_DETAILS[m.id];

            return (
              <div
                key={m.id}
                className={`border rounded-lg p-3
                ${delay ? "border-red-400 dark:border-red-500" : ""}`}
              >
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={`item-${m.id}`}
                    className="border-none"
                  >

                    {/* MAIN ROW */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Checkbox
                          checked={selected.includes(m.id)}
                          onCheckedChange={() => toggle(m.id)}
                        />

                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {m.month}
                          </p>
                          <p className="text-xs text-gray-500">
                            Due: {m.dueDate}
                          </p>

                          {delay > 0 && (
                            <p className="text-xs text-red-600 mt-1">
                              {delay} days late • Penalty ₹{penalty}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          ₹{m.amount}
                        </p>
                        {penalty > 0 && (
                          <p className="text-xs text-red-600">
                            + ₹{penalty}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ACCORDION BUTTON */}
                    <AccordionTrigger className="text-xs text-indigo-600 hover:no-underline pt-2">
                      View maintenance details
                    </AccordionTrigger>

                    {/* ACCORDION CONTENT */}
                    <AccordionContent>
                      <div className="mt-2 rounded-md bg-gray-50 dark:bg-slate-700 p-3 space-y-2 text-sm">

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Maintenance Type
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {adminInfo.type}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Amount Paid by Admin
                          </span>
                          <span className="font-semibold text-green-600">
                            ₹{adminInfo.adminPaid}
                          </span>
                        </div>

                      </div>
                    </AccordionContent>

                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* TOTAL */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t pt-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Payable</p>
            <p className="text-xl font-bold text-indigo-600">
              ₹{totalAmount}
            </p>
          </div>

          <Button
            onClick={payNow}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Pay Now
          </Button>
        </div>

        {/* SUCCESS */}
        {paymentData && (
          <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
            <Button
              onClick={downloadReceipt}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Download Receipt
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
