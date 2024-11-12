'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoginUserIcon from '@/assets/icons/LoginUser'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
})

export function ForgetPassForm() {
  const forms = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl lg:text-[40px] text-[#181818] my-5 lg:my-20">
        Forget your Password
      </h2>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={forms.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Enter your Email <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <LoginUserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"></LoginUserIcon>
                    <Input
                      className="pl-10"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button variant={'confirm'} size={'custom'} type="submit">
              Send Code
            </Button>
            <Link href={'/login'}>
              <Button variant={'cancel'} size={'custom'}>
                Back to Sign In
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
