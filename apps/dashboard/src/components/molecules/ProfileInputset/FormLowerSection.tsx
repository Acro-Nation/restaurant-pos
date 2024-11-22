"use client"
import ProfileButtonSet from "@/components/atoms/ProfileButtonSet"
import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { useFormik } from "formik"
import { userLocations } from "@/constant/userProfileInfo"
import { userLocationSchema } from "@/constant/yupSchema"

export default function FormLowerSection() {
    const [editData, setEditData] = useState(false)
    const [changed, isChanged] = useState(false)

    const formik = useFormik({
        initialValues: {
            country: 'Bangladesh',
            city: 'Dhaka',
            area: 'Mohammadpur,Dhaka',
            post: 1207,
        },
        validationSchema: userLocationSchema,
        onSubmit: ({ ...value }) => {
            console.log(value)

        }
    })


    return (
        <form className="w-full h-auto flex bg-[#FFFFFF] justify-between px-6" method="POST" onSubmit={(e) => { e.preventDefault() }}>
            <div className="w-4/5 h-auto flex flex-col gap-y-6 py-6">
                <p className="text-[34px] leading-10 font-semibold text-[#181818]">Address</p>
                <div className="2xl:flex 2xl:justify-between 2xl:gap-x-4 xl:grid xl:grid-cols-2 xl:gap-y-6">
                    {userLocations.map((item, index) => (
                        <div key={index} className="flex flex-col relative justify-evenly gap-y-2">
                            <label className="text-[#181818] text-lg font-medium" htmlFor={item.name}>{item.label}</label>
                            <Input name={item.name}
                                id={item.name}
                                readOnly={!editData}
                                value={formik.values[item.name as keyof typeof formik.values]}
                                className="outline-none border-none px-6 text-lg text-[#18181899] font-normal"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    isChanged(true)
                                }} />
                            {Object.values(formik.errors)[index] !== '' ?
                                <p className="absolute top-[-15px] text-[red] right-0">{formik.errors[item.name as keyof typeof formik.errors]}</p> : ''}
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[44px] flex justify-between items-center mt-6">
                <ProfileButtonSet
                    editEnable={setEditData}
                    ifChange={changed}
                    resetForm={() => {
                        formik.resetForm()
                    }}
                    getSubmit={() => {
                        if (Object.values(formik.errors).every((field) => field === '') === true) {
                            formik.handleSubmit()
                            isChanged(!changed)
                            console.log(formik.values)
                        } else {
                            console.log(formik.errors)
                        }
                    }} />
            </div>
        </form>
    )
}