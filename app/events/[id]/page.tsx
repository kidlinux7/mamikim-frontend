"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { FaYoutube, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ fullname: "", email: "", phone: "", description: "" });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("id, title, heading, description, event_date, location, cover_photo, youtube_url, twitter_url, facebook_url, instagram_url")
        .eq("id", eventId)
        .single();
      if (!error && data) {
        setEvent(data);
      } else {
        setEvent(null);
      }
      setLoading(false);
    }
    if (eventId) fetchEvent();
  }, [eventId]);

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleRsvpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRsvpLoading(true);
    const { error } = await supabase.from("rsvp").insert({
      event_id: event.id,
      fullname: rsvpForm.fullname,
      email: rsvpForm.email,
      phone: rsvpForm.phone,
      description: rsvpForm.description,
    });
    setRsvpLoading(false);
    if (error) {
      toast({ title: "RSVP failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "RSVP successful!", description: "Thank you for registering for this event." });
      setRsvpOpen(false);
      setRsvpForm({ fullname: "", email: "", phone: "", description: "" });
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="text-2xl font-semibold mb-4">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Event Not Found</h2>
        <p className="text-muted-foreground mb-8">The event you are looking for does not exist.</p>
        <Button onClick={() => router.push("/events")}>Back to Events</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Event Details */}
        <div className="w-full lg:w-2/3">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            ← Back
          </Button>
          <div className="rounded-lg overflow-hidden shadow-lg bg-card">
            <div className="relative aspect-video w-full">
              <Image
                src={event.cover_photo || "/logo.png"}
                alt={event.title}
                fill
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-lg mb-6">{event.description}</p>
              {/* Optionally show heading or other fields here */}
              {/* Social links */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Connect with us</h2>
                <div className="flex gap-4">
                  {event.youtube_url && (
                    <a href={event.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <FaYoutube className="w-7 h-7 text-red-600 hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {event.twitter_url && (
                    <a href={event.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <FaTwitter className="w-7 h-7 text-blue-400 hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {event.facebook_url && (
                    <a href={event.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebook className="w-7 h-7 text-blue-600 hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {event.instagram_url && (
                    <a href={event.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram className="w-7 h-7 text-pink-500 hover:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setRsvpOpen(true)}>
                RSVP / Register
              </Button>
            </div>
          </div>
        </div>
        {/* Sidebar: (Optional) You can add upcoming events or related events here */}
      </div>
      <Dialog open={rsvpOpen} onOpenChange={setRsvpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>RSVP for {event.title}</DialogTitle>
            <DialogDescription>Fill in your details to register for this event.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRsvpSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={rsvpForm.fullname}
                onChange={e => setRsvpForm({ ...rsvpForm, fullname: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={rsvpForm.email}
                onChange={e => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={rsvpForm.phone}
                onChange={e => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={rsvpForm.description}
                onChange={e => setRsvpForm({ ...rsvpForm, description: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRsvpOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={rsvpLoading}>
                {rsvpLoading ? "Submitting..." : "Submit RSVP"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 