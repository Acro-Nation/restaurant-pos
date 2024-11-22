"use client"
import { Button } from "@/components/atoms/button"
import EditIcon from "@/assets/icons/EditIcon"
import { useState } from "react"
import { FormikState } from "formik"

interface ProfileButtonType {
    ifChange: boolean;
    getSubmit: (nextState?: Partial<FormikState<any>>) => void
    editEnable: (value: boolean) => void;
    setReset?: (value: boolean) => void;
    resetForm: (nextState?: Partial<FormikState<any>>) => void
}

export default function ProfileButtonSet({ editEnable, ifChange, resetForm, getSubmit }: ProfileButtonType) {
    const [isEditable, setIsEditable] = useState(false)
    const [cancel,setCnacel] = useState(false)
    editEnable(isEditable)

    return (
        <div className="flex justify-between">
            {cancel === true ? <Button onClick={() => {
                resetForm()
                setCnacel(false)
                setIsEditable(!isEditable)
            }} className="bg-transparent text-[#00897B] text-base leading-[26px] font-normal hover:bg-[#cccbcb] active:scale-95">Cancel Changes</Button> : <EditIcon onClick={() => {
                setIsEditable(!isEditable)
                setCnacel(true)
            }} className="w-[98px] h-11 active:scale-95 cursor-pointer" />}
            <Button type="submit" disabled={ifChange === false ? true : false} className="bg-transparent text-[#00897B] text-base leading-[26px] font-normal hover:bg-[#cccbcb] active:scale-95" onClick={() => {
                getSubmit()
                setCnacel(false)
                setIsEditable(false)
            }}>Save Changes</Button>
        </div>
    )
}