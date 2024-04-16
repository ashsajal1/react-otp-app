export default function App() {
  const createOtp = () => {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return otp;
  }

  return (
    <div>
      {createOtp()}
    </div>
  )
}
