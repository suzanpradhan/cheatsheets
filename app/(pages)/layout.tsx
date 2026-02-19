import { TopNav } from '@/components/partials/TopNav';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
}
