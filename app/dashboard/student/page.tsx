"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calendar, Clock } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { getUserInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserNavProps {
  user: User;
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        setUser(null);
      } else {
        setUser(session.user);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchEnrollments() {
      setLoading(true);
      setError(null);
      try {
        if (!user) return;
        const { data, error: enrollError } = await supabase
          .from("enrollment")
          .select(`
            id,
            created_at,
            course:course_id (
              id,
              title,
              price,
              image_url,
              instructor:instructor_id (full_name)
            )
          `)
          .eq("student_id", user.id)
          .order("created_at", { ascending: false });
        if (enrollError) throw enrollError;
        setEnrollments(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch enrollments");
      } finally {
        setLoading(false);
      }
    }
    fetchEnrollments();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
        {user && (
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || "User"} />
            <AvatarFallback>{getUserInitials(user.email || "User")}</AvatarFallback>
          </Avatar>
        )}
        <span>Student Dashboard</span>
        {user && <span className="ml-4 text-base text-muted-foreground">{user.email}</span>}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
          </CardContent>
        </Card> 

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Completed Introduction to React assignment",
                "Attended Advanced JavaScript lecture",
                "Submitted final project for Web Development",
                "Started new course: Data Structures"
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-sm">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Database Design Project", date: "June 15, 2025" },
                { title: "Algorithm Analysis Quiz", date: "June 18, 2025" },
                { title: "System Architecture Essay", date: "June 20, 2025" },
                { title: "Final Presentation", date: "June 25, 2025" }
              ].map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <p className="text-sm font-medium">{deadline.title}</p>
                  <p className="text-sm text-muted-foreground">{deadline.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Enrolled Courses Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
        {loading ? (
          <div>Loading enrolled courses...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : enrollments.length === 0 ? (
          <div className="flex flex-col items-center space-y-2 text-muted-foreground py-8">
            <BookOpen className="h-8 w-8 text-muted-foreground/50" />
            <p>No courses enrolled yet</p>
            <p className="text-xs">Enroll in a course to get started</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Price (TZS)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Enrolled At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {enrollments.map((enroll) => (
                    <tr key={enroll.id} className="hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          {enroll.course?.image_url && (
                            <img
                              src={enroll.course.image_url}
                              alt={enroll.course.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <a href={`/courses/${enroll.course?.id}`} className="text-sm font-medium text-primary hover:underline">
                              {enroll.course?.title || "-"}
                            </a>
                            <p className="text-xs text-muted-foreground">{enroll.course?.subtitle || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{enroll.course?.instructor?.full_name || "-"}</td>
                      <td className="px-4 py-3 text-sm">{enroll.course?.price != null ? enroll.course.price.toLocaleString() : "-"}</td>
                      <td className="px-4 py-3 text-sm">{new Date(enroll.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}