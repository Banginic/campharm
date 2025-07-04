'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LogoutPharmacyButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    router.push('/pharmacy/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}