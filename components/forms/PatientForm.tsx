"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT= 'phone-input',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'date-picker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({ name, email ,phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
        const userData = {name, email, phone};

        const user = await createUser(userData);

        if(user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">
                    Hi there 👋
                </h1>
                <p className="text-dark-700">
                    Schedule your first appointment.
                </p>
            </section>

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name ="name"
                label= "Full name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="User"
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name ="email"
                label= "Email"
                placeholder="john@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="Email"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name ="phone"
                label= "Phone number"
                placeholder="1234567890"
            />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
        </form>
    </Form>
  )
}

export default PatientForm