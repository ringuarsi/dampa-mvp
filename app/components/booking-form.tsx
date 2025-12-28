import * as React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { bookingData } from '~/lib/data'
import { parseCurrency } from '~/lib/parse-currency'
import { cn } from '~/lib/utils'

const { entryRates, cameraCharges, accommodationRates } = bookingData

interface SelectionType {
  entryRates?: number
  cameraCharges?: number
  accommodationRates?: number
}

function ToggleCard({ label, price, checked, onChange }: { label: string, price: number, checked: boolean, onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        `
          col-span-1 flex flex-col items-center justify-between rounded-lg
          border p-4 text-left transition-all
        `,
        checked
          ? 'border-primary bg-primary text-white'
          : `
            border-border bg-card
            hover:border-primary/50
          `,
      )}
    >
      <span className="font-medium">{label}</span>
      <span className="text-lg font-bold">
        {parseCurrency(price, 0)}
      </span>
    </button>
  )
}

export default function BookingForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
  })
  const [selections, setSelections] = React.useState<SelectionType>({})
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    let sum = 0
    if (selections.entryRates !== undefined) {
      sum += entryRates[selections.entryRates].price
    }
    if (selections.cameraCharges !== undefined) {
      sum += cameraCharges.rates[selections.cameraCharges].price
    }
    if (selections.accommodationRates !== undefined) {
      const roomType = accommodationRates.roomTypes[selections.accommodationRates]
      const privateTariff = roomType.tariffs.find(t => t.userCategory === 'Private / Others')
      if (privateTariff) {
        sum += privateTariff.price
      }
    }
    setTotal(sum)
  }, [selections])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/booking-success')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Book Your Stay</h2>
        <p className="text-sm text-muted-foreground">Select your options to calculate the total</p>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Contact Information</h3>
        <div className={`
          grid grid-cols-1 gap-4
          md:grid-cols-2
        `}
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Entry Rate</h3>
        <div className="grid grid-cols-2 gap-4">
          {entryRates.map((rate, idx) => (
            <ToggleCard
              key={idx}
              label={rate.category}
              price={rate.price}
              checked={selections.entryRates === idx}
              onChange={() => setSelections({ ...selections, entryRates: idx })}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Camera Charges</h3>
        <div className="grid grid-cols-2 gap-4">
          {cameraCharges.rates.map((rate, idx) => (
            <ToggleCard
              key={idx}
              label={rate.type}
              price={rate.price}
              checked={selections.cameraCharges === idx}
              onChange={() => setSelections({ ...selections, cameraCharges: idx })}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Accommodation (Private / Others)</h3>
        <div className="grid grid-cols-2 gap-4">
          {accommodationRates.roomTypes.map((room, idx) => {
            const privateTariff = room.tariffs.find(t => t.userCategory === 'Private / Others')
            return (
              <ToggleCard
                key={idx}
                label={room.type}
                price={privateTariff?.price || 0}
                checked={selections.accommodationRates === idx}
                onChange={() => setSelections({ ...selections, accommodationRates: idx })}
              />
            )
          })}
        </div>
      </div>

      <div className={`
        flex items-center justify-between rounded-xl border-2 border-primary
        bg-primary/10 p-4
      `}
      >
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
          <p className="text-xl font-bold">{parseCurrency(total, 0)}</p>
        </div>
        <Button type="submit">Submit Booking</Button>
      </div>
    </form>
  )
}
