"use client";

import Image from 'next/image';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SetStateAction, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, FileText, Video, Users, CheckCircle, BookOpen, Play, FileText as FileTextIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogTrigger } from '@radix-ui/react-dialog';

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/components/UserProvider";
import { useCallback } from "react";

interface CourseChapter {
  id: string;
  title: string;
  description?: string;
  position: number;
  items: {
    id: string;
    title: string;
    type: "video" | "document";
    duration?: number;
    pages?: number;
    video_url?: string;
    file_url?: string;
    description?: string;
    position: number;
  }[];
}

interface Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  instructor_id: string;
  introduction_video: string;
  price: number;
  level: string | null;
  requirements: string[];
  what_you_will_learn: string[];
  who_is_this_course_for: string[];
  chapters: CourseChapter[];
  total_chapters: number;
  total_duration: number;
  total_lessons: number;

}

function CoursePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [enrollLoading, setEnrollLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<CourseChapter | null>(null);
  const [selectedContent, setSelectedContent] = useState<CourseChapter['items'][0] | null>(null);

  const [students, setStudents] = useState<any[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollStatusLoading, setEnrollStatusLoading] = useState(true);
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);

  const { user, loading: userLoading } = useUser();

  const handleContentSelect = (content: CourseChapter['items'][0]) => {
    setSelectedContent(content);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedChapter(null);
    setSelectedContent(null);
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    async function fetchCourse() {
      try {
        // Fetch basic course information
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            subtitle,
            description,
            image_url,
            instructor_id,
            introduction_video,
            price,
            level,
            requirements,
            what_you_will_learn,
            who_is_this_course_for
          `)
          .eq("id", params.id)
          .single();

        if (courseError) throw courseError;
        if (!courseData) {
          notFound();
          return;
        }

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
          .eq("course_id", params.id)
          .order("position");

        if (chaptersError) throw chaptersError;

        // Process chapters and contents
        const processedChapters = chaptersData.map(chapter => ({
          id: chapter.id,
          title: chapter.title,

          position: chapter.position,
          items: chapter.course_contents
            .sort((a, b) => a.position - b.position)
            .map(content => ({
              id: content.id,
              title: content.title,
              type: content.content_type,
              duration: content.duration,
              pages: content.pages,
              video_url: content.video_url,
              file_url: content.file_url,

              position: content.position
            }))
        }));

        // Calculate course statistics
        const totalDuration = processedChapters.reduce((total, chapter) =>
          total + chapter.items.reduce((sum, item) =>
            sum + (item.duration || 0), 0), 0);

        const totalLessons = processedChapters.reduce((total, chapter) =>
          total + chapter.items.length, 0);

        // Combine all data
        const fullCourse: Course = {
          ...courseData,
          chapters: processedChapters,
          total_chapters: processedChapters.length,
          total_duration: totalDuration,
          total_lessons: totalLessons,
          // introduction_video:courseData.introduction_video || '',
          requirements: courseData.requirements || [],
          what_you_will_learn: courseData.what_you_will_learn || [],
          who_is_this_course_for: courseData.who_is_this_course_for || [],
          subtitle: courseData.subtitle || "",
          description: courseData.description || "",
          level: courseData.level || "Beginner"
        };

        setCourse(fullCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [params.id, supabase]);

  // Fetch enrolled students
  useEffect(() => {
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
              full_name,
              email
            )
          `)
          .eq("course_id", params.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setStudents(data || []);
      } catch (err: any) {
        setStudentsError(err.message || "Failed to fetch students");
      } finally {
        setStudentsLoading(false);
      }
    }
    fetchStudents();
  }, [params.id, supabase]);

  // Fetch enrollment count for this course
  useEffect(() => {
    async function fetchEnrollmentCount() {
      const { count, error } = await supabase
        .from("enrollment")
        .select("id", { count: "exact", head: true })
        .eq("course_id", params.id);
      if (!error && typeof count === 'number') {
        setEnrollmentCount(count);
      }
    }
    fetchEnrollmentCount();
  }, [params.id, supabase]);

  // Check if user is enrolled in this course
  useEffect(() => {
    async function checkEnrollment() {
      setEnrollStatusLoading(true);
      try {
        if (userLoading) return;
        if (!user) {
          setIsEnrolled(false);
          setEnrollStatusLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("enrollment")
          .select("id")
          .eq("course_id", params.id)
          .eq("student_id", user.id)
          .maybeSingle();
        setIsEnrolled(!!data);
      } catch (err) {
        setIsEnrolled(false);
      } finally {
        setEnrollStatusLoading(false);
      }
    }
    checkEnrollment();
  }, [params.id, supabase, user, userLoading]);

  // Stripe Enroll Handler
  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (!course) return;
    if (course.price === 0) {
      // Free course: handle enrollment directly (not implemented here)
      return;
    }

    setEnrollLoading(true);

    try {
      console.log(user)
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          courseId: course.id,
          courseTitle: course.title,
          price: course.price,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (err) {
      alert('Payment error.');
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-40 bg-muted rounded"></div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">Error Loading Course</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <p className="text-sm text-muted-foreground">Please try refreshing the page. If the problem persists, contact support.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">Course Not Found</h2>
                <p className="text-muted-foreground">The requested course could not be found.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // At this point, course is guaranteed to be non-null
  const course_data = course;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{course_data.title}</h1>
              {course_data.subtitle && (
                <p className="text-xl text-muted-foreground mb-4">{course_data.subtitle}</p>
              )}
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{course_data.level || "Beginner"}</Badge>
                <Badge variant="outline">English</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {enrollmentCount} student{enrollmentCount === 1 ? '' : 's'} enrolled
                  </span>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {course_data.introduction_video && course_data.introduction_video.includes("youtube.com") ? (
                        <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto my-8">
                          <iframe
                            src={course_data.introduction_video}
                            title="Introduction Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-[40vh] rounded-lg"
                          />
                        </div>
                      ) : (
                        course_data.introduction_video
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {course_data.description}
                    </div>
                  </CardContent>
                </Card>

                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle>What You&apos;ll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {course_data.what_you_will_learn.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {course_data.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Who is this course for?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {course_data.who_is_this_course_for.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Course Content</h3>
                      <p className="text-sm text-muted-foreground">
                        {course_data.total_chapters} chapters • {course_data.total_lessons} lessons • {course_data.total_duration} minutes total
                      </p>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {course_data.chapters.map((chapter, index) => (
                        <AccordionItem key={chapter.id} value={`chapter-${index}`}>
                          <AccordionTrigger className="text-lg">
                            <div className="flex flex-col items-start text-left">
                              <span>Chapter {index + 1}: {chapter.title}</span>
                              {chapter.description && (
                                <span className="text-sm text-muted-foreground font-normal">
                                  {chapter.description}
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent>
                            <Dialog open={isEnrolled && dialogOpen} onOpenChange={setDialogOpen}>
                              <DialogContent className="sm:max-w-[94vw] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Chapter {index + 1}: {chapter.title}</DialogTitle>
                                  {chapter.description && (
                                    <DialogDescription>
                                      {chapter.description}
                                    </DialogDescription>
                                  )}
                                </DialogHeader>
                                <div className="flex flex-col md:flex-row gap-6 min-h-[60vh]">
                                  {/* Left: Preview */}
                                  <div className="flex-1 flex items-center justify-center bg-muted rounded-lg min-h-[40vh] p-4">
                                    {selectedContent ? (
                                      selectedContent.type === "video" && selectedContent.video_url ? (
                                        (() => {
                                          const videoId = getYouTubeVideoId(selectedContent.video_url!);
                                          return videoId ? (
                                            <iframe
                                              width="100%"
                                              height="70vh"
                                              src={`https://www.youtube.com/embed/${videoId}`}
                                              title={selectedContent.title}
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                              className="rounded-lg w-full h-[70vh]"
                                            />
                                          ) : (
                                            <div className="text-center text-muted-foreground">Invalid YouTube URL</div>
                                          );
                                        })()
                                      ) : selectedContent.type === "document" && selectedContent.file_url ? (
                                        <iframe
                                          src={selectedContent.file_url}
                                          title={selectedContent.title}
                                          className="w-full h-[70vh] rounded-lg border"
                                        />
                                      ) : (
                                        <div className="text-center text-muted-foreground">No preview available</div>
                                      )
                                    ) : (
                                      <div className="text-center text-muted-foreground">Select content to preview</div>
                                    )}
                                  </div>
                                  {/* Right: Content List */}
                                  <div className="w-full md:w-80 flex-shrink-0 pl-0 md:pl-6 pt-6 md:pt-0">
                                    <div className="font-semibold mb-2">Content</div>
                                    <div className="flex flex-col gap-2">
                                      {chapter.items.map((item) => (
                                        <button
                                          type="button"
                                          key={item.id}
                                          onClick={() => handleContentSelect(item)}
                                          className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${selectedContent && selectedContent.id === item.id ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'}`}
                                        >
                                          {item.type === "video" ? (
                                            <Video className="h-5 w-5 text-primary" />
                                          ) : (
                                            <FileTextIcon className="h-5 w-5 text-primary" />
                                          )}
                                          <div className="flex-grow">
                                            <p className="font-medium line-clamp-1">{item.title}</p>
                                            {item.description && (
                                              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                                            )}
                                          </div>
                                          <span className="text-xs text-muted-foreground">
                                            {item.type === "video"
                                              ? `${item.duration} min`
                                              : `${item.pages} pages`}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogTrigger asChild>
                                <div className="space-y-2">
                                  {chapter.items.map((item) => (
                                    <div
                                      onClick={() => {
                                        if (isEnrolled) {
                                          setDialogOpen(true);
                                          setSelectedChapter(chapter);
                                          setSelectedContent(item);
                                        }
                                      }}
                                      key={item.id}
                                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isEnrolled ? 'hover:bg-muted cursor-pointer' : 'bg-muted cursor-not-allowed opacity-60'}`}
                                      title={isEnrolled ? '' : 'You must be enrolled to access this content.'}
                                    >
                                      {item.type === "video" ? (
                                        <Video className="h-5 w-5 text-primary" />
                                      ) : (
                                        <FileTextIcon className="h-5 w-5 text-primary" />
                                      )}
                                      <div className="flex-grow">
                                        <p className="font-medium">{item.title}</p>
                                        {item.description && (
                                          <p className="text-sm text-muted-foreground">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                      <span className="text-sm text-muted-foreground">
                                        {item.type === "video"
                                          ? `${item.duration} min`
                                          : `${item.pages} pages`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </DialogTrigger>
                            </Dialog>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center p-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Reviews will be available once students complete the course.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6 relative">
                  <Image
                    src={course_data.image_url || '/placeholder-course.jpg'}
                    alt={course_data.title || 'Course thumbnail'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold">
                      {course_data.price ? `TZS ${course_data.price.toLocaleString()}` : 'Free'}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleEnroll}
                    disabled={enrollLoading || enrollStatusLoading || isEnrolled || course_data.price === 0}
                  >
                    {enrollStatusLoading
                      ? 'Checking...'
                      : isEnrolled
                        ? 'Enrolled'
                        : enrollLoading
                          ? 'Redirecting...'
                          : 'Enroll Now'}
                  </Button>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{course_data.total_duration} minutes total</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-muted-foreground" />
                      <span>{course_data.total_lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{enrollmentCount} student{enrollmentCount === 1 ? '' : 's'} enrolled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Enrolled Students Table */}
        {/* <div className="max-w-6xl mx-auto mt-12">
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
                          <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Enrolled At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        {students.map((enroll) => (
                          <tr key={enroll.id} className="hover:bg-muted/20">
                            <td className="px-4 py-3 text-sm">{enroll.student?.full_name || '-'}</td>
                            <td className="px-4 py-3 text-sm">{enroll.student?.email || '-'}</td>
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
        </div> */}
      </div>
    </div>
  );
}

export default CoursePage;
