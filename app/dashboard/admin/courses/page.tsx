"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  hours: number;
  level: string;
}

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ id: string; title: string; instructor: string; price: number; hours: number; level: string }>({ id: "", title: "", instructor: "", price: 0, hours: 0, level: "" });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  async function fetchCourses() {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, instructor_id, price, hours, level")
      .order("title", { ascending: true });
    if (!error && data) {
      setCourses(data.map((c: { id: string; title: string; instructor_id: string; price: number; hours: number; level: string }) => ({ id: c.id, title: c.title, instructor: c.instructor_id, price: c.price, hours: c.hours, level: c.level })));
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course: Course) => {
    setForm(course);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    await supabase.from("courses").delete().eq("id", id);
    await fetchCourses();
    setActionLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    if (form.id) {
      // Update
      await supabase.from("courses").update({
        title: form.title,
        instructor_id: form.instructor,
        price: form.price,
        hours: form.hours,
        level: form.level,
      }).eq("id", form.id);
    } else {
      // Insert
      await supabase.from("courses").insert({
        title: form.title,
        instructor_id: form.instructor,
        price: form.price,
        hours: form.hours,
        level: form.level,
      });
    }
    setShowForm(false);
    setForm({ id: "", title: "", instructor: "", price: 0, hours: 0, level: "" });
    await fetchCourses();
    setActionLoading(false);
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
            <BreadcrumbPage>Courses</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Courses</CardTitle>
            <CardDescription>View, add, edit, or remove courses.</CardDescription>
          </div>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{form.id ? "Edit Course" : "Add Course"}</DialogTitle>
                <DialogDescription>
                  {form.id ? "Update course details." : "Enter details to add a new course."}
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
                  <Label>Instructor</Label>
                  <Input
                    placeholder="Instructor"
                    value={form.instructor}
                    onChange={e => setForm({ ...form, instructor: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label>Hours</Label>
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={form.hours}
                    onChange={e => setForm({ ...form, hours: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <Input
                    placeholder="Level"
                    value={form.level}
                    onChange={e => setForm({ ...form, level: e.target.value })}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{form.id ? "Update" : "Add"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Hours</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Level</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        Loading...
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No courses found.
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3">{course.title}</td>
                        <td className="px-4 py-3">{course.instructor}</td>
                        <td className="px-4 py-3">{course.hours}</td>
                        <td className="px-4 py-3">{course.level}</td>
                        <td className="px-4 py-3">{(course.price).toLocaleString()}</td>

                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" onClick={() => handleEdit(course)}>
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
                                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{course.title}&quot;? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(course.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={actionLoading}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 