import { Link, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div
      className="relative mx-auto flex size-full min-h-screen w-full flex-col"
    >
      <div className={`
        absolute top-0 z-50 flex size-full max-h-16 bg-black text-white
      `}
      >
        <div className={`
          mx-auto flex items-center justify-center gap-x-24 text-xl font-bold
        `}
        >
          <Link to="/">HOME</Link>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/about-us">ABOUT US</Link>
          <Link to="/booking">BOOKING</Link>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
