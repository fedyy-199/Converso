import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Cta = () => {
    return (
        <section className='cta-section'>
            <div>
                <div className='cta-badge mb-4'>start learning your way</div>
                <h2 className='text-4xl font-bold'>Build and personalize Learning Companion</h2>
                <p className='font-light text-xl mx-auto mt-2'>Pick a name, subject, voice & personality and start learning</p>
            </div>
            <div>
                <Image src="/images/cta.svg" alt="cta" width={362} height={232}
                />
            </div>
            <Link href={"/companion/new"}>
                <button className='btn-primary w-full justify-center'>
                    <Image src="/icons/plus.svg" alt="arrow" width={12} height={12} />
                    Create Companion</button></Link>
        </section>
    )
}

export default Cta