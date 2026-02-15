"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { DollarSign, Users, BookOpen, Plus, Edit, Trash2, Star, Link, Eye } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useFieldArray } from "react-hook-form";

// Types
interface Course {
  id: string;
  title: string;
  subtitle: string;
  introduction_video: string;
  description: string;
  price: number;
  category: string;
  level: string;
  hours: number;
  image_url: string;
  created_at: string;
  instructor_id: string;
  rating?: number;
  what_you_will_learn: string[];
  ingredients: string[];
  who_is_this_course_for: string[];
  requirements: string[];
  updated_at: string;

}

interface DashboardStats {
  totalRevenue: number;
  totalStudents: number;
  activeCourses: number;
  averageRating: number;
}

// Form schema
const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  subtitle: z.string().min(1, "Subtitle is required").max(200, "Subtitle must be less than 200 characters"),
  introduction_video: z.string().optional().nullable(),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000, "Description must be less than 1000 characters"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  hours: z.number().min(1, "Hours must be at least 1"),
  what_you_will_learn: z.array(z.string()).min(1, "Add at least one learning outcome"),
  ingredients: z.array(z.string()).min(1, "Add at least one requirement"),
  who_is_this_course_for: z.array(z.string()).min(1, "Add at least one requirement"),
  requirements: z.array(z.string()).min(1, "Add at least one requirement"),

});

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Helper component for array fields
function ArrayField({
  label,
  name,
  control,
  placeholder
}: {
  label: string;
  name: "what_you_will_learn" | "ingredients";
  control: any;
  placeholder: string;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel>{label}</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={control}
                  name={`${name}.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No items added. Click &quot;Add Item&quot; to start.
            </p>
          )}
        </FormItem>
      )}
    />
  );
}

export default function LecturerDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalStudents: 0,
    activeCourses: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  // Form setup
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      introduction_video: "",
      description: "",
      price: 10000,
      category: "",
      level: "",
      hours: 1,
      what_you_will_learn: [""],
      ingredients: [""],
      who_is_this_course_for: [""],
      requirements: [""]

    }
  });

  const editForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      introduction_video: "",
      description: "",
      price: 10000,
      category: "",
      level: "",
      hours: 1,
      what_you_will_learn: [""],
      ingredients: [""],
      who_is_this_course_for: [""],
      requirements: [""]

    }
  });

  // Effects
  useEffect(() => {
    initializeDashboard();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (courses.length > 0) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  // Data fetching functions
  async function initializeDashboard() {
    try {
      setLoading(true);
      await Promise.all([
        fetchCourses(),
        fetchStats()
      ]);
    } catch (error: any) {
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchCourses() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    setCourses(data || []);
  }

  async function fetchStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch all courses for this tutor
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .select('id, price')
      .eq('instructor_id', user.id);

    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
      return;
    }

    const courseIds = (coursesData || []).map(c => c.id);
    let totalRevenue = 0;
    let totalStudents = 0;

    if (courseIds.length > 0) {
      // Fetch all enrollments for these courses
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollment')
        .select('course_id, student_id');

      if (enrollmentsError) {
        console.error('Error fetching enrollments:', enrollmentsError);
      } else {
        // For each course, count enrollments and multiply by price
        totalRevenue = coursesData.reduce((sum, course) => {
          const enrolledCount = enrollmentsData.filter(e => e.course_id === course.id).length;
          return sum + (enrolledCount * (course.price || 0));
        }, 0);
        // Unique students across all courses
        const studentSet = new Set(
          enrollmentsData
            .filter(e => courseIds.includes(e.course_id))
            .map(e => e.student_id)
        );
        totalStudents = studentSet.size;
      }
    }

    const activeCourses = courseIds.length;
    const averageRating = courses.length > 0
      ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length
      : 0;

    setStats({
      totalRevenue,
      totalStudents,
      activeCourses,
      averageRating: Math.round(averageRating * 10) / 10
    });
  }

  // File handling
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  }

  async function uploadToContabo(file: File): Promise<string> {
    // 1. Get presigned URL
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!res.ok) throw new Error("Failed to get upload URL");
    const { uploadUrl, publicUrl } = await res.json();

    // 2. Upload to Contabo
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!uploadRes.ok) throw new Error("Upload failed");
    return publicUrl;
  }

  // Form submission
  async function onSubmit(data: CourseFormValues) {
    try {
      setIsCreating(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadToContabo(selectedFile);
      }

      let introVideoUrl = data.introduction_video;
      const introVideoInput = document.getElementById("introVideo") as HTMLInputElement;
      const introVideoFile = introVideoInput?.files?.[0];

      if (introVideoFile) {
        introVideoUrl = await uploadToContabo(introVideoFile);
      }

      const { error } = await supabase
        .from("courses")
        .insert({
          title: data.title,
          subtitle: data.subtitle,
          introduction_video: introVideoUrl,
          description: data.description,
          price: data.price,
          category: data.category,
          level: data.level,
          hours: data.hours,
          image_url: imageUrl,
          instructor_id: user.id,
          what_you_will_learn: data.what_you_will_learn,
          ingredients: data.ingredients,
          who_is_this_course_for: data.who_is_this_course_for,
          requirements: data.ingredients
        });

      if (error) throw error;

      toast({
        title: "Course created successfully",
        description: "Your new course has been published.",
      });

      // Reset form and close dialog
      form.reset();
      setSelectedFile(null);
      setFilePreview(null);
      setDialogOpen(false);

      // Refresh data
      await fetchCourses();
      await fetchStats();

    } catch (error: any) {
      toast({
        title: "Error creating course",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  }

  // Update course
  async function onUpdate(data: CourseFormValues) {
    if (!courseToEdit) return;

    try {
      setIsEditing(true);

      let imageUrl = courseToEdit.image_url;
      if (selectedFile) {
        imageUrl = await uploadToContabo(selectedFile);
      }

      let introVideoUrl = data.introduction_video;
      const introVideoInput = document.getElementById("introVideoEdit") as HTMLInputElement;
      const introVideoFile = introVideoInput?.files?.[0];

      if (introVideoFile) {
        introVideoUrl = await uploadToContabo(introVideoFile);
      }

      const { error } = await supabase
        .from("courses")
        .update({
          title: data.title,
          subtitle: data.subtitle,
          introduction_video: introVideoUrl,
          description: data.description,
          price: data.price,
          category: data.category,
          level: data.level,
          hours: data.hours,
          image_url: imageUrl,
          what_you_will_learn: data.what_you_will_learn,
          ingredients: data.ingredients,
          who_is_this_course_for: data.who_is_this_course_for,
          requirements: data.ingredients,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseToEdit.id);

      if (error) throw error;

      toast({
        title: "Course updated successfully",
        description: "Your course has been updated.",
      });

      // Reset form and close dialog
      editForm.reset();
      setSelectedFile(null);
      setFilePreview(null);
      setEditDialogOpen(false);
      setCourseToEdit(null);

      // Refresh data
      await fetchCourses();
      await fetchStats();

    } catch (error: any) {
      toast({
        title: "Error updating course",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsEditing(false);
    }
  }

  // Delete course
  async function deleteCourse(courseId: string) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Course deleted",
        description: "The course has been successfully deleted.",
      });

      // Refresh data
      await fetchCourses();
      await fetchStats();
      setCourseToDelete(null);

    } catch (error: any) {
      toast({
        title: "Error deleting course",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">Manage your courses and track your performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TZS {stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalStudents} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              Published and available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {stats.averageRating > 0 ? 'Out of 5 stars' : 'No ratings yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manage Courses</CardTitle>
              <CardDescription>
                View all courses and manage them.
              </CardDescription>
            </div>

            {/* Create Course Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new course.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter course title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subtitle */}
                    <FormField
                      control={form.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtitle</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter course subtitle" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Introduction Video Link */}
                    <FormField
                      control={form.control}
                      name="introduction_video"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Introduction Video (Link OR Upload)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter video link" {...field} value={field.value || ""} />
                          </FormControl>
                          <div className="mt-2">
                            <Label htmlFor="introVideo" className="text-xs">OR Upload Video File</Label>
                            <Input id="introVideo" type="file" accept="video/*" className="mt-1" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter course description (minimum 50 characters)"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cover Image */}
                    <div className="space-y-3">
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                      {filePreview && (
                        <div className="mt-2">
                          <img
                            src={filePreview}
                            alt="Course cover preview"
                            className="w-full h-32 object-cover rounded-md border"
                          />
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Baking">Baking</SelectItem>
                                  <SelectItem value="Business Management">Business Management</SelectItem>
                                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price and Hours */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (TZS)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Hours)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Level */}
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="All Levels">All Levels</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* What You Will Learn */}
                    <ArrayField
                      control={form.control}
                      name="what_you_will_learn"
                      label="What You Will Learn"
                      placeholder="Enter a learning outcome"
                    />

                    {/* ingredients */}
                    <ArrayField
                      control={form.control}
                      name="ingredients"
                      label="Ingredients"
                      placeholder="Enter a requirement"
                    />



                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                        disabled={isCreating}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreating}>
                        {isCreating ? "Creating..." : "Create Course"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Edit Course Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Course</DialogTitle>
                  <DialogDescription>
                    Update the course details below.
                  </DialogDescription>
                </DialogHeader>

                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onUpdate)} className="space-y-6">
                    {/* Title */}
                    <FormField
                      control={editForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter course title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subtitle */}
                    <FormField
                      control={editForm.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtitle</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter course subtitle" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Introduction Video Link */}
                    <FormField
                      control={editForm.control}
                      name="introduction_video"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Introduction Video (Link OR Upload)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter video link" {...field} value={field.value || ""} />
                          </FormControl>
                          <div className="mt-2">
                            <Label htmlFor="introVideoEdit" className="text-xs">OR Upload New Video</Label>
                            <Input id="introVideoEdit" type="file" accept="video/*" className="mt-1" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter course description (minimum 50 characters)"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cover Image */}
                    <div className="space-y-3">
                      <Label htmlFor="editCoverImage">Cover Image</Label>
                      <Input
                        id="editCoverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                      {filePreview && (
                        <div className="mt-2">
                          <img
                            src={filePreview}
                            alt="Course cover preview"
                            className="w-full h-32 object-cover rounded-md border"
                          />
                        </div>
                      )}
                    </div>

                    {/* Price and Hours */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (TZS)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Hours)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Level */}
                    <FormField
                      control={editForm.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="All Levels">All Levels</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* What You Will Learn */}
                    <ArrayField
                      control={editForm.control}
                      name="what_you_will_learn"
                      label="What You Will Learn"
                      placeholder="Enter a learning outcome"
                    />

                    {/* ingredients */}
                    <ArrayField
                      control={editForm.control}
                      name="ingredients"
                      label="ingredients"
                      placeholder="Enter a requirement"
                    />



                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditDialogOpen(false);
                          setCourseToEdit(null);
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        disabled={isEditing}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isEditing}>
                        {isEditing ? "Updating..." : "Update Course"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Level</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Price (TZS)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Hours</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Ratings</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Last Updated</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center space-y-2">
                          <BookOpen className="h-8 w-8 text-muted-foreground/50" />
                          <p>No courses created yet</p>
                          <p className="text-xs">Create your first course to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (

                      <tr key={course.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            {course.image_url && (
                              <img
                                src={course.image_url}
                                alt={course.title}
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="text-sm font-medium">{course.title}</p>
                              <p className="text-xs text-muted-foreground">{course.subtitle}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{course.level}</td>
                        <td className="px-4 py-3 text-sm">{course.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">{course.hours}h</td>
                        <td className="px-4 py-3 text-sm">
                          {course.rating ? (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No ratings</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(course.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(course.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setCourseToEdit(course);
                                editForm.reset({
                                  title: course.title,
                                  subtitle: course.subtitle,
                                  introduction_video: course.introduction_video,
                                  description: course.description,
                                  price: course.price,
                                  level: course.level,
                                  hours: course.hours,
                                  what_you_will_learn: course.what_you_will_learn,
                                  ingredients: course.ingredients,

                                });
                                setFilePreview(course.image_url);
                                setEditDialogOpen(true);
                              }}
                            >
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
                                    Are you sure you want to delete &quot;{course.title}&quot;?
                                    This action cannot be undone and will remove all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteCourse(course.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete Course
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            {/* <Link href={`/dashboard/tutor/courses/${course.id}`} key={course.id}> */}
                            <Button variant="outline" size="icon" onClick={() => router.push(`/dashboard/tutor/courses/${course.id}`)}>
                              {/* <Link href={`/dashboard/tutor/courses/${course.id}`} key={course.id}> */}
                              <Eye className="h-4 w-4" />
                              {/* </Link> */}
                            </Button>
                            {/* </Link> */}


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