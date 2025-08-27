"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Star, Calendar, Users, BookOpen, Award, ArrowRight, Menu, X } from 'lucide-react';
import { FaMapMarker, FaPhoneAlt, FaTwitter, FaUserAlt } from "react-icons/fa";
import { BsInstagram } from 'react-icons/bs';
import { FaCartShopping, FaPeopleGroup, FaSquareFacebook } from 'react-icons/fa6';
import { SiYoutube } from 'react-icons/si';
import { IoLogIn, IoSearch } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';


const Privacy = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
         

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-100 via-orange-50 to-orange-200 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                            Privacy Policy
                        </h1>
                        <div className="text-sm text-gray-600 uppercase tracking-wider">
                            HOME / PRIVACY POLICY
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Content */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <p className="text-gray-600 mb-6">
                                <strong>Last updated:</strong> December 2023
                            </p>
                            <p className="text-gray-600 mb-6">
                                At Mamikim Academy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Section 1 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
                                <p className="text-gray-600 mb-4">
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Register for an account</li>
                                    <li>Enroll in our courses</li>
                                    <li>Subscribe to our newsletter</li>
                                    <li>Contact us for support</li>
                                    <li>Participate in surveys or promotions</li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    This information may include your name, email address, phone number, billing address, and payment information.
                                </p>
                                
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Automatically Collected Information</h3>
                                <p className="text-gray-600 mb-4">
                                    When you visit our website, we automatically collect certain information about your device, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>IP address and location data</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Pages visited and time spent</li>
                                    <li>Referring website</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                                <p className="text-gray-600 mb-4">
                                    We use the information we collect for various purposes, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Providing and maintaining our services</li>
                                    <li>Processing course enrollments and payments</li>
                                    <li>Communicating with you about your account and courses</li>
                                    <li>Sending newsletters and promotional materials (with your consent)</li>
                                    <li>Improving our website and services</li>
                                    <li>Analyzing usage patterns and trends</li>
                                    <li>Preventing fraud and ensuring security</li>
                                    <li>Complying with legal obligations</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Information Sharing and Disclosure</h2>
                                <p className="text-gray-600 mb-4">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
                                    <li><strong>Payment Processors:</strong> Your payment information is processed by secure third-party payment processors</li>
                                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                                    <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Data Security</h2>
                                <p className="text-gray-600 mb-4">
                                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>SSL encryption for data transmission</li>
                                    <li>Secure servers and databases</li>
                                    <li>Regular security assessments</li>
                                    <li>Access controls and authentication</li>
                                    <li>Employee training on data protection</li>
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cookies and Tracking Technologies</h2>
                                <p className="text-gray-600 mb-4">
                                    We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Remember your preferences and settings</li>
                                    <li>Analyze website traffic and usage</li>
                                    <li>Provide personalized content and advertisements</li>
                                    <li>Improve website functionality</li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Rights and Choices</h2>
                                <p className="text-gray-600 mb-4">
                                    You have certain rights regarding your personal information:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li><strong>Access:</strong> Request access to your personal information</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                    <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    To exercise these rights, please contact us using the information provided below.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Data Retention</h2>
                                <p className="text-gray-600 mb-4">
                                    We retain your personal information for as long as necessary to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                                    <li>Provide our services to you</li>
                                    <li>Comply with legal obligations</li>
                                    <li>Resolve disputes and enforce agreements</li>
                                    <li>Maintain security and prevent fraud</li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    When we no longer need your information, we will securely delete or anonymize it.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children&apos;s Privacy</h2>
                                <p className="text-gray-600 mb-4">
                                    Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. International Data Transfers</h2>
                                <p className="text-gray-600 mb-4">
                                    Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Privacy Policy</h2>
                                <p className="text-gray-600 mb-4">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date.
                                </p>
                            </div>

                            {/* Section 11 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
                                <p className="text-gray-600 mb-4">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600">
                                        <strong>Email:</strong> privacy@mamikim.com<br />
                                        <strong>Phone:</strong> +255 787 249 681<br />
                                        <strong>Address:</strong> Masaki, Dar Es Salaam, Tanzania<br />
                                        <strong>Data Protection Officer:</strong> dpo@mamikim.com
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

export default Privacy;
