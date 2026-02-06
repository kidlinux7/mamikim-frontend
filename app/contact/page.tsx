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

const Contactus = () => {
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

       <section className="relative bg-white min-h-[100vh]">
               <div className="absolute inset-0">
                 <Image
                   src="/images/contactus.jpeg"
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
                     <div className="text-sm text-white/60 uppercase tracking-wider mb-4">REACH OUT TO US</div>
                     <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                       Contact Us
                       <br />
                     
                     </h1>
                     <p className="text-lg text-white/80 leading-relaxed mb-8">
                       At Mamikim Academy, we bring world-class baking techniques to the Tanzanian kitchen. Our founder is a Chemical Engineer specialized  in Food Science, offering a unique scientific approach to the culinary arts.
                     </p>

       
       
                     {/* Decorative circle element */}
                     {/* <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-full border-4 border-orange-500 opacity-20 hidden lg:block"></div> */}
                   </div>
                 </div>
               </div>
             </section>

            {/* Main Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Information and Resources */}
                        <div>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Before reaching out to our team, you may want to review these helpful resources in case your question has already been answered.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <span className="text-orange-500 mr-3 mt-1">•</span>
                                    <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                                        Check out our <span className="text-orange-500 font-medium">FAQ</span>
                                    </a>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                If you still need help, we&apos;d love to hear from you. Feel free to reach out.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <span className="font-bold text-gray-800">Email us</span>
                                    <div className="text-orange-500 font-medium">info@mamikim.com</div>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-800">Call us</span>
                                    <div className="text-orange-500 font-medium">+255 787 249 681</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <div>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Contactus;