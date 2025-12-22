"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, PlusCircle, Pencil, ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Notice {
  id: number;
  title: string;
  message: string;
  date: string;
  image?: string;
}

export default function AdminNoticePage() {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [editId, setEditId] = useState<number | null>(null);

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "Water Supply Maintenance",
      message: "Water supply will be unavailable tomorrow from 10 AM to 2 PM.",
      date: "10 Sep 2025",
    },
    {
      id: 2,
      title: "Monthly Maintenance Due",
      message: "Please pay society maintenance before 15th of this month.",
      date: "09 Sep 2025",
    },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveNotice = () => {
    if (!title || !message) {
      toast({
        title: "Missing fields",
        description: "Title and message are required",
        variant: "destructive",
      });
      return;
    }

    const date = new Date().toLocaleString();

    if (editId) {
      setNotices(
        notices.map((n) =>
          n.id === editId ? { ...n, title, message, image, date } : n
        )
      );
      setEditId(null);
    } else {
      setNotices([{ id: Date.now(), title, message, image, date }, ...notices]);
    }

    setTitle("");
    setMessage("");
    setImage(undefined);

    toast({
      title: "Notice saved",
      description: date,
    });
  };

  const editNotice = (notice: Notice) => {
    setEditId(notice.id);
    setTitle(notice.title);
    setMessage(notice.message);
    setImage(notice.image);
  };

  const deleteNotice = (id: number) => {
    setNotices(notices.filter((n) => n.id !== id));
    toast({ title: "Notice deleted" });
  };

  return (
    <div className="px-3 py-4 sm:p-6 max-w-5xl mx-auto space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Notice Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Create & manage society notices
        </p>
      </div>

      {/* CREATE / EDIT */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {editId ? "Edit Notice" : "Create Notice"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Notice message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[90px]"
          />

          {/* IMAGE UPLOAD */}
          <label className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition bg-muted/40">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium">
              Upload notice image (optional)
            </span>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {image && (
            <img
              src={image}
              className="w-full sm:w-56 rounded-lg border shadow-sm"
              alt="Preview"
            />
          )}

          <Button className="w-full sm:w-fit" onClick={saveNotice}>
            <PlusCircle className="w-4 h-4 mr-2" />
            {editId ? "Update Notice" : "Publish Notice"}
          </Button>
        </CardContent>
      </Card>

      {/* NOTICE LIST */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Published Notices</CardTitle>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {notices.map((notice) => (
              <AccordionItem
                key={notice.id}
                value={notice.id.toString()}
                className="rounded-lg border px-3"
              >
                <AccordionTrigger className="font-medium text-left">
                  {notice.title}
                </AccordionTrigger>

                <AccordionContent className="space-y-3 pt-2">
                  <p className="text-sm leading-relaxed">
                    {notice.message}
                  </p>

                  {notice.image && (
                    <img
                      src={notice.image}
                      className="w-full sm:w-64 rounded-md border"
                      alt="Notice"
                    />
                  )}

                  <Badge variant="secondary">{notice.date}</Badge>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editNotice(notice)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteNotice(notice.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
