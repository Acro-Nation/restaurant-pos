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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
})

export function VerifyForm() {
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
    <div className="lg:text-center max-w-md mx-auto">
      <div className="my-5 lg:my-10">
        <h2 className="font-semibold text-2xl lg:text-3xl text-gray-800">
          Verification Code
        </h2>
        <p className="text-gray-500 mt-4">
          Please check your email at{' '}
          <span className="font-semibold">demo@zamil.com</span> and enter the
          verification code.
          <span className="text-teal-600 cursor-pointer ml-2">
            Wrong email? Change it.
          </span>
        </p>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={forms.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2 className="font-semibold text-xl lg:text-2xl text-center text-gray-800">
                    01:05
                  </h2>
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex lg:gap-5 gap-2 ml-5">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-teal-600 text-white hover:bg-teal-700"
            type="submit"
          >
            Verify
          </Button>
        </form>
      </Form>
    </div>
  )
}
