import Companioncard from '@/components/Companioncard';
import SearchFilter from '@/components/SearchFilter';
import SearchInput from '@/components/SearchInput';
import { getSubjectColor } from '@/lib/utils';
import { GetallCompanions } from '@/lib/actions/companion.action';
import { SearchParams } from '@/types/index'
import React from 'react'

const page = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';
    const companions = await GetallCompanions({ subject, topic });

    return (
        <main>

            <section className='flex justify-between mx-2 gap-4 mt-4 max-sm:flex-col'>
                <div className=''>
                    <h2 className='font-bold text-3xl'>All Companions</h2>
                </div>
                <div className='flex items-center gap-4 '>
                    <SearchInput />
                    <SearchFilter />
                </div>

            </section>
            <section className='companions-grid'>
                {companions?.map((companion) => (
                    <Companioncard
                        key={companion.id}
                        id={companion.id}
                        subject={companion.subject}
                        name={companion.name}
                        topic={companion.topic}
                        duration={companion.duration}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>

        </main>
    )
}

export default page