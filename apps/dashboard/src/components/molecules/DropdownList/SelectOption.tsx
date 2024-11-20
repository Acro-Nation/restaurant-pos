import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectPropType {
    classes?: string;
    Options?: string[]
    SelectPlaceholder?: string;
    setValue?: (value: string) => void;
    isDisabled?: boolean;
    formikName?: string;
    icons?: React.ReactElement;
    extraClass?: string;
}

export function SelectOption({ Options, ...props }: SelectPropType) {
    return (
        <Select name={props.formikName} disabled={props.isDisabled} onValueChange={(e) => {
            props.setValue!(e)
        }}>
            <SelectTrigger className={`w-[134px] ${props.classes}`}>
                <SelectValue placeholder={props.SelectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Options?.map((item, index) => (
                        <SelectItem key={index}  value={item.toLowerCase()}>
                            <div className={props.extraClass}>
                                <span className="inline-block pt-[6px]">{props.icons}</span>
                                <p className="inline-block">{item}</p>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}