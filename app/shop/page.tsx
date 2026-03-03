"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Calculator as Youtube, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiYoutube } from 'react-icons/si';

const ComingSoonPage = () => {
    const [email, setEmail] = useState('');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Set the target date (e.g., 30 days from now)
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribed with:', email);
        alert('Thank you for subscribing! We will notify you when we launch.');
        setEmail('');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/shop-coming-soon.png"
                    alt="Baking equipment background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl px-4 py-8 md:py-16 text-center text-white">
                <div className="mb-8 flex justify-center">
                    <div className="bg-orange-500 p-4 rounded-2xl shadow-2xl flex items-center justify-center animate-bounce">
                        <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full animate-pulse uppercase">
                        Something delicious is brewing
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Mamikim Shop <br />
                        <span className="text-orange-500">Coming Soon</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        We&apos;re putting the finishing touches on our new online store. Get ready for premium baking ingredients, professional tools, and exclusive supplies delivered to your door.
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Minutes', value: timeLeft.minutes },
                        { label: 'Seconds', value: timeLeft.seconds }
                    ].map((item, index) => (
                        <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl overflow-hidden group hover:bg-white/20 transition-all duration-300">
                            <CardContent className="p-4 md:p-6 text-center">
                                <span className="block text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                                    {item.value.toString().padStart(2, '0')}
                                </span>
                                <span className="text-xs md:text-sm text-orange-400 font-medium uppercase tracking-widest leading-none">
                                    {item.label}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Newsletter Form */}
                {/* <div className="max-w-md mx-auto mb-12">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 p-1.5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                        <div className="flex-grow flex items-center px-4">
                            <Mail className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email for early access"
                                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full py-3 h-full focus:ring-0"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-8 py-6 h-auto font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-2 group"
                        >
                            Notify Me
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                    <p className="mt-4 text-xs text-gray-400 italic">Join 500+ bakers waiting for the launch!</p>
                </div> */}

                {/* Social Media & Home Link */}
                {/* <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-6">
                        <a href="#" className="p-3 bg-white/5 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110 group">
                            <Instagram className="w-6 h-6 text-white group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110 group">
                            <Facebook className="w-6 h-6 text-white group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110 group">
                            <SiYoutube className="w-6 h-6 text-white group-hover:text-white" />
                        </a>
                    </div>

                    <a href="/" className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors border-b border-transparent hover:border-white pb-1">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Back to Academy
                    </a>
                </div> */}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
    );
};

export default ComingSoonPage;
