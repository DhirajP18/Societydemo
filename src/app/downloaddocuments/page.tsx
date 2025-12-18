"use client";

import { useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  FileText,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const documents = [
  {
    name: "Aadhaar Card",
    type: "Image",
    status: "Verified",
    uploadedOn: "12 Sep 2024",
    fileUrl: "/documents/aadhar.png",
    rejectedReason: "",
  },
  {
    name: "PAN Card",
    type: "PDF",
    status: "Pending",
    uploadedOn: "15 Sep 2024",
    fileUrl: "/documents/pan.pdf",
    rejectedReason: "",
  },
  {
    name: "Rental Agreement",
    type: "Image",
    status: "Rejected",
    uploadedOn: "18 Sep 2024",
    fileUrl: "/documents/agreement.png",
    rejectedReason:
      "The uploaded document is blurred and the signature is not clearly visible. Please upload a clear and readable image.",
  },
];

export default function DocumentsPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "pdf">("image");
  const [rejectReason, setRejectReason] = useState("");

  const handleView = (fileUrl: string, type: string) => {
    setPreviewFile(fileUrl);
    setPreviewType(type === "PDF" ? "pdf" : "image");
    setPreviewOpen(true);
  };

  const handleRejectedReason = (reason: string) => {
    setRejectReason(reason);
    setReasonOpen(true);
  };

  const statusBadge = (status: string) => {
    if (status === "Verified")
      return (
        <Badge className="bg-green-100 text-green-700 flex items-center gap-1 text-xs px-2 py-1 rounded">
          <CheckCircle size={12} /> Verified
        </Badge>
      );

    if (status === "Pending")
      return (
        <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1 text-xs px-2 py-1 rounded">
          <Clock size={12} /> Pending
        </Badge>
      );

    return (
      <Badge className="bg-red-100 text-red-700 flex items-center gap-1 text-xs px-2 py-1 rounded">
        <XCircle size={12} /> Rejected
      </Badge>
    );
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 px-4 py-4 min-h-screen">
      <div className="mx-auto max-w-md space-y-4">

        <h1 className="text-lg font-semibold mb-2">📂 My Documents</h1>

        {documents.map((doc, index) => (
          <Card key={index} className="rounded-xl shadow-sm">
            <CardContent className="p-3 flex flex-col gap-3">

              {/* DOCUMENT INFO */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-sky-100 text-sky-600 flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {doc.type} • Uploaded {doc.uploadedOn}
                  </p>
                </div>
              </div>

              {/* BUTTONS ROW */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {statusBadge(doc.status)}

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none text-xs px-2 py-1 flex items-center gap-1 justify-center whitespace-nowrap"
                  onClick={() => handleView(doc.fileUrl, doc.type)}
                >
                  <Eye size={12} /> View
                </Button>

                <a href={doc.fileUrl} download className="flex-1 sm:flex-none w-full sm:w-auto">
                  <Button
                    size="sm"
                    className="text-xs px-2 py-1 flex items-center gap-1 justify-center w-full sm:w-auto whitespace-nowrap"
                  >
                    <Download size={12} /> Download
                  </Button>
                </a>

                {doc.status === "Rejected" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-xs px-2 py-1 flex items-center gap-1 justify-center flex-1 sm:flex-none whitespace-nowrap"
                    onClick={() => handleRejectedReason(doc.rejectedReason)}
                  >
                    <AlertTriangle size={12} /> Reason
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>

          {previewFile && previewType === "image" && (
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src={previewFile}
                alt="Document"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}

          {previewFile && previewType === "pdf" && (
            <iframe
              src={previewFile}
              className="w-full h-[400px] sm:h-[500px] rounded-md border"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ================= REJECTED REASON MODAL ================= */}
      <Dialog open={reasonOpen} onOpenChange={setReasonOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle /> Document Rejected
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-muted-foreground leading-relaxed">
            {rejectReason}
          </div>

          <div className="flex justify-end mt-4">
            <Button size="sm" onClick={() => setReasonOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
