"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Pencil,
  PlusCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

/* ================= TYPES ================= */
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: "Upcoming" | "Done";
}

/* ================= PAGE ================= */
export default function AdminEventPage() {
  const { toast } = useToast();

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Annual Meeting",
      date: "2025-09-20",
      time: "06:30 PM",
      location: "Society Hall",
      status: "Upcoming",
      image: "",
    },
    {
      id: 2,
      name: "Ganesh Festival",
      date: "2025-09-01",
      time: "07:00 PM",
      location: "Garden Area",
      status: "Done",
      image: "",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    image: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  /* ================= HELPERS ================= */
  const calculateStatus = (date: string) =>
    new Date(date) >= new Date() ? "Upcoming" : "Done";

  const saveEvent = () => {
    if (!form.name || !form.date || !form.time || !form.location) {
      toast({ title: "All fields required", variant: "destructive" });
      return;
    }

    if (editingId) {
      setEvents(
        events.map((e) =>
          e.id === editingId
            ? {
                ...e,
                ...form,
                status: calculateStatus(form.date),
              }
            : e
        )
      );
      toast({ title: "Event updated" });
    } else {
      setEvents([
        {
          id: Date.now(),
          ...form,
          status: calculateStatus(form.date),
        },
        ...events,
      ]);
      toast({ title: "Event created" });
    }

    setForm({ name: "", date: "", time: "", location: "", image: "" });
    setEditingId(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    toast({ title: "Event deleted" });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () =>
      setForm({ ...form, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  /* ================= CALENDAR ================= */
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const filteredEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : events;

  return (
    <div className="px-3 pt-2 max-w-6xl mx-auto space-y-3">
      <h1 className="text-lg font-bold">Event Management</h1>

      {/* CALENDAR TOGGLE */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {showCalendar ? "Hide Calendar" : "Show Calendar"}
      </Button>

      {/* CALENDAR */}
      {showCalendar && (
        <Card>
          <CardHeader className="py-2 font-semibold">
            {today.toLocaleString("default", { month: "long" })} {year}
          </CardHeader>
          <CardContent className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-semibold text-muted-foreground">
                {d}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(
                2,
                "0"
              )}-${String(day).padStart(2, "0")}`;

              const hasEvent = events.some((e) => e.date === dateStr);

              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDate(
                      selectedDate === dateStr ? null : dateStr
                    )
                  }
                  className={`p-2 rounded border transition ${
                    hasEvent
                      ? "bg-primary/20 font-semibold"
                      : "bg-muted/30"
                  } ${
                    selectedDate === dateStr
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* CREATE / EDIT */}
      <Card>
        <CardHeader className="py-2 font-semibold">
          {editingId ? "Edit Event" : "Create Event"}
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Event name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="grid sm:grid-cols-3 gap-2">
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Input
              placeholder="Time (06:30 PM)"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          </div>

          {/* IMAGE */}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <ImageIcon className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
            />
          </label>

          {form.image && (
            <img
              src={form.image}
              className="h-32 rounded-md object-cover border"
            />
          )}

          <Button size="sm" onClick={saveEvent}>
            <PlusCircle className="w-4 h-4 mr-1" />
            {editingId ? "Update Event" : "Add Event"}
          </Button>
        </CardContent>
      </Card>

      {/* LIST */}
      <Card>
        <CardHeader className="py-2 font-semibold">Event List</CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {filteredEvents.map((e) => (
              <AccordionItem key={e.id} value={String(e.id)}>
                <AccordionTrigger>
                  {e.name}
                  <Badge
                    className={`ml-2 ${
                      e.status === "Upcoming"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {e.status}
                  </Badge>
                </AccordionTrigger>

                <AccordionContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(e.date).toLocaleDateString("en-IN")}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {e.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {e.location}
                  </div>

                  {e.image && (
                    <img
                      src={e.image}
                      className="h-40 rounded-md object-cover border"
                    />
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(e.id);
                       setForm({
  name: e.name,
  date: e.date,
  time: e.time,
  location: e.location,
  image: e.image ?? "", // 👈 safe default
});
                      }}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteEvent(e.id)}
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
