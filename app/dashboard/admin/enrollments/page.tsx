"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Enrollment {
  id: number | null;
  student: string;
  course: string;
}

export default function EnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Enrollment>({ id: null, student: "", course: "" });

  useEffect(() => {
    async function fetchEnrollments() {
      setLoading(true);
      const { data, error } = await supabase
        .from("enrollment")
        .select("id, student_id, course_id")
        .order("id", { ascending: true });
      if (!error && data) {
        setEnrollments(data.map((e: any) => ({ id: e.id, student: e.student_id, course: e.course_id })));
      }
      setLoading(false);
    }
    fetchEnrollments();
  }, []);

  const handleEdit = (enrollment: Enrollment) => {
    setForm(enrollment);
    setShowForm(true);
  };

  const handleDelete = (id: number | null) => {
    setEnrollments(enrollments.filter((e) => e.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.id) {
      setEnrollments(enrollments.map((e) => (e.id === form.id ? form : e)));
    } else {
      setEnrollments([...enrollments, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm({ id: null, student: "", course: "" });
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
            <BreadcrumbPage>Enrollments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Enrollments</CardTitle>
            <CardDescription>View, add, edit, or remove enrollments.</CardDescription>
          </div>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Enrollment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{form.id ? "Edit Enrollment" : "Add Enrollment"}</DialogTitle>
                <DialogDescription>
                  {form.id ? "Update enrollment details." : "Enter details to add a new enrollment."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Student Name</Label>
                  <Input
                    placeholder="Student Name"
                    value={form.student}
                    onChange={e => setForm({ ...form, student: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Course Title</Label>
                  <Input
                    placeholder="Course Title"
                    value={form.course}
                    onChange={e => setForm({ ...form, course: e.target.value })}
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
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading enrollments...</div>
              ) : (
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {enrollments.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                          No enrollments found.
                        </td>
                      </tr>
                    ) : (
                      enrollments.map((enrollment) => (
                        <tr key={enrollment.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3">{enrollment.student}</td>
                          <td className="px-4 py-3">{enrollment.course}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" onClick={() => handleEdit(enrollment)}>
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
                                    <AlertDialogTitle>Delete Enrollment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this enrollment? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(enrollment.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 