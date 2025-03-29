"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { registerSchema } from "../schema"
import { RiGoogleFill } from "@remixicon/react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const SignUpCard = () => {

  const [loading , setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const {name, email, password} = values;
    await authClient.signUp.email({
      name: name,
      email: email, 
      password: password,
      callbackURL : "/dashboard"
    }, {
      onRequest: () => {
        setLoading(true)
      },
      onError : (ctx) => {
        toast.error(ctx.error.message)
        form.reset()
        setLoading(false)
      },
      onSuccess: () => {
        redirect("/dashboard")
      }
    })
  }

  return (
    <Card className="max-w-md min-w-md rounded-sm py-8 light">
      <CardHeader>
        <Button disabled={loading} className="w-full font-semibold">
          <RiGoogleFill />
          Continue with Google
        </Button>
      </CardHeader>
      <CardContent>
      <div className="flex items-center justify-center gap-4">
          <Separator className="w-1/3"/>
          <p className="text-sm text-gray-500">or</p>
          <Separator className="w-1/3"/>
        </div>
      </CardContent>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={loading} type="name" placeholder="john doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={loading} type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={loading} type="password" placeholder="***************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} variant={"outline"} className="w-full font-semibold" type="submit">
        {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary-600 hover:underline transition-all">
          Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignUpCard