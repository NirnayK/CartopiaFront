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
import Link from "next/link";
import { User } from "lucide-react";

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
      <DropdownMenuTrigger className="outline-none w-9 h-9">
        {profileImage ? (
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full overflow-hidden cursor-pointer"
          />
        ) : (
          <User className="w-7 h-7" />
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
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
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
