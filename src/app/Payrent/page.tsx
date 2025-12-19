"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RentPaymentCard() {
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payRent = () => {
    const options = {
      key: "rzp_test_RtMLEoBroA8R8P",
      amount: 1500000, // ₹15,000 in paise
      currency: "INR",
      name: "Society 365",
      description: "Rent Payment (Test)",
      handler: function (response: any) {
        const receipt = {
          paymentId: response.razorpay_payment_id,
          amount: "₹15,000",
          tenant: "Dhiraj Patil",
          flat: "Apt 4B",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        };
        setPaymentData(receipt);
        toast.success("Payment Successful");
      },
      prefill: {
        name: "Dhiraj Patil",
        email: "test@razorpay.com",
        contact: "9999999999",
      },
      theme: { color: "#4f46e5" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();

    // --- 1. Header: Society 365 ---
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SOCIETY 365", 14, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Residential Management Office", 14, 26);
    doc.text("Official Rent Receipt", 14, 31);

    // --- 2. Receipt Info (Top Right) ---
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("RECEIPT", 150, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt No: #${paymentData.paymentId.slice(-8).toUpperCase()}`, 150, 28);
    doc.text(`Date: ${paymentData.date}`, 150, 33);

    // --- 3. Seller & Customer Details ---
    doc.setDrawColor(0);
    doc.line(14, 40, 196, 40); 

    doc.setFont("helvetica", "bold");
    doc.text("FROM (SELLER):", 14, 50);
    doc.text("TO (TENANT):", 110, 50);

    doc.setFont("helvetica", "normal");
    doc.text("Society 365 Admin Office", 14, 56);
    doc.text("Building Block A, Sector 12", 14, 61);

    doc.text(`${paymentData.tenant}`, 110, 56);
    doc.text(`Flat No: ${paymentData.flat}`, 110, 61);
    doc.text("Payment Status: PAID", 110, 66);

    // --- 4. Professional Table Section ---
    autoTable(doc, {
      startY: 75,
      head: [['DESCRIPTION', 'QTY', 'UNIT PRICE', 'SUBTOTAL', 'TAX']],
      body: [
        ['Monthly House Rent Payment', '1', paymentData.amount, paymentData.amount, '0.00'],
      ],
      styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
      headStyles: { fillColor: [245, 245, 245], textColor: [0, 0, 0], fontStyle: 'bold' },
      theme: 'grid',
    });

    // --- 5. Calculation Summary ---
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", 140, finalY);
    doc.text(`${paymentData.amount}.00`, 175, finalY);
    
    doc.text("Tax (0%):", 140, finalY + 7);
    doc.text(`0.00`, 175, finalY + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Paid:", 140, finalY + 16);
    doc.text(`${paymentData.amount}.00`, 175, finalY + 16);

    // --- 6. Signature & Footer ---
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature", 14, finalY + 35);
    doc.line(14, finalY + 30, 60, finalY + 30); 

    doc.setFont("helvetica", "bold");
    doc.text("THANK YOU FOR THE PAYMENT!", 105, finalY + 50, { align: "center" });

    doc.save(`Receipt_Society365_${paymentData.paymentId.slice(-4)}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center pt-4 pb-8">
      <Toaster position="top-right" />

      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-slate-800 p-6 flex flex-col items-center space-y-6 border border-gray-200 dark:border-gray-700">
        {/* Logo / Title */}
        <div className="flex flex-col items-center space-y-1">
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">PayRent</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm text-center">
            Your Rental Payment
          </span>
        </div>

        {/* Rental Info Card - REMAINING EXACTLY AS YOUR OLD UI */}
        <div className="w-full rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 text-sm text-gray-800 dark:text-gray-200">
            {/* Left Side */}
            <div className="p-4 bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-700 dark:to-blue-700">
              <p className="font-semibold">Rental Name:</p>
              <p>Dhiraj Patil</p>
              <p className="mt-2 font-semibold">Flat No:</p>
              <p>Apt 4B</p>
              <p className="mt-2 font-semibold">Monthly Rent:</p>
              <p>₹15,000</p>
            </div>
            {/* Right Side */}
            <div className="p-4 bg-gradient-to-br from-pink-200 to-yellow-200 dark:from-pink-700 dark:to-yellow-700">
              <p className="font-semibold">For Month:</p>
              <p>December 2025 → January 2026</p>
              <p className="mt-2 font-semibold">Validity Till:</p>
              <p>31 Jan 2026</p>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <Button
          onClick={payRent}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 font-semibold"
        >
          PAY NOW
        </Button>

        {/* Success Section */}
        {paymentData && (
          <div className="w-full bg-green-50 dark:bg-green-900 p-4 rounded-lg text-center space-y-2">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Payment Successful ✅
            </p>
            <p className="text-xs font-mono break-all text-gray-800 dark:text-gray-200">
              Payment ID: {paymentData.paymentId}
            </p>
            <Button
              onClick={downloadReceipt}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Download Receipt (PDF)
            </Button>
          </div>
        )}

        {/* Razorpay Info */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Payments are secured by Razorpay 🔒
        </p>
      </div>
    </div>
  );
}