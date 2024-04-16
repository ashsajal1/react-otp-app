import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast'

import OtpPrompt from "./otp-prompt";
import { createOtp } from "../lib/createOtp";
import './otp-container.css'
export default function OtpContainer() {
    const [otp, setOtp] = useState<number | null>(null)
    const [isSent, setIsSent] = useState(false);

    const handleSendOtp = () => {
        const updatedOtp = createOtp();
        setOtp(updatedOtp)
        setIsSent(true)
        toast.success(`Your otp is ${updatedOtp}!`)
    }

    return (
        <div className="container">
            <Toaster />
            <div>
                <OtpPrompt handleSendOtp={handleSendOtp} isSent={isSent} />
            </div>
            
        </div>
    )
}
