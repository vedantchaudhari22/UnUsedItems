import React from 'react'
import { Menu, School } from 'lucide-react'
import { Button } from './ui/button';
//import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet, SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from './ui/sheet';
//import { Button } from "@/components/ui/button"
//import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
//import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"

const Navbar = () => {

    const navigate = useNavigate()

    const user = true;
    return (
        <div className="h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>
                        <Link to='/'>Learn & Grow</Link>
                    </h1>
                </div>
                <div className='flex items-center gap-8 bg-white'>
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link to='/my-learning'>My Learnings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to='/profile'>Edit Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    DashBoard
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>) : (<div className='flex items-center gap-2'>
                            <Button variant='outline'>Login</Button>
                            <Button>Sign Up</Button>
                        </div>
                        )}
                    <DarkMode />
                </div>
            </div>

            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>Learn & Grow</h1>
                <MobileNavbar />
            </div>

        </div>
    )
}

export default Navbar

const MobileNavbar = () => {

    const role = "instructor";
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant="outline" className="text-black bg-gray-200 rounded-full
                 hover:bg-gray-200">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-white text-black flex flex-col ">
                <SheetHeader className='flex flex-row items-center justify-between mt-9'>
                    <SheetTitle className='font-bold text-2xl'>Learn & Grow</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2 ' />
                <nav className='flex flex-col space-y-4 mt-4 ml-4'>
                    <span>My Learnings</span>
                    <span>Edit Profile</span>
                    <p>Log Out</p>
                </nav>

                {
                    role === "instructor" && (
                        <SheetFooter>
                            <Button type="submit" className="bg-black text-white hover:bg-black/80">
                                DashBoard
                            </Button>
                            <SheetClose asChild>
                            </SheetClose>
                        </SheetFooter>
                    )
                }

            </SheetContent>
        </Sheet>

    )
}