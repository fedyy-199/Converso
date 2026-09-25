'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { formUrlQuery } from '@jsmastery/utils';
import { removeKeysFromUrlQuery } from '@jsmastery/utils';
const SearchInput = () => {
    const path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [SearchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const delay = setTimeout(() => {
            if (SearchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: SearchQuery,

                })
                router.push(newUrl, { scroll: false });
            }
            else {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['topic'],
                })
                router.push(newUrl, { scroll: false });
            }

        }, 900)

        //return () => clearTimeout(delay);
    }, [SearchQuery, router, searchParams])
    return (
        <div className='flex border-1 px-2 py-1.5 gap-4 rounded-lg border-black'>
            <Image src='/icons/search.svg' width={14}
                height={14}
                alt='Search' />
            <input type='search' value={SearchQuery}
                placeholder='Search companions'
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-fit focus:outline-none border-none' />
        </div>
    )
}

export default SearchInput