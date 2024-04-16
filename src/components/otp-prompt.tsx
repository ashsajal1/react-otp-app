import { useState, useRef, ChangeEvent } from 'react';
import './otp-prompt.css';

export default function OtpPrompt() {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [error, setError] = useState(false); // State to track error
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

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check if any of the OTP boxes is empty
    const isEmpty = otpValues.some(value => value === '');
    if (isEmpty) {
      setError(true); // Set error state to true
      return;
    }

    setError(false); // Reset error state if no boxes are empty

    const otp = otpValues.join('');
    // Here you can do whatever you want with the OTP value, such as sending it to a server or validating it
    console.log('Submitted OTP:', otp);
  };


  return (
    <form onSubmit={handleSubmit} className='otp-container'>
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

      <button type='submit'>Submit</button>
      {error && <p className="error-message">Please fill in all OTP boxes</p>}
    </form>
  );
}
