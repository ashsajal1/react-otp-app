import { ChangeEvent, useState } from "react";
import { toast, Toaster } from 'react-hot-toast'

import OtpPrompt from "./otp-prompt";
import { createOtp } from "../lib/createOtp";
import './otp-container.css'
import { checkOtp } from "../lib/checkOtp";
export default function OtpContainer() {
    const [otp, setOtp] = useState<number | null>(null)
    const [isSent, setIsSent] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [error, setError] = useState(false); // State to track error

    const handleSendOtp = () => {
        const updatedOtp = createOtp();
        setOtp(updatedOtp);
        setIsSent(true);
        setError(false);
    
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(updatedOtp); // Resolve the promise after a delay (simulating sending OTP)
                }, 1000); // Change the delay as needed
            }),
            {
                loading: 'Sending OTP...', // Loading message while the OTP is being sent
                success: <b>Your OTP is {updatedOtp}</b>, // Message displayed on success
                error: <b>Failed to send OTP.</b>, // Message displayed on error
            }
        );
    }
    

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Check if any of the OTP boxes is empty
        const isEmpty = otpValues.some(value => value === '');
        if (isEmpty) {
            setError(true); // Set error state to true
            return;
        }

        setError(false); // Reset error state if no boxes are empty

        const userEnteredOtp = otpValues.join('');
        // Here you can do whatever you want with the OTP value, such as sending it to a server or validating it
        // console.log('Submitted OTP:', userEnteredOtp);
        // console.log(otpValues)
        const isValid = otp !== null ? checkOtp(parseInt(userEnteredOtp), otp) : false;

        if(isValid) {
            setOtpValues(['','','',''])
            toast.success("You entered valid OTP!")
        } else {
            toast.error("You entered invalid OTP!")
        }

        // console.log(isValid)
    };

    return (
        <div className="container">
            <Toaster />
            <div>
                <OtpPrompt handleSubmit={handleSubmit} error={error} setOtpValues={setOtpValues} otpValues={otpValues} handleSendOtp={handleSendOtp} isSent={isSent} />
            </div>

        </div>
    )
}
