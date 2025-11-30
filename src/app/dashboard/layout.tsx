'use client'
import { useRouter } from "next/navigation";
import {getToken, logOutUser} from '@/lib/auth';
import { Button } from "@/components/ui/button";

export default function DashboardLayout({children}:{
    children: React.ReactNode;
}) {

    const router = useRouter();
    const token = getToken();

    if(!token){
        router.push('/login');
        return null;
    }

    function handleLogout(){
        logOutUser();
         router.push('/login');
    }

    return(
        <div className="p-6">
        <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ">Hello!, Welcome to my NextJs and NestJs Authentication</h1>
        <Button variant="destructive" onClick={handleLogout} className="hover: cursor-pointer">Logout</Button>
        </header>

        {children}
        </div>
    );

}