"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function UpcomingEventRibbon() {
  const [event, setEvent] = useState<any>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Clear ribbon closed state on page load so it always shows fresh
    localStorage.removeItem('ribbonClosed');
  }, []);

  useEffect(() => {
    async function fetchUpcomingEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, event_date")
        .order("event_date", { ascending: true })
        .limit(1)
        .single();
      if (!error && data) setEvent(data);
    }
    fetchUpcomingEvent();
  }, []);

  if (!event || !show) return null;

  const date = new Date(event.event_date);
  const formatted = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('ribbonClosed', 'true');
  };

  // Ribbon height for layout shift prevention
  const ribbonHeight = 40; // px

  return (
    <div className="sticky top-0 w-full bg-primary text-white text-sm py-2 px-4 flex items-center justify-center gap-4 z-[100] shadow">
      <Calendar className="h-4 w-4 mr-2 inline-block" />
      <span className="font-semibold">Upcoming Event:</span>
      <span className="truncate max-w-xs md:max-w-md font-medium">{event.title}</span>
      <span className="hidden sm:inline">| {formatted}</span>
      <Link href={`/events/${event.id}`} className="underline font-semibold ml-2">Details</Link>
      {/* <button onClick={handleClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg">&times;</button> */}
    </div>
  );
} 