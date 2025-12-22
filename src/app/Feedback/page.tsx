"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

const CATEGORIES = ["Services", "Events", "Maintenance", "Others"];

export default function FeedbackForm() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);

  const submitFeedback = () => {
    if (!category || !message) {
      toast({
        title: "Required Fields Missing",
        description: "Please select category and enter feedback",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback",
    });

    setCategory("");
    setMessage("");
    setRating(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-3 md:p-4">
      {/* SMALL HEADER */}
      <div className="mb-2">
        <h1 className="text-lg font-semibold">Feedback</h1>
        <p className="text-xs text-muted-foreground">
          Share feedback about services, events, or maintenance
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Feedback Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* CATEGORY */}
          <div>
            <label className="text-xs font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-xs font-medium">Feedback</label>
            <Textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* RATING */}
          <div>
            <label className="text-xs font-medium">Rating</label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i)}
                  className={`w-5 h-5 cursor-pointer ${
                    rating >= i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end pt-1">
            <Button size="sm" onClick={submitFeedback}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
