import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Clock, Users, BookOpen, Award, Phone, Mail, MapPin, FileText, Zap } from 'lucide-react';

export default function TranslationServicesPage() {
    const pricingTiers = [
        {
            name: "Standard Translation",
            price: 50,
            duration: "per 1000 words",
            description: "Accurate translation of general documents and articles.",
            features: [
                "Professional document translation",
                "Native-level fluency",
                "Formatting preserved",
                "Email support"
            ],
            popular: false,
            color: "bg-white-50 border-blue-200"
        },
        {
            name: "Professional Translation",
            price: 100,
            duration: "per 1000 words",
            description: "For books, research papers, and high-precision needs.",
            features: [
                "Expert linguists for technical texts",
                "Editing & proofreading included",
                "Priority handling",
                "Quality assurance check",
                "Email & phone support"
            ],
            popular: true,
            color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300"
        },
        {
            name: "Urgent Translation",
            price: 200,
            duration: "per 1000 words",
            description: "Fast-track delivery for time-sensitive projects.",
            features: [
                "24–48 hour turnaround",
                "Proofreading included",
                "Dedicated project manager",
                "Available for urgent documents",
                "Quality guaranteed"
            ],
            popular: false,
            color: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
        }
    ];

    const benefits = [
        {
            icon: <FileText className="w-6 h-6 text-blue-600" />,
            title: "Accurate & Reliable",
            description: "Our translators ensure 100% accuracy with cultural and linguistic precision."
        },
        {
            icon: <Clock className="w-6 h-6 text-green-600" />,
            title: "Fast Turnaround",
            description: "Need it quick? We offer urgent translation services without compromising quality."
        },
        {
            icon: <BookOpen className="w-6 h-6 text-purple-600" />,
            title: "Wide Range",
            description: "From books to articles, legal contracts to websites—we translate it all."
        },
        {
            icon: <Award className="w-6 h-6 text-orange-600" />,
            title: "Experienced Team",
            description: "Work with certified translators and proofreaders trusted globally."
        }
    ];

    const testimonials = [
        {
            name: "James Peterson",
            role: "Lawyer",
            content: "They translated my legal documents with remarkable precision. Fast, reliable, and professional!",
            rating: 5
        },
        {
            name: "Amina Hassan",
            role: "Author",
            content: "My book was translated flawlessly. They preserved tone, style, and cultural meaning perfectly.",
            rating: 5
        },
        {
            name: "Carlos Mendoza",
            role: "Business Owner",
            content: "Urgent translation service saved me during a critical deal. Delivered overnight with perfect quality!",
            rating: 5
        }
    ];

    const faqs = [
        {
            question: "What types of content do you translate?",
            answer: "We translate documents, books, articles, research papers, websites, and more. We also offer proofreading."
        },
        {
            question: "How fast can you deliver?",
            answer: "Standard translations take 2–3 business days. For urgent requests, we deliver within 24–48 hours."
        },
        {
            question: "Do you handle technical or legal texts?",
            answer: "Yes. Our expert linguists specialize in technical, legal, and academic translations."
        },
        {
            question: "How do I get started?",
            answer: "Simply contact us with your text, word count, and deadline. We'll provide a quote and timeline immediately."
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
                                            tier.name + "Services"
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
                        Why Choose Our Translation Services?
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

                {/* Process */}
                <div className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <div className="text-center px-4">
                            <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Send Us Your Text</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Share your documents, articles, or books with us securely.</p>
                        </div>
                        <div className="text-center px-4">
                            <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-purple-600">2</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">We Translate & Proofread</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Our experts translate with precision, then proofread for perfection.</p>
                        </div>
                        <div className="text-center px-4">
                            <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl sm:text-2xl font-bold text-green-600">3</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Receive Your Work</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Get polished translations delivered on time, ready to use.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div id="testimonials" className="mb-16 sm:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
                        What Our Clients Say
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
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Something Translated?</h2>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                            Reach out today for accurate, fast, and professional translations tailored to your needs.
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
                            <a href="tel:+255-743-300-006">Request Translation Now</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
