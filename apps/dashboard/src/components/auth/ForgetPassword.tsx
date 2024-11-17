'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import LoginUserIcon from '@/assets/icons/LoginUser'
import Link from 'next/link'

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
})

export function ForgetPassForm() {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div>
      <h2 className="font-semibold text-2xl lg:text-[40px] text-[#181818] my-5 lg:my-20">
        Forget your Password
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

        {/* Buttons */}
        <div className="flex gap-5">
          <Button
            variant={'confirm'}
            size={'custom'}
            type="submit"
            disabled={isSubmitting}
          >
            Send Code
          </Button>
          <Link href={'/login'}>
            <Button variant={'cancel'} size={'custom'}>
              Back to Sign In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
