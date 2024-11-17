'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/atoms/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../atoms/input-otp'

// Validation Schema
const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, 'OTP must be 6 digits')
    .required('OTP is required'),
})

export function VerifyForm() {
  const {
    handleBlur,
    values,
    errors,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const handleOTPChange = (e: string) => {
    setFieldValue('otp', e)
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <label>
          <h2 className="font-semibold text-xl lg:text-2xl text-center text-gray-800">
            01:05
          </h2>
        </label>
        <InputOTP
          maxLength={6}
          name="otp"
          onChange={(e) => {
            handleOTPChange(e)
          }}
          onBlur={handleBlur}
          {...values}
        >
          <InputOTPGroup className="flex lg:gap-5 gap-2 ml-5">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {touched.otp && errors.otp && (
          <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
        )}
        <Button
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
          type="submit"
          disabled={isSubmitting}
        >
          Verify
        </Button>
      </form>
    </div>
  )
}
