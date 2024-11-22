"use client"
import { useState } from "react"
import CameraIcon from "@/assets/icons/CameraIcon"
import Image from "next/image"
import EditIcon from "@/assets/icons/EditIcon"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { useFormik } from 'formik'
import * as yup from 'yup'

// this values will be replaced with redux or API data, this initializtion is temp

const adminName = 'MD Sayfan Ahmed' // POS admin name or user name  
const position = 'Pos Handler'  // position of admin or user


export default function AdminProfileImage() {
    const [imagePreview, setImagePreview] = useState('')
    const [isProfile, setIsProfile] = useState(false)
    const [isEditable, setIsEditable] = useState(true)

    const formik = useFormik({
        initialValues: {
            profile: null
        },
        validationSchema: yup.object({
            profile: yup.mixed()
                .required('Profile Image Is Required')
                .test('fileType', 'Unsupperted File Format', (value) => {
                    return (value && ['image/jpeg', 'image/png'].includes((value as File).type))
                })
                .test('fileSize', 'This file is too large', (value) => {
                    return value && (value as File).size <= 2000000;
                })
        }),
        onSubmit: (values) => {
            console.log(values)

            //call API in here after changing profile image 
        },
    })

    return (
        <form className="w-full h-[136px] flex justify-between items-center bg-[#FFFFFF] px-6" onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit
            if (formik.errors.profile === undefined) {
                setIsEditable(true)
                setIsProfile(false)

                // if submite has successful , the button setting are reset
            }
        }}>
            <div className="flex justify-between items-center gap-x-6">
                <div className="relative rounded-full cursor-pointer" >
                    <label htmlFor="profile" className="cursor-pointer">
                        <Image src={imagePreview !== '' ? imagePreview : 'https://shorturl.at/da86K'} height={1000} width={1000} className="w-[88px] h-[88px] object-cover rounded-full" alt="admin profile" />
                        <CameraIcon className={`absolute ${isEditable ? 'opacity-60' : ''} right-0 top-3/4 active:scale-95`} />
                    </label>
                    {/* profile input */}
                    <Input type="file" disabled={isEditable} name="profile" id="profile" onChange={(e) => {
                        const newProfile = e.currentTarget.files?.[0]
                        formik.setFieldValue("profile", newProfile)             //set formik value with input changes
                        setImagePreview(URL.createObjectURL(newProfile!))       // set profile image with recent changes,
                        setIsProfile(!isProfile)                                // if any changes in profile image, activet save button
                    }} className="absolute hidden" />
                    {/* error mesage display*/}
                    {(formik.errors.profile !== undefined || formik.errors.profile !== null && formik.touched.profile) ?
                        <p className="absolute bg-[#ffeaeac7] whitespace-nowrap top-[100px] rounded text-[#ff000096] p-2">{formik.errors.profile}</p> : ''}
                </div>
                {/* admin name and position */}
                <div className="w-auto h-auto flex flex-col justify-between gap-y-1">
                    <p className="text-[#181818] text-2xl leading-[34px] font-semibold">{adminName}</p>
                    <p className="text-xl leading-[30px] text-[#797979]">{position}</p>
                </div>
            </div>
            {/* edit and save buttons */}
            <div className="flex justify-between">
                {isProfile === true ? <Button onClick={() => {
                    setIsProfile(!isProfile)
                    setImagePreview('')
                }} className="bg-transparent text-[#00897B] text-base leading-[26px] font-normal hover:bg-[#cccbcb] active:scale-95">Cancel Changes</Button> : <EditIcon onClick={() => {
                    setIsEditable(!isEditable)
                }} className="w-[98px] h-11 active:scale-95 cursor-pointer" />}
                <Button type="submit" disabled={isProfile === false ? true : false} className="bg-transparent text-[#00897B] text-base leading-[26px] font-normal hover:bg-[#cccbcb] active:scale-95">Save Changes</Button>
            </div>
        </form>
    )
}