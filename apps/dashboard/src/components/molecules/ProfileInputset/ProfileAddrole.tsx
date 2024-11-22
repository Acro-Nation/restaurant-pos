"use client"
import ProfileButtonSet from "@/components/atoms/ProfileButtonSet"
import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { useFormik } from "formik"
import { SelectOption } from "../DropdownList/SelectOption"
import { addRoleData } from "@/constant/userProfileInfo"
import { profileAddRoleSchema } from "@/constant/yupSchema"
import { USER_ROLE2 } from "@/constant/role"

export default function ProfileAddRole() {
    const [editData, setEditData] = useState(false)
    const [changed, isChanged] = useState(false)

    const formik = useFormik({
        initialValues: {
            addrole1: '',
            addrole2: '',
            selectValues1: '',
            selectValues2: ''
        },
        validationSchema: profileAddRoleSchema,
        onSubmit: ({ ...value }) => {
            console.log(value)

        }
    })


    return (
        <form className="w-full h-auto flex bg-[#FFFFFF] justify-between px-6" method="POST" onSubmit={(e) => { e.preventDefault() }}>
            <div className="w-4/5 h-auto flex flex-col gap-y-6 py-6">
                <p className="text-[34px] leading-10 font-semibold text-[#181818]">Address</p>
                <div className="flex justify-between xl:flex-row flex-col">
                    {addRoleData.map((item, index) => (
                        <div key={index} className="flex items-end px-4 justify-evenly w-[622px]">
                            <div className="flex flex-col w-2/3 relative justify-evenly gap-y-2">
                                <label className="text-[#181818] text-lg font-medium" htmlFor={item.name}>{item.label}</label>
                                <Input name={item.name}
                                    id={item.name}
                                    readOnly={!editData}
                                    placeholder={item.placeholder}
                                    className="outline-none h-[60px] border-2 border-[#00000086] w-full px-6 text-lg text-[#18181899] font-normal"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        isChanged(true)
                                    }} />
                                {Object.values(formik.errors)[index] !== '' ?
                                    <p className="absolute top-[-15px] text-[red] right-0">{formik.errors[item.name as keyof typeof formik.errors]}</p> : ''}
                            </div>
                            <SelectOption
                                SelectPlaceholder="Users"
                                classes="h-[44px] mb-2 bg-[#00897B] text-lg font-medium text-white"
                                Options={Object.values(USER_ROLE2).map((item) => {
                                    return item
                                })}
                                setValue={(e) => {
                                    formik.setFieldValue(item.formikName, e)
                                }} formikName={item.formikName} isDisabled={!editData} />
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