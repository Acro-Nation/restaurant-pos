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
import { Checkbox } from '@/components/ui/checkbox'
import LoginUserIcon from '@/assets/icons/LoginUser'
import LoginPassIcon from '@/assets/icons/LoginPass'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, {
    message: 'Password should have minimum 8 characters',
  }),
  rememberMe: z.boolean().optional(),
})

export function LoginForm() {
  const forms = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <h2 className="font-semibold text-[40px] text-[#181818] my-20">
        Sign In to your account
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

          {/* Password Field */}
          <FormField
            control={forms.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Enter your Password <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <LoginPassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"></LoginPassIcon>
                    <Input
                      className="pl-10"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me Checkbox */}
          <FormField
            control={forms.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="rememberMe">Remember me</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button variant={'confirm'} size={'custom'} type="submit">
              Submit
            </Button>
            <Button variant={'cancel'} size={'custom'} type="submit">
              Forget Password?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
