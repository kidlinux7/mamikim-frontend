import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Clock, Users, BookOpen, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function PrivateClassesPage() {
    const handleCall = () => {
        window.location.href = "tel:+255712345678";
    };
    const pricingTiers = [
        {
            name: "Serengeti",
            price: 15,
            duration: "1 Hour",
            description: "Perfect for beginners or focused skill building",
            features: [
                "1-on-1 personalized instruction",
                "Online or in-person",
                "Customized lesson plan",
                "Progress tracking",
                "Email support",
                "Basic learning materials"
            ],
            popular: false,
            color: "bg-white-50 border-blue-200"
        },
        {
            name: "Ngorongoro",
            price: 150,
            duration: "10 Hours",
            description: "Ideal for serious learners seeking comprehensive training",
            features: [
                "$15 per hour per person",
                "3-6 students",
                "Advanced curriculum design",
                "Homework assignments",
                "Progress assessments",
                "Premium learning materials",
                "Priority email support",
                "Session recordings available"
            ],
            popular: true,
            color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300"
        },
        {
            name: "Kilimanjaro",
            price: 600,
            duration: "10 Hours",
            description: "Ultimate experience for rapid skill advancement",
            features: [
                "$6 per hour per person",
                "7-15 students",
                "Comprehensive skill assessment",
                "Personalized action plan",
                "Industry insights & networking tips",
                "Premium materials & resources",
                "24/7 support for 30 days",
                "Session recordings & notes",
                "Follow-up consultation included",
                "Certificate of completion"
            ],
            popular: false,
            color: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
        }
    ];

    const benefits = [
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "Personalized Attention",
            description: "Get undivided attention from expert instructors tailored to your learning style and pace."
        },
        {
            icon: <Clock className="w-6 h-6 text-green-600" />,
            title: "Flexible Scheduling",
            description: "Book sessions that fit your schedule, with options for weekends and evenings."
        },
        {
            icon: <BookOpen className="w-6 h-6 text-purple-600" />,
            title: "Custom Curriculum",
            description: "Lessons designed specifically for your goals, skill level, and interests."
        },
        {
            icon: <Award className="w-6 h-6 text-orange-600" />,
            title: "Expert Instructors",
            description: "Learn from certified professionals with years of industry experience."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Marketing Professional",
            content: "The Professional package transformed my skills in just a few sessions. The personalized approach made all the difference!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Entrepreneur",
            content: "Invested in the Mastery package and it was worth every penny. The comprehensive training accelerated my learning by months.",
            rating: 5
        },
        {
            name: "Emma Rodriguez",
            role: "Student",
            content: "Started with the Essential package as a beginner. The instructor's patience and expertise helped me build confidence quickly.",
            rating: 5
        }
    ];

    const faqs = [
        {
            question: "How do I schedule my private class?",
            answer: "After purchasing, you'll receive a scheduling link to book your preferred time slot. We offer flexible scheduling including weekends."
        },
        {
            question: "What if I need to reschedule?",
            answer: "You can reschedule up to 24 hours before your session without any additional fees."
        },
        {
            question: "Are the sessions conducted online or in-person?",
            answer: "We offer both options! Choose what works best for you during the booking process."
        },
        {
            question: "What materials do I need to bring?",
            answer: "All necessary materials are provided. You'll receive a preparation checklist after booking."
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Pricing Cards */}
                <div id="pricing" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
                    {pricingTiers.map((tier, index) => (
                        <Card key={index} className={`relative ${tier.color} transition-all duration-300 hover:shadow-xl hover:scale-105 mx-auto w-full max-w-sm md:max-w-none h-full`}>
                            {tier.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs sm:text-sm">
                                    Most Popular
                                </Badge>
                            )}
                            <CardHeader className="text-center pb-4 px-4 sm:px-6">
                                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{tier.name}</CardTitle>
                                <CardDescription className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">{tier.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">${tier.price}</span>
                                    <span className="text-sm sm:text-base text-gray-600 ml-2">/ {tier.duration}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 sm:px-6 flex-grow">
                                <ul className="space-y-3 mb-6">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button

                                    className={`w-full mt-auto ${tier.popular
                                        ? 'bg-primary hover:from-purple-700 hover:to-blue-700'
                                        : 'bg-gray-900 hover:bg-gray-800'
                                        } text-white font-semibold py-3 text-sm sm:text-base`}
                                >

                                    <a
                                        href={`mailto:info@kiswahilisimplified.africa?subject=${encodeURIComponent(
                                            tier.name + " Private Classes"
                                        )}&body=${encodeURIComponent("Hi there,")}`}
                                    >
                                        Get Started
                                    </a>


                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Benefits Section */}
                <div id="benefits" className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        Why Choose Private Classes?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="text-center bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6">
                                    <div className="mb-4 flex justify-center">{benefit.icon}</div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Learning Process */}
                <div className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <div className="text-center px-4">
                            <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Choose Your Package</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Select the pricing tier that best fits your goals and schedule.</p>
                        </div>
                        <div className="text-center px-4">
                            <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-purple-600">2</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Schedule Your Session</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Book your preferred time slot and prepare for your personalized experience.</p>
                        </div>
                        <div className="text-center px-4">
                            <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-green-600">3</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Start Learning</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Begin your transformative learning journey with expert guidance.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div id="testimonials" className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        What Our Students Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-white/70 backdrop-blur-sm">
                                <CardContent className="pt-6 px-4 sm:px-6">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 mb-4 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>
                                    <div>
                                        <p className="text-sm sm:text-base font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto px-4">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="mb-4 bg-white/70 backdrop-blur-sm">
                                <CardContent className="pt-6 px-4 sm:px-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-tight">{faq.question}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <Card id="contact" className="bg-primary text-white mx-4 sm:mx-0">
                    <CardContent className="py-8 sm:py-12 text-center px-4 sm:px-6">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                            Have questions or need help choosing the right package? We&apos;re here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8 text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <a href="tel:+255-743-300-006">+255 743 300 006</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="break-all sm:break-normal">info@kiswahilisimplified.africa</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span>48 Msikitini Street Mikocheni B, Dar es Salaam, Tanzania</span>
                            </div>
                        </div>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 text-sm sm:text-base">
                            <a href="tel:+255-743-300-006">Contact Us Today</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}