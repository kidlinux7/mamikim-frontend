"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Home, ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Head from "next/head";

// This is a client component, but we can still set title/meta via Metadata in Next 13 
// Or just include it in the component for simpler implementation if using app dir.
// However, app dir usually wants export const metadata in a layout or page.
// Since this is "use client", we'll just stick to a good h1 tag.

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");
    const reference = searchParams.get("transaction_id") || searchParams.get("reference");
    const courseId = searchParams.get("courseId");

    const isSuccess = status === "success" || status === "completed";

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-none shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden relative">
                {/* Decorative background element */}
                <div className={`absolute top-0 left-0 w-full h-2 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`} />

                <CardHeader className="text-center pt-10 pb-4">
                    <div className="flex justify-center mb-6">
                        {isSuccess ? (
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping opacity-75" />
                                <div className="relative rounded-full bg-green-500/10 p-4 ring-1 ring-green-500/20">
                                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="relative rounded-full bg-red-500/10 p-4 ring-1 ring-red-500/20">
                                    <XCircle className="h-16 w-16 text-red-500" />
                                </div>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                        {isSuccess ? "Congratulations!" : "Oops! Payment Failed"}
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium">
                        {isSuccess ? "Your journey starts here." : "Something didn't quite work out."}
                    </p>
                </CardHeader>

                <CardContent className="text-center space-y-8 pb-10">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {isSuccess
                                ? "Your payment was successful. We've sent a confirmation email your way. You now have full access to the course content."
                                : "The transaction was unsuccessful. This could be due to insufficient funds, an expired card, or a temporary network issue."}
                        </p>
                        {reference && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Transaction Reference</span>
                                <span className="text-sm font-mono text-slate-700 bg-white px-3 py-1 rounded border border-slate-200 inline-block">
                                    {reference}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        {isSuccess ? (
                            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                <Link href={courseId ? `/courses/${courseId}` : "/dashboard"}>
                                    Explore Your Course <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        ) : (
                            <Button asChild size="lg" variant="default" className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                <Link href={courseId ? `/courses/${courseId}` : "/courses"}>
                                    <RefreshCcw className="mr-2 h-5 w-5" /> Try Again
                                </Link>
                            </Button>
                        )}

                        <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-12 rounded-xl">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" /> Go back home
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500/20 border-t-orange-500"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Verifying payment status...</p>
                </div>
            </div>
        }>
            <PaymentStatusContent />
        </Suspense>
    );
}
