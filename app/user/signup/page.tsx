'use client'
import { getProviders, signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Signup = () => {
    const {data:session} = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState<any>(null);
    const [user, setUser] = useState({
        username:'',
        email: '',
        password: ''
    });
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setupProviders();
    }, []);

    useEffect(() => {
        if (session?.user?.id) {
            router.push('/');
        }
    }, [session?.user?.id]);
    
    const onSignup = async () => { }
    return (
        <section className='w-full min-h-screen p-2 flex flex-col items-center justify-center'>
            <div className='absolute bg-gradient-to-tl from-purple-700 to-green-400 w-44 h-44 md:w-52 md:h-56 rounded-full -z-10 top-1/3' />
            <div className='bg-white/80 dark:bg-slate-800/60 dark:border-slate-700 rounded-lg p-2 py-3 md:px-6 md:py-4 w-full max-w-md  gap-3 flex flex-col shadow-sm  backdrop-blur-2xl'>
                <h1 className='text-lg text-center'>Signup</h1>
                <div className='border-b-[1px] dark:border-slate-700' />
                <label htmlFor='username' className='text-sm'>Username</label>
                <input
                    className='pl-4 py-2.5 border bg-transparent rounded-md  outline-none dark:border-slate-700'
                    id='username'
                    type='text'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder='username'
                />
                <label htmlFor='email' className='text-sm'>Email</label>
                <input
                    className='pl-4 py-2.5 border bg-transparent rounded-md  outline-none dark:border-slate-700'
                    id='email'
                    type='text'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='email'
                />
                <label htmlFor='password' className='text-sm'>Password</label>
                <input
                    className='pl-4 py-2.5 border bg-transparent rounded-md  outline-none dark:border-slate-700'
                    id='password'
                    type='password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='password'
                />
                <button
                    onClick={onSignup}
                    className='outline-none py-2 md:py-2.5 bg-blue-700 text-white rounded-md mt-8 border dark:bg-slate-900/80 dark:text-slate-300 dark:border-slate-700'> Signup
                </button>
                <p className='text-center mt-4'>
                    Allready have an account ?
                    <Link href='/user/login' className='text-blue-600'> Login </Link>
                </p>
                <div className='flex items-center gap-2'>
                    <div className='border-b-[1px] w-full dark:border-slate-700' />
                    <span>Or</span>
                    <div className='border-b-[1px] w-full dark:border-slate-700' />
                </div>
                <div className='flex flex-col items-center  gap-2'>
                    {
                        providers && Object.values(providers).map((provider: any) => <button
                            key={provider.id}
                            onClick={() => signIn(provider.id)}
                            className='outline-none py-2 md:py-2.5 bg-blue-500 text-white rounded-md w-full border dark:bg-slate-900/80 dark:text-slate-300 dark:border-slate-700'> Continue with {provider.name}
                        </button>)
                    }
                </div>
            </div>
        </section>
    )
}

export default Signup