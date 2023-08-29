"use client";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormSchema = z.object({
  name: z.string().nonempty(),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender",
  }),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().nonempty().email(),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full p-2"
      >
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-bold text-xl">Name</FormLabel>
                <Button variant="ghost">Edit</Button>
              </div>
              <FormControl>
                <div className="flex justify-between">
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button variant="outline" size="lg">
                    Save
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex items-center gap-4">
                <FormLabel className="text-bold text-xl">
                  Select A Gender
                </FormLabel>
                <Button variant="ghost">Edit</Button>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex justify-between"
                >
                  <div className="flex gap-4">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Male" />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Female" />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">
                        Female
                      </FormLabel>
                    </FormItem>
                  </div>
                  <Button variant="outline" size="lg">
                    Save
                  </Button>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-bold text-xl">
                  Phone Number
                </FormLabel>
                <Button variant="ghost">Edit</Button>
              </div>
              <FormControl>
                <div className="flex justify-between">
                  <Input
                    type="string"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button variant="outline" size="lg">
                    Save
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.phoneNumber?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-bold text-xl">Email</FormLabel>
                <Button variant="ghost">Edit</Button>
              </div>
              <FormControl>
                <div className="flex justify-between">
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button variant="outline" size="lg">
                    Save
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
