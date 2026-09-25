'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchFilter() {
    const path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use local state for immediate visual updates (optimistic UI) to prevent the "glitching" back to old values
    const [localSubject, setLocalSubject] = useState(searchParams.get('subject') || 'all');

    // Sync state if URL changes from outside (like the back button)
    useEffect(() => {
        setLocalSubject(searchParams.get('subject') || 'all');
    }, [searchParams]);

    const handleValueChange = (value: string) => {
        setLocalSubject(value); // Instantly update the UI

        if (value === 'all') {
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ['subject'],
            });
            router.push(newUrl, { scroll: false });
        } else {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'subject',
                value: value,
            });
            router.push(newUrl, { scroll: false });
        }
    };

    return (
        <Select onValueChange={handleValueChange} value={localSubject}>
            <SelectTrigger className="input capitalize max-w-30">
                <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filters</SelectLabel>
                    <SelectItem value="all">All subjects</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                            {subject}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
