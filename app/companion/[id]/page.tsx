import { getSubjectColor } from '@/lib/utils';
import { getCompanion } from '@/lib/actions/companion.action';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import Image from 'next/image';
import CompanionComponent from '@/components/CompanionComponent';
import React from 'react'

interface CompanionProps {
    params: Promise<{
        id: string;
    }>
}

const page = async ({ params }: CompanionProps) => {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const Id = await params;
    const user = await currentUser();
    const companion = await getCompanion(Id.id);
    if (!companion) {
        notFound();
    }

    return (
        <main className='flex w-full max-sm:px-4 '>
            <div className='flex gap-8 px-4 py-4 border-1 border-black rounded-lg'>
                <div className='rounded-lg w-[72px] h-[72px] justify-center px-4 flex max-sm:hidden' style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                    <Image src={`/icons/${companion.subject}.svg`} width={35} height={35} alt={companion.subject || 'icon'} />
                </div>
                <div className='flex gap-2 w-full max-md:justify-between'>

                    <div >
                        <h1 className='text-3xl font-bold'>{companion.name}</h1>
                        <p className='text-gray-700 text-sm'>{companion.topic}</p>
                    </div>
                    <div className='subject-badge h-7'>
                        {companion.subject}
                    </div>
                </div>
                <div className='justify-end font-semibold w-26 max-md:hidden'>
                    <p>{companion.duration} min</p>

                </div>
            </div>
            <CompanionComponent
                {...companion}
                userName={user?.username || user?.firstName || 'Learner'}
                userImage={user?.imageUrl || ''}
            />

        </main>
    )
}

export default page