"use client"
import AdminProfileImage from "@/app/features/AdminProfile/AdminProfileImage"
import FormUpperSection from "@/components/molecules/ProfileInputset/FormUpperSection"
import FormLowerSection from "@/components/molecules/ProfileInputset/FormLowerSection"
import ProfileAddRole from "@/components/molecules/ProfileInputset/ProfileAddrole"
import PaymentAndOthers from "@/components/molecules/ProfileInputset/PaymentAndOthers"

export default function Profile() {
    return (
        <div className="h-auto w-full pr-[60px] pl-6 py-6">
            <div className="container mx-auto h-auto w-full ">
                <div className="w-full h-auto flex flex-col justify-between gap-y-6">
                    <AdminProfileImage />
                    <div className="w-full h-auto flex flex-col gap-y-6">
                        <FormUpperSection />
                        <FormLowerSection />
                        <ProfileAddRole />
                        <PaymentAndOthers />
                    </div>
                </div>
            </div>
        </div>
    )
}