"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Star, Clock, Globe, X, Search, ArrowRight, Calendar, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  instructor_id: string;
  price: number;
  hours: number;
  level: string;
  rating: number;
  students_count: number;
  created_at: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("Latest");
  const [durationFilter, setDurationFilter] = useState<string>("All");

  // Enrollment counts: { [course_id]: count }
  const [enrollmentCounts, setEnrollmentCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchCoursesAndEnrollments() {
      try {
        // Fetch courses
        const { data: coursesData, error: supabaseError } = await supabase
          .from("courses")
          .select(`
            *,
            profiles:instructor_id (
              full_name
            )
          `)
          .order("created_at", { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }
        if (!coursesData) {
          throw new Error("No data received from Supabase");
        }
        setCourses(coursesData);
        setError(null);

        // Fetch enrollment counts
        const { data: enrollRows, error: enrollError } = await supabase
          .from("enrollment")
          .select("course_id");
        if (enrollError) throw enrollError;
        const counts: { [key: string]: number } = {};
        (enrollRows || []).forEach((row: any) => {
          counts[row.course_id] = (counts[row.course_id] || 0) + 1;
        });
        setEnrollmentCounts(counts);
      } catch (err) {
        console.error("Error fetching courses or enrollments:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch courses");
        setCourses([]);
        setEnrollmentCounts({});
      } finally {
        setLoading(false);
      }
    }
    fetchCoursesAndEnrollments();
  }, []);

  // Filtering logic
  const filteredCourses = courses
    .filter((course) => {
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        if (
          !course.title.toLowerCase().includes(q) &&
          !course.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      // Level filter
      if (levelFilter !== "Latest" && levelFilter !== "All") {
        if (course.level.toLowerCase() !== levelFilter.toLowerCase()) {
          return false;
        }
      }
      // Duration filter
      if (durationFilter !== "All") {
        if (durationFilter === "Short" && course.hours >= 5) return false;
        if (durationFilter === "Medium" && (course.hours < 5 || course.hours > 10)) return false;
        if (durationFilter === "Long" && course.hours <= 10) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (levelFilter === "Latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Error Loading Courses</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <section className="py-20 bg-gray-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">Find Perfect one</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Choose your perfect one and Enroll
            </h2>

            {/* Category Navigation */}
            {/* <div className="flex space-x-8">
              <button className="text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">Baking</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Business Management</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Digital Marketing</button>
            </div> */}
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Course Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-orange-600 text-2xl">🍰</span>
                    </div>
                    <p className="text-orange-600 text-sm">Baking Course</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">(12k)</span>
                </div>

                {/* Lesson Count */}
                <div className="absolute bottom-4 left-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <BookOpen className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">6 Lessons</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <Calendar className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">3:56:59</span>
                </div>
              </div>

              <div className="p-6">
                {/* Instructor */}
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-orange-600 text-xs">👤</span>
                  </div>
                  <span className="text-orange-500 text-sm">Course Instructor</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">Baking a simple cake</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">
                  Conubia egestas eos laboris netus velit mi aliquid aute euismod, integer? Quo class taciti labore
                </p>

                {/* Action and Price */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-800 hover:text-orange-500 transition-colors">
                    <span className="text-sm font-medium">Enroll now</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                  <span className="text-orange-500 font-semibold">Free</span>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-orange-600 text-2xl">🥖</span>
                    </div>
                    <p className="text-orange-600 text-sm">Dough Making</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">(12k)</span>
                </div>

                {/* Lesson Count */}
                <div className="absolute bottom-4 left-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <BookOpen className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">6 Lessons</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <Calendar className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">3:56:59</span>
                </div>
              </div>

              <div className="p-6">
                {/* Instructor */}
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-orange-600 text-xs">👤</span>
                  </div>
                  <span className="text-orange-500 text-sm">Course Instructor</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">Baking a simple cake</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">
                  Conubia egestas eos laboris netus velit mi aliquid aute euismod, integer? Quo class taciti labore
                </p>

                {/* Action and Price */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-800 hover:text-orange-500 transition-colors">
                    <span className="text-sm font-medium">Enroll now</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                  <span className="text-orange-500 font-semibold">Free</span>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-orange-600 text-2xl">🍩</span>
                    </div>
                    <p className="text-orange-600 text-sm">Donut Making</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">(12k)</span>
                </div>

                {/* Lesson Count */}
                <div className="absolute bottom-4 left-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <BookOpen className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">6 Lessons</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <Calendar className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">3:56:59</span>
                </div>
              </div>

              <div className="p-6">
                {/* Instructor */}
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-orange-600 text-xs">👤</span>
                  </div>
                  <span className="text-orange-500 text-sm">Course Instructor</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">Baking a simple cake</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">
                  Conubia egestas eos laboris netus velit mi aliquid aute euismod, integer? Quo class taciti labore
                </p>

                {/* Action and Price */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-800 hover:text-orange-500 transition-colors">
                    <span className="text-sm font-medium">Enroll now</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                  <span className="text-orange-500 font-semibold">Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <button className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-orange-500 transition-colors">
              <ArrowRight className="h-4 w-4 text-gray-400 rotate-180" />
            </button>
            <button className="w-10 h-10 bg-orange-500 border-2 border-orange-500 rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}