"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sparkles,
    ArrowRight,
    Plus,
    Check,
    Mail,
    Radio,
    BookOpen,
    GraduationCap,
    Heart,
} from "lucide-react";
import { subjectsColors } from "@/constants";

const SUBJECT_LINKS = [
    { name: "Mathematics", slug: "maths", color: subjectsColors.maths },
    { name: "Coding & Tech", slug: "coding", color: subjectsColors.coding },
    { name: "Science & Biology", slug: "science", color: subjectsColors.science },
    { name: "Languages", slug: "language", color: subjectsColors.language },
    { name: "History & Culture", slug: "history", color: subjectsColors.history },
    { name: "Economics & Finance", slug: "economics", color: subjectsColors.economics },
];

const PLATFORM_LINKS = [
    { label: "All Companions", href: "/companion" },
    { label: "Create Companion", href: "/companion/new" },
    { label: "My Journey & Stats", href: "/profile" },
    { label: "Pricing & Plans", href: "/subscription" },
];

const RESOURCE_LINKS = [
    { label: "Voice AI Engine", href: "/companion" },
    { label: "Curriculum Library", href: "/companion" },
    { label: "Real-time Transcripts", href: "/profile" },
    { label: "Community Guidelines", href: "#" },
];

const Footer = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="w-full bg-white mt-8">
            <div className={`max-w-[1400px] mx-auto px-14 py-16 max-sm:px-4 flex flex-col ${isHomePage ? "gap-16" : "gap-0"}`}>

                {/* Top Callout Banner - Only displayed on the homepage */}
                {isHomePage && (
                    <div className="relative overflow-hidden bg-cta rounded-4xl border border-black p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {/* Background decorative elements */}
                        <div className="absolute -top-12 -right-12 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-cta-gold/15 blur-2xl pointer-events-none" />

                        <div className="flex flex-col gap-3 max-w-2xl text-center lg:text-left z-10">
                            <div className="inline-flex items-center gap-2 bg-cta-gold rounded-full px-3.5 py-1 text-black text-xs font-bold w-fit mx-auto lg:mx-0">
                                <Sparkles className="size-3.5" />
                                <span>Transform Your Learning Experience</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                                Ready to master any topic through conversation?
                            </h3>
                            <p className="text-neutral-300 text-sm md:text-base font-light">
                                Jump straight into an interactive audio session or craft your very own AI companion with a custom voice and teaching style.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 z-10 shrink-0">
                            <Link href="/companion">
                                <button className="btn-primary text-sm md:text-base font-bold px-6 py-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                                    Explore Companions
                                    <ArrowRight className="size-4" />
                                </button>
                            </Link>
                            <Link href="/companion/new">
                                <button className="rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-semibold px-5 py-3 transition-colors flex items-center gap-2">
                                    <Plus className="size-4" />
                                    Create Custom
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Main 4-Column Footer Content */}
                <div className="grid grid-cols-1 border-t pt-6 border-black md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

                    {/* Brand Column (spans 2 columns on lg) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-3 w-fit group">
                            <div className="size-11 rounded-2xl border border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 transition-transform">
                                <Image src="/images/logo.svg" alt="Converso" width={32} height={34} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-2xl tracking-tight text-neutral-900 leading-none">
                                    Converso
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mt-1">
                                    Real-time AI Teaching
                                </span>
                            </div>
                        </Link>

                        <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">
                            Converso empowers learners with personalized, voice-first AI teaching companions. Practice languages, solve maths, write code, and discover history through active dialogue.
                        </p>

                        {/* System Status Indicator */}
                        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-black/15 bg-neutral-50 text-xs font-medium text-neutral-800 w-fit">
                            <span className="relative flex size-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                            </span>
                            <span>Voice Synthesis Operational</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 pt-2">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="size-9 rounded-full border border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
                            >
                                <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X / Twitter"
                                className="size-9 rounded-full border border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
                            >
                                <svg className="size-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="size-9 rounded-full border border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
                            >
                                <svg className="size-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 0 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.4 9.74v-8.37H5.06v8.37z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Subjects Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-neutral-900">
                            Subjects
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {SUBJECT_LINKS.map((sub) => (
                                <li key={sub.slug}>
                                    <Link
                                        href={`/companion?subject=${sub.slug}`}
                                        className="flex items-center gap-2 text-neutral-600 hover:text-black hover:translate-x-1 transition-all"
                                    >
                                        <span
                                            className="size-2.5 rounded-full border border-black/30 shrink-0"
                                            style={{ backgroundColor: sub.color }}
                                        />
                                        <span>{sub.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Platform Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-neutral-900">
                            Platform
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {PLATFORM_LINKS.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-neutral-600 hover:text-black hover:translate-x-1 transition-all flex items-center gap-1.5"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Stay Connected */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-neutral-900">
                            Stay In The Loop
                        </h4>
                        <p className="text-xs text-neutral-600">
                            Receive updates on new companion drops, study tips, and voice AI features.
                        </p>

                        {subscribed ? (
                            <div className="flex items-center gap-2 p-3 rounded-2xl border border-emerald-500 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                <Check className="size-4 text-emerald-600 shrink-0" />
                                <span>You're in! Welcome to the Converso community.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full text-xs rounded-xl border border-black px-3.5 py-2.5 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center justify-center transition-colors"
                                    >
                                        Join
                                    </button>
                                </div>
                                <span className="text-[11px] text-neutral-400">
                                    Zero spam. Unsubscribe at any time.
                                </span>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Legal / Credits Bar */}
                <div className="pt-8 border-t border-black/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
                    <div className="flex items-center gap-2">
                        <span>© {new Date().getFullYear()} Converso. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-600">
                        <span>Crafted with</span>
                        <Heart className="size-3.5 text-primary fill-primary" />
                        <span>for active learners</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/companion" className="hover:text-black transition-colors">
                            Explore
                        </Link>
                        <Link href="/profile" className="hover:text-black transition-colors">
                            Journey
                        </Link>
                        <Link href="/subscription" className="hover:text-black transition-colors">
                            Pricing
                        </Link>
                        <a href="#" className="hover:text-black transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-black transition-colors">
                            Terms
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
