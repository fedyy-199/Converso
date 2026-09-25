import Companionform from '@/components/Companionform'
import { userPlan } from '@/lib/actions/companion.action';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
const page = async () => {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const userState = await userPlan();
    return (


        userState ? (
            <main className='flex-col w-full justify-center items-center'>



                <h2 className='font-bold max-sm:text-2xl text-3xl'>Build Your Companion</h2>
                <Companionform /> </main>) : (
            <main className='flex-col w-full justify-center items-center gap-12 border-1 border-black max-w-[550px] py-4 rounded-lg mt-8 max-sm:w-[400px]'>
                <div className='cta-badge'>
                    You reached your limit
                </div>

                <Image src='/images/limit.svg' height={550} width={550} alt='limit' />
                <Link href='/subscription'>
                    <div className='btn-primary'>
                        Upgrade your plan
                    </div>

                </Link>
            </main>
        )


    )
}

export default page