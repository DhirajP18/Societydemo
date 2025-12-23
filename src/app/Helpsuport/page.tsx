"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Phone,
  Mail,
  Send,
  FileText,
  Siren,
  ShieldAlert,
  Flame,
  HeartPulse,
  Building2,
} from "lucide-react";

/* ------------------ STATIC FAQ DATA ------------------ */
const FAQS = [
  {
    q: "How can I pay maintenance online?",
    a: "Go to the Maintenance section, select pending months, and click Pay Now. Payment can be done using UPI, card, or net banking.",
  },
  {
    q: "What happens if I miss the due date?",
    a: "A late penalty will be added automatically based on the number of delayed days.",
  },
  {
    q: "Can I download payment receipts?",
    a: "Yes. After successful payment, you can download the receipt in PDF format.",
  },
  {
    q: "How do polls and voting work?",
    a: "Admin creates a poll when a decision is required. Residents can vote and final decisions are made based on majority votes.",
  },
  {
    q: "Who can I contact for urgent support?",
    a: "You can directly contact the society office or use the emergency contacts listed above.",
  },
];

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 px-3 py-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Help & Support
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assistance, emergency contacts, and common questions
          </p>
        </motion.div>

        {/* 🚨 EMERGENCY CONTACTS */}
        <Card className="border-red-500 dark:border-red-600">
          <CardHeader className="flex flex-row items-center gap-2">
            <Siren className="text-red-600 animate-pulse" />
            <h2 className="text-lg font-semibold text-red-600">
              Emergency Contacts
            </h2>
            <Badge variant="destructive">24x7</Badge>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* POLICE */}
            <div className="flex items-center gap-3 rounded-lg border p-3 bg-white dark:bg-slate-800">
              <ShieldAlert className="text-blue-600" />
              <div>
                <p className="font-medium">Police</p>
                <p className="text-sm text-gray-500">100</p>
              </div>
            </div>

            {/* AMBULANCE */}
            <div className="flex items-center gap-3 rounded-lg border p-3 bg-white dark:bg-slate-800">
              <HeartPulse className="text-red-500" />
              <div>
                <p className="font-medium">Ambulance</p>
                <p className="text-sm text-gray-500">108</p>
              </div>
            </div>

            {/* FIRE */}
            <div className="flex items-center gap-3 rounded-lg border p-3 bg-white dark:bg-slate-800">
              <Flame className="text-orange-500" />
              <div>
                <p className="font-medium">Fire Brigade</p>
                <p className="text-sm text-gray-500">101</p>
              </div>
            </div>

            {/* SOCIETY OFFICE */}
            <div className="flex items-center gap-3 rounded-lg border p-3 bg-white dark:bg-slate-800">
              <Building2 className="text-indigo-600" />
              <div>
                <p className="font-medium">Society Office</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* QUICK SUPPORT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Phone className="text-indigo-600" />
              <p className="font-medium">Call Support</p>
              <p className="text-xs text-gray-500">+91 98765 43210</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Mail className="text-indigo-600" />
              <p className="font-medium">Email Support</p>
              <p className="text-xs text-gray-500">support@society365.com</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <FileText className="text-indigo-600" />
              <p className="font-medium">User Manual</p>
              <Badge variant="secondary">PDF</Badge>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <HelpCircle className="text-indigo-600" />
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </CardHeader>

          <CardContent>
            <Accordion type="single" collapsible>
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* SUPPORT FORM */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Raise a Support Request</h2>
            <p className="text-sm text-gray-500">
              Submit your issue and our team will contact you
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input placeholder="Your Name" />
            <Input placeholder="Email or Mobile Number" />
            <Textarea placeholder="Describe your issue..." />

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Emergency services are available 24x7 • Society support hours: 9 AM – 6 PM
        </p>
      </div>
    </div>
  );
}
