import { useState } from "react";
import OtpPrompt from "./components/otp-prompt";
import './App.css'
export default function App() {
  const createOtp = () => {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return otp;
  }

  const [otp, setOtp] = useState<number | null>(null)
  const [isSent, setIsSent] = useState(false);

  const handleSendOtp = () => {
    const updatedOtp = createOtp();
    setOtp(updatedOtp)
    setIsSent(true)
  }

  return (
    <div className="wrapper">
      <div>
        <OtpPrompt />
        <button className="submit-btn">Submit</button>
      </div>
      <button onClick={handleSendOtp}>{isSent ? 'Resend' : 'Send'} otp</button>
    </div>
  )
}
