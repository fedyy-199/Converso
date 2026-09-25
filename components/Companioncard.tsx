import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface CompanioncardProps {
    id: string;
    subject: string;
    name: string;
    topic: string;
    duration: number;
    color: string;
}

const Companioncard = ({
    id,
    subject,
    name,
    topic,
    duration,
    color,
}: CompanioncardProps) => {
    return (
        <article className='companion-card' style={{ backgroundColor: color }}>

            <div className='flex justify-between '>
                <div className='subject-badge'>
                    {subject}
                </div>
                <button className='companion-bookmark'>
                    <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />

                </button>
            </div>
            <h2 className='text-xl font-bold'>
                {name}
            </h2>
            <p className='text-sm'> {topic}</p>
            <div className='flex gap-2'>
                <Image src="/icons/Clock.svg" alt="Clock" width={14} height={14} />
                <p className='text-sm'> {duration} mins</p>

            </div>

            <Link href={`/companion/${id}`} className='w-full'>
                <button className='btn-primary justify-center w-full' >
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default Companioncard