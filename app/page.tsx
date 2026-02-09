"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Star, Calendar, Users, BookOpen, Award, ArrowRight, Menu, X } from 'lucide-react';
import { FaMapMarker, FaPhoneAlt, FaTwitter, FaUserAlt } from "react-icons/fa";
import { BsInstagram } from 'react-icons/bs';
import { FaCartShopping, FaPeopleGroup, FaSquareFacebook } from 'react-icons/fa6';
import { SiYoutube } from 'react-icons/si';
import { IoLogIn, IoSearch } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter states
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("Latest");
  const [durationFilter, setDurationFilter] = useState<string>("All");

  const heroContent = [
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Free Register & Intership",
      description: "Whether you're looking to master baking skills, volunteer, or work with us, we're here for you.",
      link: "#",
      dark: false
    },
    {
      icon: <FaPeopleGroup className="text-orange-500" />,
      title: "Our Courses",
      description: "Ready to turn your passion for baking into a skill? Join our courses and learn from the best.",
      link: "#",
      dark: true
    },
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Shop and get the best ingredients and tools",
      description: "Need the best ingredients and tools to take your baking to the next level? Shop with us! ",
      link: "#",
      dark: false
    },
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Order your Cakes and Bites",
      description: "Indulging in something sweet? Whether it&apos;s a birthday, wedding or just a craving, we&apos;ve got the perfect cake and bites for you. ",
      link: "#",
      dark: false
    },
  ];


  const stats = [
    { number: "300+", label: "Successful Courses" },
    { number: "6000+", label: "Happy Students" },
    { number: "200+", label: "Certificates Given" },
    { number: "580+", label: "Video Courses" }
  ];

  const events = [
    {
      image: "/api/placeholder/300/180",
      date: "DEC 14",
      title: "Build your dream bakery career 2023",
      location: "New Work, USA",
      time: "10:00 AM - 2:00 PM"
    },
    {
      image: "/api/placeholder/300/180",
      date: "DEC 16",
      title: "Build your dream baking career 2023",
      location: "Chicago, USA",
      time: "9:00 AM - 1:00 PM"
    },
    {
      image: "/api/placeholder/300/180",
      date: "DEC 18",
      title: "Build your dream bakery career 2023",
      location: "Los Angeles, USA",
      time: "11:00 AM - 3:00 PM"
    },
    {
      image: "/api/placeholder/300/180",
      date: "DEC 20",
      title: "Build your dream baking career 2023",
      location: "Miami, USA",
      time: "2:00 PM - 6:00 PM"
    }
  ];

  const advisors = [
    {
      image: "/api/placeholder/120/120",
      name: "Sarah Johnson",
      title: "Baking Expert",
      rating: 4.9
    },
    {
      image: "/api/placeholder/120/120",
      name: "Jennifer Wilson",
      title: "Pastry Chef",
      rating: 4.8
    },
    {
      image: "/api/placeholder/120/120",
      name: "Michael Brown",
      title: "Culinary Artist",
      rating: 4.9
    },
    {
      image: "/api/placeholder/120/120",
      name: "Emily Davis",
      title: "Cake Designer",
      rating: 4.7
    }
  ];

  const testimonials = [
    {
      image: "/api/placeholder/60/60",
      name: "Michelle Johnson",
      role: "UI/UX Designer",
      rating: 5,
      text: "Great quality videos and explanations! The instructors are very knowledgeable and patient."
    },
    {
      image: "/api/placeholder/60/60",
      name: "David Martinez",
      role: "Pastry Chef",
      rating: 5,
      text: "This platform has helped me improve my baking skills tremendously. Highly recommended!"
    },
    {
      image: "/api/placeholder/60/60",
      name: "Sarah Williams",
      role: "Home Baker",
      rating: 5,
      text: "Amazing courses with step-by-step instructions. Perfect for beginners like me."
    }
  ];

  const blogPosts = [
    {
      image: "/api/placeholder/250/180",
      category: "Tips & Tricks",
      title: "10 easy hacks to up the best baking recipes",
      date: "Dec 09, 2023"
    },
    {
      image: "/api/placeholder/250/180",
      category: "Techniques",
      title: "10 easy hacks to up the best baking recipes",
      date: "Dec 08, 2023"
    },
    {
      image: "/api/placeholder/250/180",
      category: "Recipes",
      title: "10 easy hacks to up the best baking recipes",
      date: "Dec 07, 2023"
    }
  ];

  // Enrollment counts: { [course_id]: count }
  const [enrollmentCounts, setEnrollmentCounts] = useState<{ [key: string]: number }>({});


  useEffect(() => {
    // const timer = setInterval(() => {
    //   setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    // }, 5000);
    // return () => clearInterval(timer);

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
  // const filteredCourses = courses
  // .filter((course) => {
  //   // Search filter
  //   if (searchQuery.trim() !== "") {
  //     const q = searchQuery.toLowerCase();
  //     if (
  //       !course.title.toLowerCase().includes(q) &&
  //       !course.description.toLowerCase().includes(q)
  //     ) {
  //       return false;
  //     }
  //   }
  //   // Level filter
  //   if (levelFilter !== "Latest" && levelFilter !== "All") {
  //     if (course.level.toLowerCase() !== levelFilter.toLowerCase()) {
  //       return false;
  //     }
  //   }
  //   // Duration filter
  //   if (durationFilter !== "All") {
  //     if (durationFilter === "Short" && course.hours >= 5) return false;
  //     if (durationFilter === "Medium" && (course.hours < 5 || course.hours > 10)) return false;
  //     if (durationFilter === "Long" && course.hours <= 10) return false;
  //   }
  //   return true;
  // })
  // .sort((a, b) => {
  //   if (levelFilter === "Latest") {
  //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //   }
  //   return 0;
  // });

  // if (loading) {
  //   return (
  //     <div className="container mx-auto py-16 px-4">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {[...Array(3)].map((_, i) => (
  //             <Card key={i} className="animate-pulse">
  //               <div className="aspect-video bg-muted"></div>
  //               <CardHeader>
  //                 <div className="h-6 bg-muted rounded w-3/4"></div>
  //                 <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="h-24 bg-muted rounded"></div>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="container mx-auto py-16 px-4">
  //       <div className="max-w-2xl mx-auto text-center">
  //         <h2 className="text-2xl font-semibold mb-4">Error Loading Courses</h2>
  //         <p className="text-muted-foreground mb-8">{error}</p>
  //         <Button onClick={() => window.location.reload()}>Try Again</Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-white min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/LandingImage.jpeg"
            alt="Kitchen background"
            width={1000}
            height={700}
            className="w-[100vw] h-full object-cover blur-sm "
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="max-w-lg">
              <div className="text-sm text-white/60 uppercase tracking-wider mb-4">LEARN FROM US</div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Better Learning
                <br />
                Better Living
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Turn your passion for baking into a career. Welcome to Mamikim Academy your gateway to a sweet life. Start your baking journey with us and learn the skills to earn a living doing what you love. Let&apos;s get baking
              </p>

              <a href="/courses" target="_blank">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center">
                  Enroll Course
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </a>


              {/* Decorative circle element */}
              {/* <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-full border-4 border-orange-500 opacity-20 hidden lg:block"></div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom feature cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-20">
          {heroContent.map((content, index) => (
            <div key={index} className={`${content.dark ? 'bg-gray-900' : 'bg-white'} p-6 rounded-2xl shadow-lg`}>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                {content.icon}
              </div>
              <h3 className={`${content.dark ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-2`}>{content.title}</h3>
              <p className={`${content.dark ? 'text-white' : 'text-gray-500'} text-sm font-semibold mb-2`}>{content.description}</p>
              <div className="mt-4">
                <a href='/courses' target='_blank'>
                  <button className="text-orange-500 hover:text-orange-600 transition-colors flex items-center">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </a>
              </div>
            </div>

          ))}

        </div>
      </div>

      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
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
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      {course.image_url ? (
                        <Image
                          src={course.image_url}
                          alt={course.title}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                            <span className="text-orange-600 text-2xl">📚</span>
                          </div>
                          <p className="text-orange-600 text-sm">{course.level}</p>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                      <div className="flex text-orange-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">
                        ({enrollmentCounts[course.id] || 0})
                      </span>
                    </div>

                    {/* Lesson Count */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                      <BookOpen className="h-3 w-3 text-white" />
                      <span className="ml-1 text-xs text-white">{Math.ceil(course.hours / 2)} Lessons</span>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                      <Calendar className="h-3 w-3 text-white" />
                      <span className="ml-1 text-xs text-white">{course.hours}h</span>
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
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{course.title}</h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm mb-4">
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </p>

                    {/* Action and Price */}
                    <div className="flex items-center justify-between">
                      <button onClick={() => window.location.href = `/courses/${course.id}`} className="flex items-center text-gray-800 hover:text-orange-500 transition-colors">
                        <span className="text-sm font-medium">Enroll now</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </button>
                      <span className="text-orange-500 font-semibold">
                        {course.price === 0 ? "Free" : `TZS ${course.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 - Successfully Projects */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">300+</div>
              <div className="text-gray-600">Successfully Courses</div>
            </div>

            {/* Card 2 - Happy Students */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col space-y-1">
                    <div className="w-3 h-0.5 bg-orange-500"></div>
                    <div className="w-3 h-0.5 bg-orange-500"></div>
                    <div className="w-3 h-0.5 bg-orange-500"></div>
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">6000+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>

            {/* Card 3 - Certificates Given */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Certificates Given</div>
            </div>

            {/* Card 4 - Coffee taken */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="flex flex-col space-y-1">
                    <div className="w-2 h-1 bg-orange-500 rounded-full"></div>
                    <div className="w-2 h-1 bg-orange-500 rounded-full"></div>
                    <div className="w-2 h-1 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">560+</div>
              <div className="text-gray-600">Coffee taken</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
          <div className="mb-12">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">What&apos;s news</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              Upcoming events
            </h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-600 text-2xl">🎤</span>
                    </div>
                    <p className="text-gray-600 text-sm">Conference Event</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                  27 Set
                </div>
              </div>
              <div className="p-6">
                <div className="text-orange-500 text-sm font-semibold mb-2">Speaker: Simon Mtabazi</div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Build your dream bakery career-2022</h3>
                  <span className="text-gray-500 text-sm">8:00 - 16:00</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <div className="flex items-center justify-between">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Book now
                  </button>
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <span>Available (139)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Expert Advisors */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">Best teacher</span>
            </div>
            <div className="flex items-start justify-between">
              <h2 className="text-4xl font-bold text-gray-800">
                Our Expert Consult Advisor
              </h2>
              <p className="text-gray-600 max-w-md ml-8">
                Consequatur mauris ipsa aliquam! Commodo purus corporis nostrud. Turpis dapibus magnam reprehenderit eget, excepturi, odit Fermentum?
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-3xl">👩‍🏫</span>
                  </div>
                  <p className="text-orange-600 text-sm">Expert Teacher</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-800 mb-1">CARDU MANYON</h3>
                <p className="text-gray-600 text-sm">Teacher of Mamikim Academy</p>
              </div>
            </div>


 
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-3xl">👨‍🍳</span>
                  </div>
                  <p className="text-orange-600 text-sm">Young Chef</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-800 mb-1">RUBY WATSON</h3>
                <p className="text-gray-600 text-sm">Teacher of Mamikim Academy</p>
              </div>
            </div>
          </div>

      
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 bg-gray-50 relative">
      
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
       
          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">Our students</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              What students says
            </h2>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
           
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">&quot;</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">👨‍🔬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">WILLIAM TROSYON</h3>
                <p className="text-gray-600 text-sm mb-4">- Manager of all things tasty</p>
                <p className="text-gray-600 text-sm mb-4">
                  Sociis aenean Quaerat nobis! Phasellus elit perferendis occaecato Blandit excepturi, fames diam molestias pellentesque sequi.
                </p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>

          
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">&quot;</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">👩‍🌾</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">YOAN MORGAN</h3>
                <p className="text-gray-600 text-sm mb-4">- Manager of all things tasty</p>
                <p className="text-gray-600 text-sm mb-4">
                  Sociis aenean Quaerat nobis! Phasellus elit perferendis occaecato Blandit excepturi, fames diam molestias pellentesque sequi.
                </p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>

  
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">&quot;</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">👨‍💼</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">ESMA WATSON</h3>
                <p className="text-gray-600 text-sm mb-4">- Manager of all things tasty</p>
                <p className="text-gray-600 text-sm mb-4">
                  Sociis aenean Quaerat nobis! Phasellus elit perferendis occaecato Blandit excepturi, fames diam molestias pellentesque sequi.
                </p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

  
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
          </div>
        </div>
      </section> */}

      {/* Blog Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">What&apos;s update now</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              Get update from our blog
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-2xl">🥖</span>
                  </div>
                  <p className="text-orange-600 text-sm">Dough Making</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">Category: Education, Certificate</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">From boadrooms to the best bakery in Dar: The story</h3>
              </div>
            </div>

          </div>

      
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section> */}

      {/* Company Logos Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-12">

            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span className="font-medium">audiojungle</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Head Office */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Head office</h3>
                  <p className="text-gray-600 text-sm">4 Mbaraka Mwinshee ,Mbezi Beach, DSM</p>
                </div>
              </div>
            </div>

            {/* Call Us Direct */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <div className="relative">
                    <FaPhoneAlt className="h-6 w-6 text-orange-500" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Call Us Direct</h3>
                  <p className="text-gray-600 text-sm">+255 757 798 155</p>
                </div>
              </div>
            </div>

            {/* Mail Address */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <div className="w-6 h-6 border-2 border-gray-600 rounded flex items-center justify-center">
                    <div className="w-3 h-2 bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Mail Address</h3>
                  <p className="text-gray-600 text-sm">info@mamikim.africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





    </div>
  );
};

export default HomePage;