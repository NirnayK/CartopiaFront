"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Session {
  user?: {
    image?: string;
  };
}

const Pfp = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {profileImage ? (
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full overflow-hidden cursor-pointer"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session === null ? (
          <DropdownMenuItem onClick={() => signIn("google")}>
            Sign in
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Wishlist</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Pfp;
