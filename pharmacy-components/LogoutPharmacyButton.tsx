'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LogOut } from 'lucide-react';

export default function LogoutPharmacyButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    router.push('/pharmacy/login');
  };

  return <button onClick={handleLogout} className='flex items-center gap-2 text-red-400'>
  <LogOut size={18} />
    Logout</button>;
}