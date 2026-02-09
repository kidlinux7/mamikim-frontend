"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CourseFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    levelFilter: string;
    setLevelFilter: (level: string) => void;
    durationFilter: string;
    setDurationFilter: (duration: string) => void;
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    onClear: () => void;
}

export function CourseFilters({
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    durationFilter,
    setDurationFilter,
    categoryFilter,
    setCategoryFilter,
    onClear,
}: CourseFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-3 mb-12 items-center justify-between bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="relative w-full md:w-1/5">
                <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-5 w-8  text-gray-400" />
                <Input
                    placeholder="Search for courses or topics"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 py-6 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all rounded-xl text-sm shadow-sm"
                />
            </div>

            <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Level</span>
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="w-[160px] h-12 bg-white border-gray-200 rounded-xl focus:ring-orange-500/20">
                            <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                            <SelectItem value="All">All Levels</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Latest">Latest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</span>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[160px] h-12 bg-white border-gray-200 rounded-xl focus:ring-orange-500/20">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                            <SelectItem value="All">All Categories</SelectItem>
                            <SelectItem value="Baking">Baking</SelectItem>
                            <SelectItem value="Business Management">Business Management</SelectItem>
                            <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                            <SelectItem value="Content Creation">Content Creation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</span>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                        <SelectTrigger className="w-[160px] h-12 bg-white border-gray-200 rounded-xl focus:ring-orange-500/20">
                            <SelectValue placeholder="All Durations" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                            <SelectItem value="All">All Durations</SelectItem>
                            <SelectItem value="Short">Short (&lt; 5h)</SelectItem>
                            <SelectItem value="Medium">Medium (5-10h)</SelectItem>
                            <SelectItem value="Long">Long (&gt; 10h)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {(searchQuery || levelFilter !== "Latest" || durationFilter !== "All" || categoryFilter !== "All") && (
                    <Button
                        variant="ghost"
                        onClick={onClear}
                        className="h-12 px-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50 gap-2 rounded-xl font-medium transition-all"
                    >
                        <X className="h-5 w-5" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
}
