import BookingForm from '~/components/booking-form'
import { bookingData } from '~/lib/data'
import { parseCurrency } from '~/lib/parse-currency'

export default function Booking() {
  const { location, entryRates, cameraCharges, accommodationRates, contactInformation } = bookingData

  return (
    <div className="flex flex-col pt-20">
      <div className="container mx-auto space-y-12 px-4 py-12">
        <div className={`
          hidden rounded-2xl border p-4
          md:block
        `}
        >
          <BookingForm />
        </div>

        {/* Important Info / Contact */}
        <div className={`
          grid grid-cols-1 gap-8
          md:grid-cols-2
        `}
        >
          <div className={`
            rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg
            md:p-8
          `}
          >
            <h2 className="mb-6 text-2xl font-bold">Booking Information</h2>
            <p className="mb-6 opacity-90">
              Accommodation at the Forest Rest House and visits to the reserve must be booked in advance. Please contact the officials below.
            </p>
            <div className="space-y-6">
              {contactInformation.contacts.map((contact, idx) => (
                <div key={idx}>
                  <h3 className={`
                    mb-2 border-b border-primary-foreground/20 pb-1 text-lg
                    font-semibold
                  `}
                  >
                    {contact.department}
                  </h3>
                  <ul className={`
                    space-y-1 font-mono text-sm
                    md:text-base
                  `}
                  >
                    {contact.phoneNumbers.map((phone, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className={`
              overflow-hidden rounded-2xl border border-border bg-card p-4
              shadow-sm
              md:p-8
            `}
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Location & Season
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Facility</dt>
                  <dd className="font-medium text-foreground">{location.facility}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Open Season</dt>
                  <dd className="font-medium text-foreground">{location.openSeason.text}</dd>
                </div>
                <div className={`
                  rounded-md bg-yellow-100 p-3 text-sm text-yellow-800
                  dark:bg-yellow-900/30 dark:text-yellow-200
                `}
                >
                  Note: The reserve is typically closed during the monsoon season.
                </div>
              </dl>
            </div>

            <div className={`
              rounded-2xl border border-border bg-card p-4 shadow-sm
              md:p-8
            `}
            >
              <h2 className="mb-4 text-xl font-bold">Entry Fees</h2>
              <div className="space-y-3">
                {entryRates.map((rate, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex items-center justify-between border-b border-border
                      pb-2
                      last:border-0 last:pb-0
                    `}
                  >
                    <span className="text-sm font-medium">{rate.category}</span>
                    <span className="font-bold text-primary">
                      {rate.price > 0 ? parseCurrency(rate.price, 0) : rate.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Table */}
        <div className={`
          rounded-2xl border border-border bg-card p-4 shadow-sm
          md:p-8
        `}
        >
          <div className="border-b border-border bg-muted px-8 py-4">
            <h2 className="text-xl font-bold">{accommodationRates.title}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className={`
                bg-muted/50 text-xs text-muted-foreground uppercase
              `}
              >
                <tr>
                  <th className="px-6 py-3">Room Type</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3 text-right">Rate (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {accommodationRates.roomTypes.map(room => (
                  room.tariffs.map((tariff, tIdx) => (
                    <tr
                      key={`${room.type}-${tIdx}`}
                      className={`
                        transition-colors
                        hover:bg-muted/30
                      `}
                    >
                      {tIdx === 0 && (
                        <td
                          className={`
                            px-6 py-4 align-top font-medium text-foreground
                          `}
                          rowSpan={room.tariffs.length}
                        >
                          {room.type}
                        </td>
                      )}
                      <td className="px-6 py-4 text-muted-foreground">
                        {tariff.userCategory}
                      </td>
                      <td className={`
                        px-6 py-4 text-right font-medium text-foreground
                      `}
                      >
                        {parseCurrency(tariff.price, 0)}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Camera Charges */}
        <div className={`
          rounded-2xl border border-border bg-card p-4 shadow-sm
          md:p-8
        `}
        >
          <h2 className="mb-2 text-xl font-bold">Camera Charges</h2>
          <p className="mb-6 text-sm text-muted-foreground">{cameraCharges.policy}</p>

          <div className={`
            grid grid-cols-1 gap-6
            md:grid-cols-3
          `}
          >
            {cameraCharges.rates.map((rate, idx) => (
              <div
                key={idx}
                className={`
                  flex flex-col justify-between rounded-lg border border-border
                  bg-background p-4
                `}
              >
                <div>
                  <h3 className="font-bold text-foreground">{rate.type}</h3>
                  {rate.note && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {rate.note}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-2xl font-bold text-primary">
                  {parseCurrency(rate.price, 0)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
