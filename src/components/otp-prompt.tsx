import { useRef, ChangeEvent } from 'react';
import './otp-prompt.css';

interface OtpPromptProps {
  isSent: boolean,
  handleSendOtp: () => void,
  otpValues: string[],
  setOtpValues: (otpValues: string[]) => void,
  error: boolean,
  handleSubmit: (e:ChangeEvent<HTMLFormElement>) => void
}

export default function OtpPrompt({ isSent, handleSendOtp, otpValues, setOtpValues, error, handleSubmit }: OtpPromptProps) {

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    // Ensure only one integer is allowed in the input
    const sanitizedValue = inputValue.replace(/\D/g, '');

    // Update the OTP value at the specified index
    const newOtpValues = [...otpValues];
    newOtpValues[index] = sanitizedValue;
    setOtpValues(newOtpValues);

    // Move focus to the next input if available
    if (inputValue.length > 0 && index < otpValues.length - 1 && otpInputs.current[index + 1]) {
      const nextInput = otpInputs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='otp-container'>
      <div className='input-boxs'>
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={(input) => (otpInputs.current[index] = input)}
            className='otp-input'
            title="otp box"
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>

      <div className='cta-btns'>
        <button className='btn btn-primary' type='submit'>Submit</button>
        <button className='btn btn-secondary' onClick={handleSendOtp}>{isSent ? 'Resend' : 'Send'} OTP</button>
      </div>

      <div>
        {error && <p className="error">Please fill in all OTP boxes</p>}
      </div>
    </form>
  );
}
