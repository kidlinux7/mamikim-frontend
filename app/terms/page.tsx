"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Star, Calendar, Users, BookOpen, Award, ArrowRight, Menu, X } from 'lucide-react';
import { FaMapMarker, FaPhoneAlt, FaTwitter, FaUserAlt } from "react-icons/fa";
import { BsInstagram } from 'react-icons/bs';
import { FaCartShopping, FaPeopleGroup, FaSquareFacebook } from 'react-icons/fa6';
import { SiYoutube } from 'react-icons/si';
import { IoLogIn, IoSearch } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';


const Terms = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
        

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-100 via-orange-50 to-orange-200 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                            Terms and Conditions
                        </h1>
                        <div className="text-sm text-gray-600 uppercase tracking-wider">
                            HOME / TERMS & CONDITIONS
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <p className="text-gray-600 mb-6">
                                <strong>Last updated:</strong> December 2023
                            </p>
                            <p className="text-gray-600 mb-6">
                                Welcome to Mamikim Academy. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Section 1 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 mb-4">
                                    By accessing and using Mamikim Academy's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use License</h2>
                                <p className="text-gray-600 mb-4">
                                    Permission is granted to temporarily download one copy of the materials (information or software) on Mamikim Academy's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display</li>
                                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Course Enrollment and Payment</h2>
                                <p className="text-gray-600 mb-4">
                                    When you enroll in our courses, you agree to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Provide accurate and complete information during registration</li>
                                    <li>Pay all fees associated with your selected courses</li>
                                    <li>Complete the course within the specified timeframe</li>
                                    <li>Not share your account credentials with others</li>
                                    <li>Respect intellectual property rights of course content</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Privacy Policy</h2>
                                <p className="text-gray-600 mb-4">
                                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Refund Policy</h2>
                                <p className="text-gray-600 mb-4">
                                    We offer a 30-day money-back guarantee for all our courses. If you are not satisfied with your purchase, you may request a refund within 30 days of your enrollment date. Refunds will be processed within 5-7 business days.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Intellectual Property</h2>
                                <p className="text-gray-600 mb-4">
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of Mamikim Academy and its licensors. The Service is protected by copyright, trademark, and other laws.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. User Conduct</h2>
                                <p className="text-gray-600 mb-4">
                                    You agree not to use the Service to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Infringe upon the rights of others</li>
                                    <li>Transmit harmful, offensive, or inappropriate content</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with the proper functioning of the Service</li>
                                </ul>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Termination</h2>
                                <p className="text-gray-600 mb-4">
                                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
                                <p className="text-gray-600 mb-4">
                                    In no event shall Mamikim Academy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
                                <p className="text-gray-600 mb-4">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                                </p>
                            </div>

                            {/* Section 11 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Information</h2>
                                <p className="text-gray-600 mb-4">
                                    If you have any questions about these Terms and Conditions, please contact us at:
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600">
                                        <strong>Email:</strong> info@mamikim.com<br />
                                        <strong>Phone:</strong> +255 787 249 681<br />
                                        <strong>Address:</strong> Masaki, Dar Es Salaam, Tanzania
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

      
        </div>
    );
};

export default Terms;
