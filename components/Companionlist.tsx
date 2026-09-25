import Image from "next/image";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'
import { Companion } from "@/types";
import { getSubjectColor } from "@/lib/utils";
import { Sparkles, Plus, ArrowRight, BookOpen, Compass } from "lucide-react";
import { subjectsColors } from "@/constants";

interface CompanionlistProps {
    title: string;
    Companions: any[];
    classNames?: string;
}

const POPULAR_SUBJECT_CHIPS = [
    { name: "Maths", slug: "maths", color: subjectsColors.maths, icon: "/icons/maths.svg" },
    { name: "Coding", slug: "coding", color: subjectsColors.coding, icon: "/icons/coding.svg" },
    { name: "Science", slug: "science", color: subjectsColors.science, icon: "/icons/science.svg" },
    { name: "Language", slug: "language", color: subjectsColors.language, icon: "/icons/language.svg" },
    { name: "History", slug: "history", color: subjectsColors.history, icon: "/icons/history.svg" },
    { name: "Economics", slug: "economics", color: subjectsColors.economics, icon: "/icons/economics.svg" },
];

const Companionlist = ({ title, Companions, classNames }: CompanionlistProps) => {
    const hasItems = Companions && Companions.length > 0;
    const isCompanionsView = title?.toLowerCase().includes("companion");

    return (
        <article className={`companion-list flex flex-col justify-between ${classNames || ""}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h2 className='font-bold text-xl'>{title || "Recent Sessions"}</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full border border-black/15 bg-neutral-100 font-medium text-neutral-700">
                        {hasItems ? `${Companions.length} ${Companions.length === 1 ? 'item' : 'items'}` : '0 items'}
                    </span>
                </div>
                {hasItems ? (
                    <Link
                        href="/companion"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                        View all <ArrowRight className="size-3" />
                    </Link>
                ) : (
                    <span className="text-xs text-neutral-500 font-medium">Ready to start</span>
                )}
            </div>

            {hasItems ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-2/3 font-semibold">Lesson</TableHead>
                                <TableHead className="font-semibold">Subject</TableHead>
                                <TableHead className="text-right font-semibold">Duration</TableHead>
                                <TableHead className="text-right font-semibold">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Companions.map((companion, idx) => {
                                const compData = companion?.Companions;
                                if (!compData) return null;
                                return (
                                    <TableRow key={compData.id || idx} className="hover:bg-neutral-50/80 transition-colors">
                                        <TableCell className="flex gap-4 items-center">
                                            <div
                                                className="flex size-12 shrink-0 rounded-xl border border-black/15 justify-center items-center"
                                                style={{ backgroundColor: getSubjectColor(compData.subject) }}
                                            >
                                                <Image
                                                    src={`/icons/${compData.subject}.svg`}
                                                    alt={compData.subject || "subject"}
                                                    width={28}
                                                    height={28}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-start items-start min-w-0">
                                                <h3 className="text-base font-semibold truncate max-w-[220px]">
                                                    {compData.name}
                                                </h3>
                                                <p className="text-xs text-neutral-500 truncate max-w-[220px]">
                                                    {compData.topic}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="subject-badge w-fit text-xs">
                                                {compData.subject}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-medium">
                                            {compData.duration} mins
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/companion/${compData.id}`}>
                                                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">
                                                    Launch
                                                </button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                /* Rich, engaging empty state replacing the empty table */
                <div className="flex flex-col items-center text-center py-6 px-4 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/70">
                    <div className="relative mb-3">
                        <div className="size-16 rounded-2xl bg-[#FFDA6E] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <BookOpen className="size-8 text-black" />
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-primary border border-black flex items-center justify-center">
                            <Sparkles className="size-3.5 text-white" />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                        {isCompanionsView ? "No Companions Created Yet" : "No Learning Sessions Yet"}
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mb-5 font-normal">
                        {isCompanionsView
                            ? "You haven't crafted a custom companion yet. Design your own tutor with a custom voice, subject, and personality!"
                            : "Your journey starts with your first conversation! Pick a subject below or launch one of our popular companions."}
                    </p>

                    {/* Quick Subject Starters */}
                    <div className="w-full max-w-lg mb-6">
                        <p className="text-xs uppercase tracking-wider font-bold text-neutral-500 mb-2.5">
                            Pick a subject to explore:
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {POPULAR_SUBJECT_CHIPS.map((sub) => (
                                <Link
                                    key={sub.slug}
                                    href={`/companion?subject=${sub.slug}`}
                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black text-xs font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                    style={{ backgroundColor: sub.color }}
                                >
                                    <Image src={sub.icon} alt={sub.name} width={14} height={14} />
                                    <span>{sub.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href="/companion">
                            <button className="btn-primary text-sm font-semibold px-5 py-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                                <Compass className="size-4" />
                                Browse All Companions
                            </button>
                        </Link>
                        <Link href="/companion/new">
                            <button className="border border-black rounded-xl px-4 py-2.5 text-sm font-semibold bg-white hover:bg-neutral-100 transition-colors flex items-center gap-2">
                                <Plus className="size-4" />
                                Create Companion
                            </button>
                        </Link>
                    </div>

                    {/* Reassurance footer strip */}
                    <div className="mt-6 pt-4 border-t border-neutral-200/80 w-full flex items-center justify-center gap-6 text-xs text-neutral-500 flex-wrap">
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            Interactive Voice AI
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-primary"></span>
                            Real-time feedback
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-amber-500"></span>
                            Tracks your duration
                        </span>
                    </div>
                </div>
            )}
        </article>
    );
};

export default Companionlist;