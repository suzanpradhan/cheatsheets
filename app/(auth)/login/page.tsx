'use client';
import Image from 'next/image';
import { LoginForm } from '@/components/modules/auth/login-form';
import background from '@/assets/images/login-bg.avif';
import { useState } from 'react';
import { RegisterForm } from '@/components/modules/auth/register-form';

export default function Login() {
  const [authMode, setAuthMode] = useState('login');
  return (
    <div className="flex min-h-screen h-screen overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 px-12 py-28">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={background}
            alt="Code background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-md text-6xl font-bold leading-[1.1] ">
          <h1 className=" text-white">Save your</h1>
          <h2 className="italic text-slate-400 mb-6">code cheats.</h2>
          <div className="w-16 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center  p-8 md:p-16 bg-white h-full overflow-y-auto">
        {authMode === 'login' ? (
          <LoginForm setAuthMode={setAuthMode} />
        ) : (
          <RegisterForm setAuthMode={setAuthMode} />
        )}
      </div>
    </div>
  );
}
