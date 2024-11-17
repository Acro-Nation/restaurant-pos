'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Checkbox } from '@/components/atoms/checkbox'
import LoginUserIcon from '@/assets/icons/LoginUser'
import LoginPassIcon from '@/assets/icons/LoginPass'
import Link from 'next/link'

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
})

export function LoginForm() {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div>
      <h2 className="font-semibold text-2xl lg:text-[40px] text-[#181818] my-5 lg:my-20">
        Sign In to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Field */}
        <div>
          <label>
            Enter your Email <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <LoginUserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label>
            Enter your Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <LoginPassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              className="pl-10"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            checked={values.rememberMe}
            onCheckedChange={(checked) => setFieldValue('rememberMe', checked)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-5">
          <Button
            variant={'confirm'}
            size={'custom'}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
          <Link href={'/forgetpassword'}>
            <Button variant={'cancel'} size={'custom'}>
              Forget Password?
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
