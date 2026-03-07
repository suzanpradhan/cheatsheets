import Image from 'next/image';
import background from '@/assets/images/login-bg.avif';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/snippets');
  }
  return (
    <div className="flex min-h-screen">
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

      <div className="w-full lg:w-1/2 flex justify-center items-center  p-8 md:p-16 bg-white">
        {children}
      </div>
    </div>
  );
}
