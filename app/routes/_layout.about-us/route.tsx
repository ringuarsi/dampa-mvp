export default function AboutUs() {
  return (
    <div className="flex flex-col pt-20">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className={`
          grid grid-cols-1 gap-12
          lg:grid-cols-3
        `}
        >

          {/* Left Column: Main Narrative */}
          <div className={`
            space-y-12
            lg:col-span-2
          `}
          >

            {/* History Section */}
            <section>
              <h2 className={`
                mb-4 flex items-center gap-2 text-2xl font-bold text-foreground
              `}
              >
                History & Heritage
              </h2>
              <div className={`
                prose prose-gray
                dark:prose-invert
                max-w-none leading-relaxed text-muted-foreground
              `}
              >
                <p>
                  Dampa Tiger Reserve holds a significant place in the conservation history of Mizoram. Initially notified as a wildlife sanctuary in 1985, it was declared a Tiger Reserve in 1994 under the Project Tiger initiative. This upgrade underscored the critical importance of its dense tropical forests and unique ecosystem.
                </p>
                <p className="mt-4">
                  The name "Dampa" translates to "lonely men" in the local Mizo language. Legend has it that in a village within this region, a tragedy befell the female population, leaving behind a community of bachelors. Today, the name evokes the solitary and untouched nature of the wilderness itself.
                </p>
              </div>
            </section>

            {/* Geography Section */}
            <section>
              <h2 className={`
                mb-4 flex items-center gap-2 text-2xl font-bold text-foreground
              `}
              >
                Geography
              </h2>
              <div className={`
                prose prose-gray
                dark:prose-invert
                max-w-none leading-relaxed text-muted-foreground
              `}
              >
                <p>
                  Spanning an area of approximately 500 square kilometers, Dampa is the largest wildlife sanctuary in Mizoram. It is situated in the western part of the state, along the international border with Bangladesh. The terrain is undulating, characterized by steep slopes, deep valleys, and high ridges, creating a diverse range of microclimates that support its rich biodiversity.
                </p>
              </div>
            </section>

            {/* Flora & Fauna Section */}
            <section>
              <h2 className={`
                mb-4 flex items-center gap-2 text-2xl font-bold text-foreground
              `}
              >
                Flora & Fauna
              </h2>
              <div className="space-y-6 leading-relaxed text-muted-foreground">
                <p>
                  The reserve is a biodiversity hotspot, featuring tropical evergreen and semi-evergreen forests. The moist valleys are dense with vegetation, while the slopes are often covered in extensive bamboo forests—a hallmark of the region.
                </p>

                <div className={`
                  mt-6 grid grid-cols-1 gap-6
                  md:grid-cols-2
                `}
                >
                  <div className={`
                    rounded-lg border border-border bg-card p-6 shadow-sm
                  `}
                  >
                    <h3 className="mb-2 text-lg font-semibold text-foreground">Key Wildlife</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Clouded Leopard</li>
                      <li>Asian Elephant</li>
                      <li>Gaur (Indian Bison)</li>
                      <li>Hoolock Gibbon</li>
                      <li>Slow Loris</li>
                      <li>Barking Deer</li>
                      <li>Sloth Bear</li>
                    </ul>
                  </div>
                  <div className={`
                    rounded-lg border border-border bg-card p-6 shadow-sm
                  `}
                  >
                    <h3 className="mb-2 text-lg font-semibold text-foreground">Avian Life</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Great Hornbill</li>
                      <li>Oriental Pied Hornbill</li>
                      <li>Grey Peacock Pheasant</li>
                      <li>Red Junglefowl</li>
                      <li>Emerald Dove</li>
                      <li>Blue Pitta</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm italic">
                  While Dampa is a Tiger Reserve, the elusive big cats are rarely sighted, though scientific evidence confirms their historical presence and usage of the habitat.
                </p>
              </div>
            </section>

          </div>

          {/* Right Column: Quick Facts / Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className={`
                rounded-xl border border-border bg-card p-6 shadow-sm
              `}
              >
                <h3 className="mb-4 text-xl font-bold">Quick Facts</h3>
                <dl className="space-y-4 text-sm">
                  <div className={`
                    flex justify-between border-b border-border pb-2
                  `}
                  >
                    <dt className="font-medium text-foreground">Established</dt>
                    <dd className="text-muted-foreground">1985 (Sanctuary)</dd>
                  </div>
                  <div className={`
                    flex justify-between border-b border-border pb-2
                  `}
                  >
                    <dt className="font-medium text-foreground">Tiger Reserve Status</dt>
                    <dd className="text-muted-foreground">1994</dd>
                  </div>
                  <div className={`
                    flex justify-between border-b border-border pb-2
                  `}
                  >
                    <dt className="font-medium text-foreground">Area</dt>
                    <dd className="text-muted-foreground">~500 sq km</dd>
                  </div>
                  <div className={`
                    flex justify-between border-b border-border pb-2
                  `}
                  >
                    <dt className="font-medium text-foreground">Location</dt>
                    <dd className="text-muted-foreground">Mamit District, Mizoram</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="font-medium text-foreground">Nearest City</dt>
                    <dd className="text-muted-foreground">Aizawl (~130 km)</dd>
                  </div>
                </dl>
              </div>

              <div className={`
                rounded-xl border border-primary/10 bg-primary/5 p-6
              `}
              >
                <h3 className="mb-2 text-lg font-bold text-primary">Did You Know?</h3>
                <p className="text-sm text-muted-foreground">
                  Dampa is home to several rare species of orchids and medicinal plants used by locals for generations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
