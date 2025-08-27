"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  heading: string;
  description: string;
  event_date: string;
  location: string;
  cover_photo: string;
  youtube_url: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  created_at?: string;
  updated_at?: string;
}

interface RSVP {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  description: string;
  paid: boolean;
  created_at: string;
  event_id: string;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Event>>({
    id: undefined,
    title: "",
    heading: "",
    description: "",
    event_date: "",
    location: "",
    cover_photo: "",
    youtube_url: "",
    twitter_url: "",
    facebook_url: "",
    instagram_url: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [rsvpsLoading, setRsvpsLoading] = useState(false);
  const [showRsvps, setShowRsvps] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("id, title, heading, description, event_date, location, cover_photo, youtube_url, twitter_url, facebook_url, instagram_url, created_at, updated_at")
        .order("event_date", { ascending: true });
      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    setForm(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploading) {
      setUploadError("Please wait for the image to finish uploading.");
      return;
    }
    if (!form.cover_photo) {
      setUploadError("Please upload a cover photo before submitting.");
      return;
    }
    setUploadError(null);
    if (form.id) {
      // Update
      await supabase.from("events").update({
        title: form.title,
        heading: form.heading,
        description: form.description,
        event_date: form.event_date,
        location: form.location,
        cover_photo: form.cover_photo,
        youtube_url: form.youtube_url,
        twitter_url: form.twitter_url,
        facebook_url: form.facebook_url,
        instagram_url: form.instagram_url,
      }).eq("id", form.id);
      setEvents(events.map((e) => (e.id === form.id ? ({ ...form } as Event) : e)));
    } else {
      // Insert
      const { data, error } = await supabase.from("events").insert({
        title: form.title,
        heading: form.heading,
        description: form.description,
        event_date: form.event_date,
        location: form.location,
        cover_photo: form.cover_photo,
        youtube_url: form.youtube_url,
        twitter_url: form.twitter_url,
        facebook_url: form.facebook_url,
        instagram_url: form.instagram_url,
      }).select().single();
      if (!error && data) {
        setEvents([...events, data]);
      }
    }
    setShowForm(false);
    setForm({
      id: undefined,
      title: "",
      heading: "",
      description: "",
      event_date: "",
      location: "",
      cover_photo: "",
      youtube_url: "",
      twitter_url: "",
      facebook_url: "",
      instagram_url: "",
    });
  };

  const handleShowRsvps = async (event: Event) => {
    setSelectedEvent(event);
    setShowRsvps(true);
    setRsvpsLoading(true);
    const { data, error } = await supabase
      .from("rsvp")
      .select("id, fullname, email, phone, description, paid, created_at, event_id")
      .eq("event_id", event.id)
      .order("created_at", { ascending: false });
    if (!error && data) {
      setRsvps(data);
    }
    setRsvpsLoading(false);
  };

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error } = await supabase.storage.from('event-images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      setUploadError(error.message);
      setUploading(false);
      return;
    }
    // Get public URL
    const { data } = supabase.storage.from('event-images').getPublicUrl(filePath);
    if (data?.publicUrl) {
      setForm(prev => ({ ...prev, cover_photo: data.publicUrl }));
      console.log('Set cover_photo:', data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/admin">Super Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Events</CardTitle>
            <CardDescription>View, add, edit, or remove events. See RSVPs for each event.</CardDescription>
          </div>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{form.id ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogDescription>
                  {form.id ? "Update event details." : "Enter details to add a new event."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Heading</Label>
                  <Input
                    placeholder="Heading"
                    value={form.heading}
                    onChange={e => setForm({ ...form, heading: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Event Date</Label>
                  <Input
                    placeholder="Event Date"
                    type="datetime-local"
                    value={form.event_date}
                    onChange={e => setForm({ ...form, event_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    placeholder="Location"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Cover Photo</Label>
                  {form.cover_photo && (
                    <div className="mb-2">
                      <span className="block text-xs text-muted-foreground mb-1">Current Image:</span>
                      <img src={form.cover_photo} alt="Cover" className="h-24 rounded object-cover" />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoUpload}
                    disabled={uploading}
                  />
                  {uploading && <div className="text-sm text-muted-foreground mt-1">Uploading...</div>}
                  {uploadError && <div className="text-sm text-red-500 mt-1">{uploadError}</div>}
                </div>
                <div>
                  <Label>YouTube URL</Label>
                  <Input
                    placeholder="YouTube URL"
                    value={form.youtube_url}
                    onChange={e => setForm({ ...form, youtube_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Twitter URL</Label>
                  <Input
                    placeholder="Twitter URL"
                    value={form.twitter_url}
                    onChange={e => setForm({ ...form, twitter_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Facebook URL</Label>
                  <Input
                    placeholder="Facebook URL"
                    value={form.facebook_url}
                    onChange={e => setForm({ ...form, facebook_url: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Instagram URL</Label>
                  <Input
                    placeholder="Instagram URL"
                    value={form.instagram_url}
                    onChange={e => setForm({ ...form, instagram_url: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading || !form.cover_photo}>
                    {form.id ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading events...</div>
              ) : (
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Heading</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Event Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Cover</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {events.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                          No events found.
                        </td>
                      </tr>
                    ) : (
                      events.map((event) => (
                        <tr key={event.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3">{event.title}</td>
                          <td className="px-4 py-3">{event.heading}</td>
                          <td className="px-4 py-3">{event.event_date ? new Date(event.event_date).toLocaleString() : ""}</td>
                          <td className="px-4 py-3">{event.location}</td>
                          <td className="px-4 py-3">
                            {event.cover_photo && (
                              <img src={event.cover_photo} alt="Cover" className="h-12 w-20 object-cover rounded" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" onClick={() => handleEdit(event)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete &quot;{event.title}&quot;? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(event.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <Button variant="outline" size="icon" onClick={() => handleShowRsvps(event)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* RSVPs Dialog */}
      <Dialog open={showRsvps} onOpenChange={setShowRsvps}>
        <DialogContent className="max-w-4xl h-[50vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>RSVPs for {selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {rsvpsLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading RSVPs...</div>
          ) : rsvps.length === 0 ? (
            <div className="p-8 text-muted-foreground">No RSVPs for this event.</div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Full Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Paid</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">RSVP Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-muted/20">
                      <td className="px-4 py-3 whitespace-nowrap">{rsvp.fullname}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{rsvp.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{rsvp.phone}</td>
                      <td className="px-4 py-3">{rsvp.description}</td>
                      <td className="px-4 py-3 text-center">{rsvp.paid ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{rsvp.created_at ? new Date(rsvp.created_at).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 