"use client"

import React from 'react'
import * as z from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createCompanion } from '@/lib/actions/companion.action'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { subjects, voices } from '@/constants'

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters."),



  topic: z
    .string()
    .min(3, "Topic must be at least 3 characters."),


  subject: z
    .string()
    .min(1, "Subject must be selected.")
  ,
  voice: z
    .string()
    .min(1, "Voice must be selected."),
  style: z.string(),
  duration: z
    .string(),


})

export default function Companionform() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      topic: "",
      subject: "",
      voice: "",
      style: 'formal',
      duration: "0",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const companion = await createCompanion({
      ...data,
      duration: Number(data.duration),
    });
    if (companion) {
      redirect(`/companion/${companion.id}`);

    }
    else {
      console.error("Failed to create companion");
      redirect('/');
    }
  }

  return (
    <Card className="w-full border-1 border-black sm:max-w-md">
      <CardHeader>


      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Companion Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter companion name"
                    autoComplete="username"
                    className='input mb-4'
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field>

                  <FieldLabel htmlFor="form-rhf-input-username" className='mt-4 h-0.5'>
                    Subject
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}

                  >

                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="input capitalize mb-4 mt-2"
                    >
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectSeparator />
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className='capitalize'>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username" className='mt-2'>
                    What should this companion teach?
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the topic you want to learn ex: Algebra"
                    autoComplete="username"
                    className='input mb-4'
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Voice type
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="input capitalize mb-4"
                    >
                      <SelectValue placeholder="Select" className='' />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectSeparator />
                      {Object.entries(voices).map(([key, voice]) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Estimated Duration
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="45 min"
                    autoComplete="username"
                    className='input mb-4'
                    type='number'
                  />


                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" className='w-1/2' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-input" className="btn-primary w-1/2">
            Build
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
