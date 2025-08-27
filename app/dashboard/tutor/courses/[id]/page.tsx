"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Trash2, GripVertical, Youtube, FileText, ArrowLeft, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";

// Types
interface Chapter {
  id: string;
  title: string;
  position: number;
  contents: CourseContent[];
}

interface CourseContent {
  id: string;
  title: string;
  content_type: "video" | "document";
  video_url?: string;
  file_url?: string;
  duration?: number;
  pages?: number;
  position: number;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
}

// Form Schemas
const chapterSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content_type: z.enum(["video", "document"]),
  video_url: z.string()
    .url("Must be a valid URL")
    .refine((url) => url.includes("youtube.com") || url.includes("youtu.be"), {
      message: "Must be a valid YouTube URL"
    })
    .optional()
    .nullable(),
  file_url: z.string().optional().nullable(),
  duration: z.number().min(1, "Duration is required").optional().nullable(),
  pages: z.number().min(1, "Number of pages is required").optional().nullable(),
}).refine((data) => {
  if (data.content_type === "video") {
    return data.video_url != null && data.duration != null;
  }
  // Remove file_url validation since it's handled during upload
  return data.pages != null;
}, {
  message: "Please fill in all required fields for the selected content type"
});

type ChapterFormValues = z.infer<typeof chapterSchema>;
type ContentFormValues = z.infer<typeof contentSchema>;

export default function CourseContent({ params: pageParams }: { params: { id: string } }) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const courseId = params.id as string;

  // State
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterDialogOpen, setChapterDialogOpen] = useState(false);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  // Forms
  const chapterForm = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const contentForm = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      content_type: "video",
    },
  });

  // Fetch data
  useEffect(() => {
    fetchCourseAndContent();
    fetchStudents();
  }, [courseId]);

  async function fetchCourseAndContent() {
    try {
      setLoading(true);

      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("id, title, subtitle")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch chapters and their contents
      const { data: chaptersData, error: chaptersError } = await supabase
        .from("chapters")
        .select(`
          id,
          title,
          position,
          course_contents (
            id,
            title,
            content_type,
            video_url,
            file_url,
            duration,
            pages,
            position
          )
        `)
        .eq("course_id", courseId)
        .order("position");

      if (chaptersError) throw chaptersError;

      // Sort contents within each chapter
      const sortedChapters = chaptersData.map(chapter => ({
        ...chapter,
        contents: chapter.course_contents.sort((a, b) => a.position - b.position)
      }));

      setChapters(sortedChapters);

    } catch (error: any) {
      toast({
        title: "Error loading course content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchStudents() {
    setStudentsLoading(true);
    setStudentsError(null);
    try {
      const { data, error } = await supabase
        .from("enrollment")
        .select(`
          id,
          created_at,
          student:student_id (
            full_name
          )
        `)
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setStudents(data || []);
    } catch (err: any) {
      setStudentsError(err.message || "Failed to fetch students");
    } finally {
      setStudentsLoading(false);
    }
  }

  // Chapter operations
  async function onAddChapter(data: ChapterFormValues) {
    try {
      const { data: chapter, error } = await supabase
        .from("chapters")
        .insert({
          course_id: courseId,
          title: data.title,
          position: chapters.length,
        })
        .select()
        .single();

      if (error) throw error;

      setChapters([...chapters, { ...chapter, contents: [] }]);
      chapterForm.reset();
      setChapterDialogOpen(false);

      toast({
        title: "Chapter added",
        description: "The chapter has been added successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error adding chapter",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function onDeleteChapter(chapterId: string) {
    try {
      const { error } = await supabase
        .from("chapters")
        .delete()
        .eq("id", chapterId);

      if (error) throw error;

      setChapters(chapters.filter(ch => ch.id !== chapterId));

      toast({
        title: "Chapter deleted",
        description: "The chapter has been deleted successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error deleting chapter",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  // Content operations
  async function onAddContent(data: ContentFormValues) {
    if (!selectedChapter) return;

    try {
      let fileUrl = null;

      if (data.content_type === "document") {
        // Handle file upload to Supabase storage
        const file = (document.getElementById("contentFile") as HTMLInputElement)?.files?.[0];
        if (!file) {
          toast({
            title: "File required",
            description: "Please select a document to upload",
            variant: "destructive",
          });
          return;
        }

        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload a PDF or Word document",
            variant: "destructive",
          });
          return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: "Please upload a file smaller than 10MB",
            variant: "destructive",
          });
          return;
        }

        try {
          // Create a unique file name
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

          // Upload to Supabase storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("course-content")
            .upload(`documents/${fileName}`, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) throw uploadError;

          // Get the public URL
          const { data: { publicUrl } } = supabase.storage
            .from("course-content")
            .getPublicUrl(`documents/${fileName}`);

          fileUrl = publicUrl;
        } catch (error: any) {
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
      }

      // Create the content record
      const { data: content, error } = await supabase
        .from("course_contents")
        .insert({
          chapter_id: selectedChapter.id,
          title: data.title,
          content_type: data.content_type,
          video_url: data.content_type === "video" ? data.video_url : null,
          file_url: fileUrl, // Use the uploaded file URL
          duration: data.content_type === "video" ? data.duration : null,
          pages: data.content_type === "document" ? data.pages : null,
          position: selectedChapter.contents.length,
        })
        .select()
        .single();

      if (error) throw error;

      setChapters(chapters.map(ch =>
        ch.id === selectedChapter.id
          ? { ...ch, contents: [...ch.contents, content] }
          : ch
      ));

      contentForm.reset();
      setContentDialogOpen(false);

      toast({
        title: "Content added",
        description: "The content has been added successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error adding content",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function onDeleteContent(chapterId: string, contentId: string) {
    try {
      const { error } = await supabase
        .from("course_contents")
        .delete()
        .eq("id", contentId);

      if (error) throw error;

      setChapters(chapters.map(ch =>
        ch.id === chapterId
          ? { ...ch, contents: ch.contents.filter(c => c.id !== contentId) }
          : ch
      ));

      toast({
        title: "Content deleted",
        description: "The content has been deleted successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error deleting content",
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
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-muted-foreground">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/dashboard/tutor")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/tutor")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mt-2">{course.title}</h1>
          <p className="text-muted-foreground">{course.subtitle}</p>
        </div>

        <Dialog open={chapterDialogOpen} onOpenChange={setChapterDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Chapter</DialogTitle>
              <DialogDescription>
                Add a new chapter to your course.
              </DialogDescription>
            </DialogHeader>

            <Form {...chapterForm}>
              <form onSubmit={chapterForm.handleSubmit(onAddChapter)} className="space-y-4">
                <FormField
                  control={chapterForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chapter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setChapterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Chapter</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {chapters.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <h3 className="text-lg font-semibold">No chapters yet</h3>
                <p className="text-muted-foreground">
                  Get started by adding your first chapter.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          chapters.map((chapter, index) => (
            <Card key={chapter.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Chapter {index + 1}: {chapter.title}</CardTitle>
                  <CardDescription>
                    {chapter.contents.length} {chapter.contents.length === 1 ? 'item' : 'items'}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={contentDialogOpen && selectedChapter?.id === chapter.id} onOpenChange={(open) => {
                    setContentDialogOpen(open);
                    if (open) setSelectedChapter(chapter);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Content
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Content</DialogTitle>
                        <DialogDescription>
                          Add content to Chapter {index + 1}: {chapter.title}
                        </DialogDescription>
                      </DialogHeader>

                      <Form {...contentForm}>
                        <form onSubmit={contentForm.handleSubmit(onAddContent)} className="space-y-4">
                          <FormField
                            control={contentForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Content Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter content title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contentForm.control}
                            name="content_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Content Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="document">Document</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {contentForm.watch("content_type") === "video" ? (
                            <>
                              <FormField
                                control={contentForm.control}
                                name="video_url"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>YouTube URL</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., https://youtube.com/watch?v=..."
                                        {...field}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                    <p className="text-sm text-muted-foreground">
                                      Paste a YouTube video URL (e.g., youtube.com/watch?v=... or youtu.be/...)
                                    </p>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={contentForm.control}
                                name="duration"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Duration (minutes)</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        placeholder="Enter video duration"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          ) : (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="contentFile">Upload Document</Label>
                                <Input
                                  id="contentFile"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                />
                                <p className="text-sm text-muted-foreground">
                                  Accepted formats: PDF, DOC, DOCX
                                </p>
                              </div>

                              <FormField
                                control={contentForm.control}
                                name="pages"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number of Pages</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        placeholder="Enter number of pages"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}

                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setContentDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Add Content</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this chapter? This will also delete all content within it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteChapter(chapter.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Chapter
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {chapter.contents.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No content yet. Click &quot;Add Content&quot; to get started.
                    </p>
                  ) : (
                    chapter.contents.map((content, contentIndex) => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-muted rounded-md">
                            {content.content_type === "video" ? (
                              <Youtube className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{content.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {content.content_type === "video" ? (
                                `${content.duration} minutes`
                              ) : (
                                <>
                                  {`${content.pages} pages `}
                                  {content.file_url && (
                                    <a
                                      href={content.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      View Document
                                    </a>
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Content</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this content?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDeleteContent(chapter.id, content.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete Content
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Enrolled Students Table */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            {studentsLoading ? (
              <div>Loading enrolled students...</div>
            ) : studentsError ? (
              <div className="text-red-500">{studentsError}</div>
            ) : students.length === 0 ? (
              <div className="flex flex-col items-center space-y-2 text-muted-foreground py-8">
                <BookOpen className="h-8 w-8 text-muted-foreground/50" />
                <p>No students have enrolled in this course yet.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Student Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Enrolled At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                      {students.map((enroll) => (
                        <tr key={enroll.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm">{enroll.student?.full_name || '-'}</td>
                          <td className="px-4 py-3 text-sm">{new Date(enroll.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 