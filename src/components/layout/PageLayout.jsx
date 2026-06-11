import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[84px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}