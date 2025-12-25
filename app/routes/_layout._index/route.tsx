import { Link } from 'react-router'

export default function Index() {
  return (
    <div className="flex flex-col">
      <section className="relative h-screen min-h-150 w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <img
          className={`
            absolute inset-0 h-full w-full object-cover transition-transform
            duration-1000
            hover:scale-105
          `}
          src="/hero.jpg"
          alt="Dampa Tiger Reserve Forest"
        />
        <div className={`
          relative z-20 flex h-full flex-col items-center justify-center px-4
          text-center text-white
        `}
        >
          <h1 className={`
            mb-4 text-5xl font-extrabold tracking-tight drop-shadow-lg
            md:text-7xl
            lg:text-8xl
          `}
          >
            DAMPA
          </h1>
          <p className={`
            mb-8 text-xl font-light drop-shadow-md
            md:text-2xl
          `}
          >
            The Largest Wildlife Sanctuary in Mizoram
          </p>
          <div className="flex gap-4">
            <Link
              to="/booking"
              className={`
                rounded-full bg-primary px-8 py-3 text-lg font-semibold
                text-primary-foreground transition-transform
                hover:scale-105 hover:bg-primary/90
              `}
            >
              Plan Your Visit
            </Link>
            <Link
              to="/about-us"
              className={`
                rounded-full border-2 border-white bg-transparent px-8 py-3
                text-lg font-semibold text-white transition-colors
                hover:bg-white hover:text-black
              `}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
