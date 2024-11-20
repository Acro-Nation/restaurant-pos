"use client"
import { Button } from "@/components/atoms/button"
import { SelectOption } from "../DropdownList/SelectOption"
import EditIcon from "@/assets/icons/EditIcon"
import CartButtonIcon from "@/assets/icons/CartButtonIcon"
import RightArrowIcon from "@/assets/icons/RightArrowIcon"
import BkashIcon from "@/assets/icons/PaymentIconPack/BkashIcon"
import { useState } from "react"

export default function PaymentAndOthers() {
    const [selectValue,setSelectValue] = useState('')

    const inputData = [
        { label: 'Pos Customizer', name: 'customize', buttonValue: 'Preview' },
        { label: 'Bill:', name: 'city', type: 'button', buttonValue: 'Pay Bill' },
        { label: 'Restaurant Payment method', name: 'area', type: 'text' },
    ]

    return (
        <form className="w-full h-auto flex bg-[#FFFFFF] justify-between px-6" method="POST" onSubmit={(e) => { e.preventDefault() }}>
            <div className="w-4/5 h-auto flex flex-col gap-y-6 py-6">
                <p className="text-[34px] leading-10 font-semibold text-[#181818]">Business Information</p>
                <div className="flex justify-between gap-x-2 p-2">
                    {inputData.map((item, index) => (
                        <div key={index} className="flex flex-col w-[482px] bg-[#F5F5F5] justify-between gap-y-2 p-6">
                            <p className="text-[#181818] text-xl leading-8 font-semibold">{item.label}</p>
                            <div className="flex justify-between w-full gap-x-2 h-[44px]">
                                {index! <= 1 ?
                                    <Button className={`${index === 0 ? 'bg-[#181818]' : 'bg-[#00897B]'} rounded h-full active:scale-95 w-5/6`}>{item.buttonValue}</Button> :
                                    <SelectOption
                                        classes="w-4/5 h-full outline-none"
                                        SelectPlaceholder="Payment Methods"
                                        icons={<BkashIcon />}
                                        Options={['Bkash']} 
                                        extraClass="justify-between w-full flex gap-x-5 text-lg leading-[28px]" 
                                        setValue={setSelectValue}/>}
                                {index === 0 ?
                                    (<EditIcon className="cursor-pointer h-full active:scale-95" />) : index === 1 ?
                                        (<CartButtonIcon className="cursor-pointer active:scale-95" />) : index === 2 ?
                                            (<RightArrowIcon className="cursor-pointer active:scale-95" />) : ''}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}