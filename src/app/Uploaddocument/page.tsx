"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setVerified(false);
      setUploaded(false);
    }
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 px-4 py-4">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-md rounded-xl">
          <CardContent className="p-5 space-y-5">

            {/* Upload Box */}
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-sky-400 p-5 text-center cursor-pointer hover:bg-sky-50 dark:hover:bg-slate-900 transition"
            >
              <UploadCloud className="h-9 w-9 text-sky-500" />
              <p className="text-sm font-medium">
                Drag & Drop your document here
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, JPG, PNG (Max 5MB)
              </p>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
              />
            </label>

            {file && (
              <p className="text-xs text-center">
                📄 Selected File: <b>{file.name}</b>
              </p>
            )}

            {/* Status Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>Aadhaar</span>
                <Badge className="bg-green-100 text-green-700">
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>PAN</span>
                <Badge className="bg-yellow-100 text-yellow-700">
                  Pending
                </Badge>
              </div>
            </div>

            {/* Verify */}
            {!verified && (
              <Button
                onClick={handleVerify}
                disabled={!file || verifying}
                className="w-full"
              >
                {verifying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Document
              </Button>
            )}

            {/* Verified */}
            {verified && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
                <CheckCircle className="h-5 w-5" />
                Document Verified Successfully
              </div>
            )}

            {/* Upload */}
            {verified && !uploaded && (
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {uploading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upload Document
              </Button>
            )}

            {/* Uploaded */}
            {uploaded && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm">
                <CheckCircle className="h-5 w-5" />
                Uploaded Successfully 🎉
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
