"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";



// 1. Define your form schema.
const formSchema = z.object({
  username: z.string().min(2).max(50),
  companyName: z.string().min(2).max(50),
  positionTitle: z.string().min(2).max(50),
  employmentType: z.string().min(2).max(50),
  locationType: z.string().min(2).max(50),
  startDate: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  endDate: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date().nullable()),
  industry: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

const DemoForm = () => {
  const [industries, setIndustries] = useState<{ id: string; name: string }[]>([]);
  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      companyName: "",
      positionTitle: "",
      employmentType: "",
      locationType: "",
      startDate: new Date(),
      endDate: undefined,
      industry: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchIndustries = async () => {
      const response = await fetch('https://api.staging.excelerate.dk/industries');
      const data = await response.json();
      // Assert that each item in the data array has a 'name' property of type string
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setIndustries(sortedData);
    };

    fetchIndustries();
  }, []);

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  };

 
  // 4. Render the form.
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="demo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Title</FormLabel>
              <FormControl>
                <Input placeholder="Position Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <FormControl>
                <Input placeholder="Employment Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type</FormLabel>
              <FormControl>
                <Input placeholder="Location Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
              <Input type="date" {...form.register("startDate")} />
              </FormControl>
              <FormDescription>
                Please select a start date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
              <Input type="date" {...form.register("endDate")} />
              </FormControl>
              <FormDescription>
                Optional: Select an end date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <select {...field} defaultValue="">
                  <option value="" disabled>Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>{industry.name}</option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DemoForm;
