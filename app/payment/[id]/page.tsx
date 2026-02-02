"use client";

import { useSearchParams, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Home, ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState, useRef } from "react";
import Head from "next/head";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/components/UserProvider";
import { createClient } from "@supabase/supabase-js";

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const params = useParams();
    const status = searchParams.get("status");
    const reference = searchParams.get("transaction_id") || searchParams.get("reference") || params.id as string;
    const courseId = searchParams.get("courseId");

    const { user, loading: userLoading } = useUser();
    const supabaseClient = createClientComponentClient();
    const [processing, setProcessing] = useState(false);
    const [processError, setProcessError] = useState<string | null>(null);
    const enrollmentProcessed = useRef(false);

    const isSuccess = status === "success" || status === "completed" || status === "paid";

    useEffect(() => {
        async function handleEnrollment() {
            if (!isSuccess || !user || !courseId || !reference || enrollmentProcessed.current) return;

            setProcessing(true);
            enrollmentProcessed.current = true;

            try {
                const supabaseAdmin = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
                    {
                        auth: {
                            autoRefreshToken: false,
                            persistSession: false
                        }
                    }
                );

                // 1. Check if already enrolled
                const { data: existingEnrollment } = await supabaseAdmin
                    .from('enrollment')
                    .select('id')
                    .eq('course_id', courseId)
                    .eq('student_id', user.id)
                    .maybeSingle();

                if (existingEnrollment) {
                    console.log('User already enrolled');
                    setProcessing(false);
                    // If already enrolled, wait 2 seconds and redirect
                    setTimeout(() => {
                        window.location.href = `/courses/${courseId}`;
                    }, 2000);
                    return;
                }

                // 2. Fetch course price
                const { data: courseData } = await supabaseAdmin
                    .from('courses')
                    .select('price, title')
                    .eq('id', courseId)
                    .single();

                // 3. Create transaction record
                const { data: transaction, error: txError } = await supabaseAdmin
                    .from('transactions')
                    .insert({
                        course_id: courseId,
                        student_id: user.id,
                        price: courseData?.price || 0,
                        currency: 'TZS',
                        payment_status: 'completed',
                        transaction_token: reference,
                        email: user.email,
                        payment_method: 'clickpesa',
                        transaction_reference: reference,
                    })
                    .select()
                    .single();

                if (txError) throw txError;

                // 4. Create enrollment record
                const { error: enrollError } = await supabaseAdmin
                    .from('enrollment')
                    .insert({
                        course_id: courseId,
                        student_id: user.id,
                        transaction_id: transaction.id,
                    });

                if (enrollError) throw enrollError;

                console.log('Enrollment successful');

                // Automatic redirect after success
                setTimeout(() => {
                    window.location.href = `/courses/${courseId}`;
                }, 3000);

            } catch (err: any) {
                console.error('Error processing enrollment:', err);
                setProcessError(err.message || 'Failed to complete enrollment');
            } finally {
                setProcessing(false);
            }
        }

        if (!userLoading && user && isSuccess) {
            handleEnrollment();
        }
    }, [isSuccess, user, userLoading, courseId, reference]);

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
                                ? processing
                                    ? "Processing your enrollment... please wait."
                                    : "Your payment was successful. We've sent a confirmation email your way. You now have full access to the course content."
                                : "The transaction was unsuccessful. This could be due to insufficient funds, an expired card, or a temporary network issue."}
                        </p>
                        {processError && (
                            <p className="mt-2 text-red-500 text-xs font-medium">
                                Error: {processError}
                            </p>
                        )}
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
