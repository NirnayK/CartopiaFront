"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ProfileForm from "@/components/Forms/profile-form";

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-4">
        <NavigationMenu className="border-solid">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/account/orders" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  View Past Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              Profile Information
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              Manage Address
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ProfileForm />
      </div>
    </div>
  );
};

export default page;
