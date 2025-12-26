import { Link } from 'react-router'

export default function BookingSuccess() {
  return (
    <div className={`
      flex size-full min-h-screen flex-col items-center justify-center
    `}
    >
      <img src="/logo_3.png" alt="Logo" className="size-32 object-contain" />
      <h1 className="mb-4 text-2xl font-bold text-green-500">Booking Successful</h1>
      <p>Your booking has been successfully made.</p>
      <Link to="/" className="mt-4 text-sm underline">Home</Link>
    </div>
  )
}
