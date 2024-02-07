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



// 1. Define your form schema. start date and end date are of type date but receives string and null respectively and then converts them to date.
// Null still does not work
const formSchema = z.object({
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
    if (arg === null || typeof arg === 'undefined') {
      return null;
    }
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
  // 2. Define your form. undefined does not work
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    //fetch industries from the api, not done on backend unfortunately
    const fetchIndustries = async () => {
      const response = await fetch('https://api.staging.excelerate.dk/industries');
      const data = await response.json();
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setIndustries(sortedData);
    };

    fetchIndustries();
  }, []);

  // save to local storage
const saveFormData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// generate key for each form submission
const generateUniqueKey = () => {
  return `formData_${new Date().getTime()}`;
};

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);

  const formattedValues = {
    ...values,
    startDate: values.startDate.toLocaleDateString('en-GB'),
    endDate: values.endDate ? values.endDate.toLocaleDateString('en-GB') : null,
  };


  const key = generateUniqueKey();

  // save to local storage
  saveFormData(key, formattedValues);
  const storedKeys = JSON.parse(localStorage.getItem("formKeys") || "[]");
  storedKeys.push(key);
  localStorage.setItem("formKeys", JSON.stringify(storedKeys));
}

 
  // 4. Render the form.
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Industry<br /></FormLabel>
              <FormControl>
                <select {...field} defaultValue="" className="flex h-10 max-h-40 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled>Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.name}>{industry.name}</option>
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
