import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link href='/'>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <Image src="/images/logo.svg" alt="logo" width={44} height={46} />

                </div>
            </Link>
            <div className='flex items-center gap-4'>
                <Link href="/companion" className='cursor-pointer'>Companions</Link>
                <Link href="/profile">
                    <p className='cursor-pointer'>My Journey</p>
                </Link>
                <Link href="/subscription" className='cursor-pointer'>Pricing</Link>

                <Show when="signed-out">
                    <SignInButton className='btn-signin' />

                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>

        </nav>
    )
}

export default Navbar