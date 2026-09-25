import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { fetchSessions, getCompanionByuser } from '@/lib/actions/companion.action';
import Companionlist from '@/components/Companionlist';

const page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }
    const recentsessions = await fetchSessions();
    const companions = await getCompanionByuser();
    const Companions = companions.map((companion) => ({ 'Companions': companion }));


    return (
        <main className=''>
            <section className='flex justify-between gap-6 max-lg:flex-col'>
                <div className='flex w-1/2 gap-4 max-lg:w-full max-lg:gap-8 max-lg:justify-center'>
                    <Image src={user.imageUrl} alt={user.fullName || 'Profile picture'} height={90} width={110} className='rounded-lg max-h-[110] max-md:w-[110px] max-md:h-[110px] max-sm:w-[80px] max-sm:h-[80px]' />
                    <div className='flex-col gap-8'>
                        <h2 className='text-4xl font-bold'>{user.fullName}</h2>
                        <p className='font-light'>{user.primaryEmailAddress?.emailAddress}</p>
                    </div>

                </div>
                <div className='flex w-1/2 gap-8 p-4 max-lg:w-full'>
                    <div className='flex border-1 w-1/2 border-black py-4 px-2 flex-col justify-center items-center'>
                        <div className='flex gap-2'>
                            <Image src='/icons/check.svg' height={20} width={20} alt='check' />
                            <p className='font-semibold text-lg'>{recentsessions.length}</p>
                        </div>
                        <p>Lessons Completed</p>

                    </div>
                    <div className='flex border-1 border-black py-4 px-2 flex-col w-1/2 justify-center items-center'>
                        <div className='flex gap-2'>
                            <Image src='/icons/cap.svg' height={20} width={20} alt='cap' />
                            <p className='font-semibold text-lg'>{companions.length}</p>
                        </div>
                        <p className=''>Companions Created</p>

                    </div>
                </div>

            </section>
            <section className=''>
                <Accordion defaultValue={["shipping"]} className="w-full">
                    <AccordionItem value="shipping">
                        <AccordionTrigger className='text-2xl font-bold'>Recent Sessions</AccordionTrigger>
                        <AccordionContent>
                            <Companionlist title='Your Companions' Companions={recentsessions} />

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger className='text-2xl font-bold' >Recent Companions</AccordionTrigger>
                        <AccordionContent>
                            <Companionlist title='Recent Sessions' Companions={Companions} />
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </section>
        </main>
    )
}

export default page