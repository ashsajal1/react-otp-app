import { useState } from "react";

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
    <div>
      {otp}
      <div>
        <input title="otp box" type="number" />
        <input title="otp box" type="number" />
        <input title="otp box" type="number" />
        <input title="otp box" type="number" />
      </div>
      <button onClick={handleSendOtp}>{isSent ? 'Resend':'Send'} otp</button>
    </div>
  )
}
