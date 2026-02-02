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
import { Star, Clock, FileText, Video, Users, CheckCircle, BookOpen, Play, FileText as FileTextIcon, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogTrigger } from '@radix-ui/react-dialog';

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/components/UserProvider";
import { useCallback } from "react";
import { createClient } from '@supabase/supabase-js';


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

interface CourseSummary {
  id: string;
  title: string;
  image_url: string | null;
  price: number;
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
  discount: number;
  free?: boolean;
  level: string | null;
  ingredients: string[];
  what_you_will_learn: string[];
  who_is_this_course_for: string[];
  chapters: CourseChapter[];
  total_chapters: number;
  total_duration: number;
  total_lessons: number;
}

function CoursePage({ params }: { params: { id: string } }) {
  // Use state to manage the payment status from the URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [enrollLoading, setEnrollLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<CourseChapter | null>(null);
  const [selectedContent, setSelectedContent] = useState<CourseChapter['items'][0] | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'discussion'>('description');

  const [students, setStudents] = useState<any[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollStatusLoading, setEnrollStatusLoading] = useState(true);
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);
  const { user, loading: userLoading } = useUser();

  const [recommendations, setRecommendations] = useState<CourseSummary[]>([]);

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
            discount,
            price,
            free,
            level,
            ingredients,
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
          ingredients: courseData.ingredients || [],
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

  // Recommendations (3 other courses)
  useEffect(() => {
    async function fetchRecommendations() {
      const { data } = await supabase
        .from('courses')
        .select('id,title,image_url,price')
        .neq('id', params.id)
        .limit(3);
      setRecommendations((data || []) as CourseSummary[]);
    }
    fetchRecommendations();
  }, [params.id]);

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




  // DPO Enroll Handler
  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (!course) return;

    setEnrollLoading(true);

    try {
      // Check if course is free
      if (course.free || course.price === 0) {

        // Initialize Admin Client for DB operations (Bypasses RLS)
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          }
        );


        // 2. Fetch course details to verify it is free
        const { data: verifiedCourse, error: courseError } = await supabaseAdmin
          .from('courses')
          .select('id, price, free, title')
          .eq('id', course.id)
          .single();

        if (courseError || !verifiedCourse) {
          alert('Course not found');
          return;
        }

        // 3. Verify the course is actually free
        const isFree = verifiedCourse.free === true || verifiedCourse.price === 0;
        if (!isFree) {
          alert('This course is not free. Payment required.');
          return;
        }

        // 4. Check if already enrolled
        const { data: existingEnrollment } = await supabaseAdmin
          .from('enrollment')
          .select('id')
          .eq('course_id', course.id)
          .eq('student_id', user.id)
          .maybeSingle();

        if (existingEnrollment) {
          alert('Already enrolled');
          return;
        }

        // 5. Create a "free" transaction record
        const { data: transaction, error: txError } = await supabaseAdmin
          .from('transactions')
          .insert({
            course_id: course.id,
            student_id: user.id,
            price: 0,
            currency: 'TZS',
            payment_status: 'completed',
            transaction_token: `free_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            email: user?.email,
            payment_method: 'free_enrollment',
            transaction_reference: `FREE-${course.id}-${user.id}-${Date.now()}`,
          })
          .select()
          .single();

        if (txError) {
          console.error('Transaction creation failed:', txError);
          alert('Failed to process enrollment');
          return;
        }

        // 6. Create enrollment record
        const { error: enrollError } = await supabaseAdmin
          .from('enrollment')
          .insert({
            course_id: course.id,
            student_id: user.id,
            transaction_id: transaction.id,
          });

        if (enrollError) {
          console.error('Enrollment creation failed:', enrollError);
          alert('Failed to create enrollment');
          return;
        }

        window.location.reload();

      }
      else {
        // Paid Course Flow
        const clickPesaURL = process.env.NEXT_PUBLIC_CLICK_PESA_URL;
        const clickPesaClientID = process.env.NEXT_PUBLIC_CLICK_PESA_CLIENT_ID;
        const clickPesaAPIKey = process.env.NEXT_PUBLIC_CLICK_PESA_API_KEY;


        // 1. Generate ClickPesa Authorization Token
        const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_CLICK_PESA_URL}/generate-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': `${process.env.NEXT_PUBLIC_CLICK_PESA_CLIENT_ID}`,
            'api-key': `${process.env.NEXT_PUBLIC_CLICK_PESA_API_KEY}`,
          },
          body: JSON.stringify({}),
        });

        const tokenData = await tokenRes.json();
        if (!tokenData.success) {
          alert('Failed to initiate payment.');
          return;
        }

        const bearerToken = tokenData.token;
        const reference = `REF${course.id}-${user.id}-${Date.now()}`;

        // 2. Create ClickPesa Payment Link
        const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_CLICK_PESA_URL}/checkout-link/generate-checkout-url`, {
          method: 'POST',
          headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalPrice: course.price,
            orderReference: reference.replace(/[^a-zA-Z0-9]/g, ''),
            orderCurrency: 'TZS',
            customerName: user.user_metadata.full_name,
            customerEmail: user.email,
            customerPhone: user.user_metadata.phone,
            description: course.title,
            redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payments/${reference.replace(/[^a-zA-Z0-9]/g, '')}?courseId=${course.id}`,
            checksum: ''
          }),
        });

        const paymentData = await paymentRes.json();
        if (paymentData.checkoutLink !== null) {
          window.location.href = paymentData.checkoutLink;
          // The response should be a url to redirect the user to payments page to check status
        } else {
          alert('Failed to initiate payment.');
        }
      }

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Payment error.');
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
                <div className="h-80 bg-muted rounded"></div>
                <div className="h-40 bg-muted rounded"></div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-80 bg-muted rounded"></div>
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
        {/* Top Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{course_data.title}</h1>
            {course_data.subtitle && (
              <p className="text-sm text-muted-foreground">{course_data.subtitle}</p>
            )}
          </div>
          <Button
            onClick={handleEnroll}
            disabled={enrollLoading || enrollStatusLoading || isEnrolled}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {enrollStatusLoading
              ? 'Checking...'
              : isEnrolled
                ? 'Enrolled'
                : enrollLoading
                  ? 'Processing...'
                  : (course_data.free || course_data.price === 0)
                    ? 'Enroll for Free'
                    : 'Enroll now'}
          </Button>
        </div>

        {/* Top Banner: Dynamic Video Player */}
        <div className="relative rounded-lg overflow-hidden mb-8 border">
          {isEnrolled && selectedContent ? (
            selectedContent.type === "video" && selectedContent.video_url ? (
              (() => {
                const videoId = getYouTubeVideoId(selectedContent.video_url);
                return videoId ? (
                  <iframe
                    width="100%"
                    height="420"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title={selectedContent.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[360px] md:h-[420px] rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[360px] md:h-[420px] bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Play className="w-16 h-16 mx-auto mb-2" />
                      <p>Invalid Video URL</p>
                    </div>
                  </div>
                );
              })()
            ) : selectedContent.type === "document" && selectedContent.file_url ? (
              <iframe
                src={selectedContent.file_url}
                title={selectedContent.title}
                className="w-full h-[360px] md:h-[600px] rounded-lg border-none"
              />
            ) : (
              <div className="w-full h-[360px] md:h-[420px] bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Play className="w-16 h-16 mx-auto mb-2" />
                  <p>No preview available</p>
                </div>
              </div>
            )
          ) : course_data.introduction_video && course_data.introduction_video.includes("youtube.com") ? (
            (() => {
              const videoId = getYouTubeVideoId(course_data.introduction_video);
              return videoId ? (
                <iframe
                  width="100%"
                  height="420"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Introduction Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[360px] md:h-[420px] rounded-lg"
                />
              ) : (
                <div className="w-full h-[360px] md:h-[420px] bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Play className="w-16 h-16 mx-auto mb-2" />
                    <p>Introduction Video</p>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="w-full h-[360px] md:h-[420px] bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Play className="w-16 h-16 mx-auto mb-2" />
                <p>Introduction Video</p>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Modules + Recommendations */}
          <div className="order-2 lg:order-1">
            {/* Module List */}
            <div className="space-y-2 mb-4">
              <div className="bg-white rounded-lg border">
                <Accordion type="multiple" defaultValue={course_data.chapters.map((_, idx) => `chapter-${idx}`)} className="w-full">
                  {course_data.chapters.map((chapter, idx) => (
                    <AccordionItem key={chapter.id} value={`chapter-${idx}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center text-xs">{idx + 1}</span>
                          <span className="font-medium">{chapter.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-2">
                          {chapter.items.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (isEnrolled) {
                                  setSelectedChapter(chapter);
                                  setSelectedContent(item);
                                }
                              }}
                              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isEnrolled ? 'hover:bg-muted cursor-pointer' : 'bg-muted cursor-not-allowed opacity-60'} ${selectedContent?.id === item.id ? 'bg-orange-50 border border-orange-200' : ''}`}
                              title={isEnrolled ? '' : 'You must be enrolled to access this content.'}
                            >
                              {item.type === "video" ? (
                                <Video className="h-4 w-4 text-primary" />
                              ) : (
                                <FileTextIcon className="h-4 w-4 text-primary" />
                              )}
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{item.title}</p>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {item.type === "video"
                                  ? `${item.duration} min`
                                  : `${item.pages} pages`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Certificate CTA */}
              {/* <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
                <div className="text-sm font-medium text-orange-700">You made it! Get your certificate</div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">Get</Button>
              </div> */}
            </div>

            {/* More course for you */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">More course for you</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rc) => (
                  <div key={rc.id} className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden bg-muted relative">
                      <Image src={rc.image_url || '/placeholder-course.jpg'} alt={rc.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm line-clamp-1">{rc.title}</p>
                      <p className="text-xs text-muted-foreground">{rc.price ? `TZS ${rc.price.toLocaleString()}` : 'Free'}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Header Section */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{course_data.title}</h1>
                {course_data.subtitle && (
                  <p className="text-sm text-muted-foreground">{course_data.subtitle}</p>
                )}
              </div>
              <Button
                onClick={handleEnroll}
                disabled={enrollLoading || enrollStatusLoading || isEnrolled}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {enrollStatusLoading
                  ? 'Checking...'
                  : isEnrolled
                    ? 'Enrolled'
                    : enrollLoading
                      ? 'Processing...'
                      : (course_data.free || course_data.price === 0)
                        ? 'Enroll for Free'
                        : 'Enroll now'}
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b mb-4">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-2 py-2 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-orange-500' : 'text-muted-foreground'}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-2 py-2 text-sm font-medium ${activeTab === 'ingredients' ? 'border-b-2 border-orange-500' : 'text-muted-foreground'}`}
                >
                  Ingredients
                </button>
                {/* <button 
                  onClick={() => setActiveTab('discussion')}
                  className={`px-2 py-2 text-sm font-medium ${activeTab === 'discussion' ? 'border-b-2 border-orange-500' : 'text-muted-foreground'}`}
                >
                  Discussion Forum
                </button> */}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Description</h3>
                  <p className="text-muted-foreground mb-4">{course_data.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">What You&apos;ll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {course_data.what_you_will_learn.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {course_data.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* {activeTab === 'discussion' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Discussion Forum</h3>
                  <p className="text-muted-foreground">Join the discussion with other students and instructors.</p>
                  <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Discussion forum coming soon!</p>
                  </div>
                </div>
              )} */}
            </div>

            {/* Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <div className="text-muted-foreground">Instructor:</div>
                  <div className="font-medium">{course_data.instructor_id ? 'Instructor' : 'Instructor'}</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Category:</div>
                <div className="font-medium">Baking</div>
              </div>
              <div className="text-sm flex items-center gap-2">
                <div className="text-muted-foreground">Reviews:</div>
                <div className="flex text-orange-500">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-current" />))}
                </div>
                <span className="text-muted-foreground text-sm">(35)</span>
              </div>
              <div className="text-sm sm:col-span-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Enrolled students {enrollmentCount}</span>
              </div>
              <div className="text-right font-semibold text-lg lg:col-start-3">Price: {course_data.price ? `TZS ${course_data.price.toLocaleString()}` : 'Free'}</div>
            </div>

            {/* What about it? */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">What about it?</h2>
              <p className="text-muted-foreground mb-4">{course_data.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="relative w-full h-56 rounded-lg overflow-hidden border">
                  <Image src={course_data.image_url || '/placeholder-course.jpg'} alt="course" fill style={{ objectFit: 'cover' }} />
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CoursePage;
