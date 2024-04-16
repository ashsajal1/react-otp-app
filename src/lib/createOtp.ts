export const createOtp = () => {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return otp;
  }