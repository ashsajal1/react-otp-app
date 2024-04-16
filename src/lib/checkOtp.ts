export const checkOtp = (userInput: number, otp: number) => {
  if (userInput === otp) {
    return true;
  }

  return false;
};
