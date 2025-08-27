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

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Free Register & Intership",
      description: "Esse mauris arcu eveniet in. Qua hendrerit. Risus! Deleniti",
      link: "#",
      dark: false
    },
    {
      icon: <FaPeopleGroup className="text-orange-500" />,
      title: "Free Online Learning offer",
      description: "Esse mauris arcu eveniet in. Qua hendrerit. Risus! Deleniti",
      link: "#",
      dark: true
    },
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Dream and get that Dough",
      description: "Esse mauris arcu eveniet in. Qua hendrerit. Risus! Deleniti",
      link: "#",
      dark: false
    }, 
    {
      icon: <FaMapMarker className="text-orange-500" />,
      title: "Get certificates",
      description: "Esse mauris arcu eveniet in. Qua hendrerit. Risus! Deleniti",
      link: "#",
      dark: false
    },
  ];

  const courses = [
    {
      image: "/api/placeholder/300/200",
      title: "Baking a simple cake",
      instructor: "Jennifer Wilson",
      rating: 4.8,
      students: 2341,
      price: "$29.00"
    },
    {
      image: "/api/placeholder/300/200",
      title: "Making a simple cake",
      instructor: "David Miller",
      rating: 4.9,
      students: 1892,
      price: "$34.00"
    },
    {
      image: "/api/placeholder/300/200",
      title: "Baking a simple cake",
      instructor: "Sarah Johnson",
      rating: 4.7,
      students: 3156,
      price: "$39.00"
    }
  ];

  const stats = [
    { number: "560+", label: "Expert Tutors" },
    { number: "580+", label: "Happy Students" },
    { number: "540+", label: "Live Classes" },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
 

      {/* Hero Section */}
      <section className="relative bg-white min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/login.jpg"
            alt="Kitchen background"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-100"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="max-w-lg">
              <div className="text-sm text-white-600 uppercase tracking-wider mb-4">LEARN FROM US</div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Better Learning
                <br />
                Better Living
              </h1>
              <p className="text-lg text-white-700 leading-relaxed mb-8">
                Why we are best learning platform in the world? Teaching is done by experienced teachers. Good is taught at a low cost.
              </p>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center">
                Enroll Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              {/* Decorative circle element */}
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-full border-4 border-orange-500 opacity-20 hidden lg:block"></div>
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
              <h3 className={`${content.dark ? 'text-white':'text-gray-800'} text-lg font-semibold mb-2`}>{content.title}</h3>
              <p className={`${content.dark ? 'text-white':'text-gray-500'} text-sm font-semibold mb-2`}>{content.description}</p>
              <div className="mt-4">
                <button className="text-orange-500 hover:text-orange-600 transition-colors flex items-center">
                  Get Started
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
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
            
            {/* Category Navigation */}
            <div className="flex space-x-8">
              <button className="text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">Baking</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Business Management</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Digital Marketing</button>
            </div>
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Card 1 - Successfully Projects */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">560+</div>
              <div className="text-gray-600">Successfully Projects</div>
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
              <div className="text-4xl font-bold text-gray-900 mb-2">560+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>

            {/* Card 3 - Certificates Given */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">560+</div>
              <div className="text-gray-600">Certificates Given</div>
            </div>

            {/* Card 4 - Coffee taken */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
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
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">What's news</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              Upcoming events
            </h2>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Card 1 */}
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

            {/* Event Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-orange-600 text-2xl">🥖</span>
                    </div>
                    <p className="text-orange-600 text-sm">Baking Workshop</p>
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
      </section>

      {/* Expert Advisors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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

          {/* Teacher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Card 1 - CARDU MANYON */}
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

            {/* Card 2 - ANAMIKA ISLAM */}
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
                <h3 className="text-lg font-bold text-gray-800 mb-1">ANAMIKA ISLAM</h3>
                <p className="text-gray-600 text-sm">Teacher of Mamikim Academy</p>
              </div>
            </div>

            {/* Card 3 - KAZI JIHAD (Highlighted) */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-3xl">👩‍🏫</span>
                  </div>
                  <p className="text-orange-600 text-sm">Expert Teacher</p>
                </div>
                {/* Social Media Icons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-1">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">f</span>
                  </div>
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">t</span>
                  </div>
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⚙</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-orange-500">
                <h3 className="text-lg font-bold text-white mb-1">KAZI JIHAD</h3>
                <p className="text-orange-100 text-sm">Teacher of Mamikim Academy</p>
              </div>
            </div>

            {/* Card 4 - RUBY WATSON */}
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

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">Our students</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              What students says
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Card 1 - WILLIAM TROSYON */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">"</div>
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

            {/* Card 2 - YOAN MORGAN */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">"</div>
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

            {/* Card 3 - ESMA WATSON */}
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 left-4 text-orange-500 text-4xl">"</div>
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

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">What's update now</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              Get update from our blog
            </h2>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Blog Card 1 */}
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

            {/* Blog Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-2xl">👨‍🍳</span>
                  </div>
                  <p className="text-orange-600 text-sm">Baker</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">Category: Education, Certificate</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">From boadrooms to the best bakery in Dar: The story continues</h3>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-orange-600 text-2xl">🍪</span>
                  </div>
                  <p className="text-orange-600 text-sm">Cookie Decorating</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">Category: Education, Certificate</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">From boadrooms to the best bakery in Dar: Still on the story</h3>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <div className="w-8 h-2 bg-orange-500 rounded"></div>
            <div className="w-8 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-12">
            {/* audiojungle */}
            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span className="font-medium">audiojungle</span>
            </div>

            {/* slack */}
            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">#</span>
              </div>
              <span className="font-medium">slack</span>
            </div>

            {/* themeforest */}
            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">🌳</span>
              </div>
              <span className="font-medium">themeforest</span>
            </div>

            {/* envato */}
            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">🍃</span>
              </div>
              <span className="font-medium">envato</span>
            </div>

            {/* codecanyon */}
            <div className="flex items-center text-gray-600">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-medium">codecanyon</span>
            </div>
          </div>
        </div>
      </section>

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
                  <p className="text-gray-600 text-sm">454 read, 36 Floor New York, USA</p>
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
                  <p className="text-gray-600 text-sm">+189-256567865, +99636523112</p>
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
                  <p className="text-gray-600 text-sm">+189-256567865, +99636523112</p>
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