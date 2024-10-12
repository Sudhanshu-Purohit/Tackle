'use client';

import { DottedSeperator } from '@/components/dotted-seperator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from 'lucide-react';
import { useCurrent } from "../api/use-current";
import { useLogout } from '../api/use-logout';

export const UserButton = () => {

    const { data: user, isLoading } = useCurrent();
    const { mutate: logout } = useLogout();

    if (!user) return null;

    const { name, email } = user;

    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? 'U';

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-100">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-75 transition border border-neutral-300 cursor-pointer'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" side='bottom' sideOffset={10}>
                <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
                    <Avatar className='size-[52px] transition border border-neutral-300 cursor-pointer'>
                        <AvatarFallback className='bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center'>
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-sm font-medium text-neutral-900'>
                            {name || 'User'}
                        </p>
                        <p className='text-xs text-neutral-500'>
                            {email}
                        </p>
                    </div>
                </div>
                <DottedSeperator className='mb-1' />
                <DropdownMenuItem onClick={() => logout()} className='h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer'>
                    <LogOut className='size-4 mr-2' />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}