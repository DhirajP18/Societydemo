"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ISSUES = ["Maintenance", "Payment", "Security", "General Query", "Others"];

export default function ComplaintForm() {
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submitComplaint = () => {
    if (!issue || !description) {
      toast({
        title: "Missing Information",
        description: "Please select issue type and describe your issue",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Complaint Submitted",
      description: "We will resolve your issue shortly",
    });

    setIssue("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-3 md:p-4">
      {/* SMALL HEADER */}
      <div className="mb-2">
        <h1 className="text-lg font-semibold">Complaints / Queries</h1>
        <p className="text-xs text-muted-foreground">
          Raise complaints or submit queries to society management
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Issue Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ISSUE TYPE */}
          <div>
            <label className="text-xs font-medium">Issue Type</label>
            <Select value={issue} onValueChange={setIssue}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select issue" />
              </SelectTrigger>
              <SelectContent>
                {ISSUES.map((i) => (
                  <SelectItem key={i} value={i}>{i}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-xs font-medium">Description</label>
            <Textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* FILE */}
          <div>
            <label className="text-xs font-medium">Attachment (optional)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 text-xs"
            />
            {file && (
              <p className="text-xs text-green-600 mt-1">{file.name}</p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end pt-1">
            <Button size="sm" variant="destructive" onClick={submitComplaint}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
