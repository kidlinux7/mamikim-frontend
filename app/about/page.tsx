"use client";

import { BookOpen, Users, Award, CheckCircle, ArrowRight, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FaMapMarker } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";


const Aboutus = () => {
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
      icon: <FaMapMarker className="text-orange-500" />,
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

      {/* Hero Section - About Us */}
      <section className="relative bg-gradient-to-r from-orange-100 via-orange-50 to-orange-200 min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                About Us
              </h1>
              <div className="text-sm text-gray-600 uppercase tracking-wider mb-8">
                HOME / ABOUT US
              </div>
            </div>

            {/* Right Side - Macaron Image */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center mb-4">
                    <span className="text-orange-600 text-4xl">🍪</span>
                  </div>
                  <p className="text-orange-600 text-lg font-medium">Delicious Macaron</p>
                </div>

                {/* Decorative orange circle with stripes */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="flex flex-col space-y-1">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center mb-6 lg:mb-0">
                <div className="w-1 h-12 bg-orange-500 mr-6"></div>
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  {/* Decorative dots and line */}
                  <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="absolute top-2 left-8 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="absolute top-4 left-4 w-8 h-0.5 bg-blue-300 rounded-full transform rotate-12"></div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Get our most popular courses for free
                  </h2>
                </div>
              </div>

              {/* Right Side - Button */}
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center">
                Enroll Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome to Mamikim academy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Consequuntur atque bibendum sequi vivamus aliqua senectus hendrerit consectet tristique, consequatur laborum unde, aliquet laboris cillum sollicitudin pretium. Sociis aenean Quaerat nobis! Phasellus elit perferendis occaecato Blandit excepturi, fames diam molestias pellentesque sequi.
              </p>
            </div>

            {/* Right Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                We help you get better With that dough
              </h2>
              <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center mb-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Consequuntur atque bibendum sequi vivamus aliqua senectus hendrerit consectet tristique, consequatur laborum unde, aliquet laboris cillum sollicitudin pretium. Sociis aenean Quaerat nobis! Phasellus elit perferendis occaecato Blandit excepturi, fames diam molestias pellentesque sequi.
              </p>
            </div>
          </div>
        </div>
      </section>

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


      {/* Statistics Section */}
      <section className="py-20 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Card 1 - All Students */}
            <div className="bg-white rounded-full  p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">37895+</div>
              <div className="text-gray-600">All Students</div>
            </div>

            {/* Card 2 - Courses Available */}
            <div className="bg-white rounded-full p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">560+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>

            {/* Card 3 - Awards Wins */}
            <div className="bg-white rounded-full p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">560+</div>
              <div className="text-gray-600">Awards Wins</div>
            </div>

            {/* Card 4 - Happy Clients */}
            <div className="bg-white rounded-full p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">☕</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">560+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-12">
            {/* audiojungle */}
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span className="font-medium">audiojungle</span>
            </div>

            {/* slack */}
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">#</span>
              </div>
              <span className="font-medium">slack</span>
            </div>

            {/* themeforest */}
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-brown-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">🌳</span>
              </div>
              <span className="font-medium">themeforest</span>
            </div>

            {/* envato */}
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">●</span>
              </div>
              <span className="font-medium">envato</span>
            </div>

            {/* codecanyon */}
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">🐔</span>
              </div>
              <span className="font-medium">codecanyon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-orange-200 relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23f97316'/%3E%3Ccircle cx='200' cy='200' r='50' fill='%23fbbf24'/%3E%3Crect x='600' y='150' width='100' height='100' fill='%23a16207'/%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card - Become a learner */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Become a learner</h3>
              <p className="text-gray-600 mb-6">
                Are you knowledge base tell just some words we will came back within 5 minutes
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button className="bg-orange-500 text-white px-6 py-3 rounded-r-lg hover:bg-orange-600 transition-colors font-medium">
                  JOIN AS STUDENT
                </button>
              </div>
            </div>

            {/* Right Card - Become a teacher */}
            <div className="bg-orange-500 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Become a teacher</h3>
              <p className="text-orange-100 mb-6">
                Are you knowledge base tell just some words we will came back within 5 minutes
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-l-lg border-0 bg-orange-600 text-white placeholder-orange-200 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-orange-500 px-6 py-3 rounded-r-lg hover:bg-gray-100 transition-colors font-medium">
                  JOIN US
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>





    </div>
  );
};

export default Aboutus;