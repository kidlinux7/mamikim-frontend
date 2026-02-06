"use client";

import { BookOpen, Users, Award, CheckCircle, ArrowRight, Star, Calendar } from "lucide-react";
import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative bg-white min-h-[100vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/aboutus2.jpeg"
            alt="Kitchen background"
            width={1000}
            height={700}
            className="w-[100vw] h-[100vh] object-cover blur-sm "
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="max-w-lg">
              <div className="text-sm text-white/60 uppercase tracking-wider mb-4">LEARN FROM US</div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Global Expertise
                <br />
                Local Impact
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                At Mamikim Academy, we bring world-class baking techniques to the Tanzanian kitchen. Our founder is a Chemical Engineer specialized  in Food Science, offering a unique scientific approach to the culinary arts.
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

      {/* Call-to-Action Banner */}
      {/* <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
          
              <div className="flex items-center mb-6 lg:mb-0">
                <div className="w-1 h-12 bg-orange-500 mr-6"></div>
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
               
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

              
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center">
                Enroll Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section> */}

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
                To ensure our students receive the highest standard of education, she has continuously expanded her expertise by training under international experts from Russia, Turkey, and Nigeria. This blend of global innovation and her lifelong experience in her family&apos;s bakery makes Mamikim Academy a leader in modern baking education.
                Empowering a Generation of Entrepreneurs.
              </p>
            </div>

            {/* Right Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission began with a simple observation during the COVID-19 lockdown: many women, especially those raising families or facing unemployment, were searching for a way to secure their financial future. Our founder transformed her passion into a platform for economic change, focusing on providing young women with marketable skills and a path to financial independence.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
                {/* <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Our Progress</span> */}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Our Journey
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To date, Mamikim Academy has successfully trained over 6,000 young women, the majority of whom have gone on to launch their own thriving businesses in the baking industry. By fostering self-reliance, we are helping women across the country reduce economic dependence and build sustainable careers.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/progress.jpeg"
                  alt="Scientific Baking Process"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-orange-500 opacity-20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

      </section>



      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/aboutus2.jpeg"
                  alt="Scientific Baking Process"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-orange-500 opacity-20 rounded-2xl -z-10"></div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Our Integrated Baking Hub</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                We support the success of our students and clients through three main pillars:
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Professional Training",
                    desc: "Specialized online and physical programs in baking, advanced cake decoration, and commercial snack production."
                  },
                  {
                    title: "Baking Supplies & Tools",
                    desc: "We sell the same high-quality ingredients and professional tools used in our training, ensuring our students have access to the best resources to grow their businesses."
                  },
                  {
                    title: "Exquisite Custom Cakes",
                    desc: "Our bakery continues to provide custom-designed cakes for weddings, birthdays, and special events, crafted with scientific precision and artistic flair."
                  }
                ].map((pillar, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">{pillar.title}:</strong> {pillar.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
                {/* <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Our Progress</span> */}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To empower women through world-class culinary training and entrepreneurship, proving that with the right skills and a global perspective, anyone can transform their passion into a powerful business.<br></br><br></br>
                <b>Join the 6,000+ women who have changed their lives with us.</b><br></br>
                Register for a Class | Shop Baking Tools | Order a Cake
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/certificate.jpeg"
                  alt="Scientific Baking Process"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-orange-500 opacity-20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

      </section>




      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="text-sm text-gray-500">Find Perfect one</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Choose your perfect one and Enroll
            </h2>

    
            <div className="flex space-x-8">
              <button className="text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">Baking</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Business Management</button>
              <button className="text-gray-500 hover:text-orange-500 transition-colors">Digital Marketing</button>
            </div>
          </div>


       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
       
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

           
                <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">(12k)</span>
                </div>

              
                <div className="absolute bottom-4 left-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <BookOpen className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">6 Lessons</span>
                </div>

              
                <div className="absolute bottom-4 right-4 flex items-center bg-orange-500 bg-opacity-90 rounded-full px-2 py-1">
                  <Calendar className="h-3 w-3 text-white" />
                  <span className="ml-1 text-xs text-white">3:56:59</span>
                </div>
              </div>

              <div className="p-6">
               
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-orange-600 text-xs">👤</span>
                  </div>
                  <span className="text-orange-500 text-sm">Course Instructor</span>
                </div>

             
                <h3 className="text-lg font-bold text-gray-800 mb-3">Baking a simple cake</h3>

             
                <p className="text-gray-500 text-sm mb-4">
                  Conubia egestas eos laboris netus velit mi aliquid aute euismod, integer? Quo class taciti labore
                </p>

               
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

      


      {/* Statistics Section */}
      <section className="py-20 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 - All Students */}
            <div className="bg-white rounded-full  p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">6000+</div>
              <div className="text-gray-600">All Students</div>
            </div>

            {/* Card 2 - Courses Available */}
            <div className="bg-white rounded-full p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">300+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>


            {/* Card 4 - Happy Clients */}
            <div className="bg-white rounded-full p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">☕</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">6000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-12">
       
            <div className="flex items-center text-black">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span className="font-medium">audiojungle</span>
            </div>

      
          </div>
        </div>
      </section> */}

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

          </div>
        </div>
      </section>





    </div>
  );
};

export default Aboutus;