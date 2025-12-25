import { cn } from '~/lib/utils'

const images = [
  {
    src: '/hero.jpg',
    alt: 'Dense forest canopy of Dampa',
    title: 'The Heart of the Jungle',
    colSpan: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/gallery/gallery-1.jpeg',
    alt: 'Scenic view of the reserve',
    title: 'Misty Mountains',
    colSpan: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/gallery/gallery-2.jpeg',
    alt: 'Wildlife sighting',
    title: 'Forest Trails',
    colSpan: 'md:col-span-1 md:row-span-1',
  },
  // Reusing images for layout demo since we have limited assets
  {
    src: '/gallery/gallery-1.jpeg',
    alt: 'Bamboo groves',
    title: 'Bamboo Groves',
    colSpan: 'md:col-span-1 md:row-span-2',
  },
  {
    src: '/hero.jpg',
    alt: 'River stream',
    title: 'Pristine Waters',
    colSpan: 'md:col-span-1 md:row-span-1',
  },
]

export default function Gallery() {
  return (
    <div className="flex flex-col pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className={`
          grid grid-cols-1 gap-4
          md:auto-rows-[300px] md:grid-cols-3
        `}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className={cn(`
                group relative overflow-hidden rounded-xl bg-gray-200
              `, img.colSpan)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`
                  h-full w-full object-cover transition-transform duration-500
                  group-hover:scale-110
                `}
                loading="lazy"
              />
              <div className={`
                absolute inset-0 bg-linear-to-t from-black/70 via-transparent
                to-transparent opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              `}
              />
              <div className={`
                absolute bottom-0 left-0 translate-y-4 p-6 opacity-0
                transition-all duration-300
                group-hover:translate-y-0 group-hover:opacity-100
              `}
              >
                <h3 className="text-xl font-bold text-white">{img.title}</h3>
                <p className="text-sm text-gray-200">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
