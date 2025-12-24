export const bookingData = {
  location: {
    name: 'Dampa Tiger Reserve',
    facility: 'Forest Rest House',
    openSeason: {
      text: '16th October – 14th March',
      startDate: '16-Oct',
      endDate: '14-Mar',
    },
  },
  entryRates: [
    {
      category: 'Adult',
      price: 20,
      currency: 'INR',
      unit: 'per person',
    },
    {
      category: 'Student',
      price: 10,
      currency: 'INR',
      unit: 'per person',
    },
    {
      category: 'Children below 12 years',
      price: 0,
      currency: 'INR',
      note: 'FREE',
    },
  ],
  cameraCharges: {
    policy: 'Visitors are allowed to take their own cameras with nominal charges.',
    rates: [
      {
        type: 'Still Camera',
        price: 100,
        currency: 'INR',
      },
      {
        type: 'Video Camera',
        price: 200,
        currency: 'INR',
      },
      {
        type: 'Documentary Film Shooting',
        price: 1000,
        currency: 'INR',
        note: 'Video camera for shooting of documentary film',
      },
    ],
  },
  accommodationRates: {
    title: 'Forest Rest House Room Details & Rate',
    roomTypes: [
      {
        type: 'VIP Room',
        tariffs: [
          {
            userCategory: 'Officials on duty',
            price: 150,
            currency: 'INR',
          },
          {
            userCategory: 'Officials not on duty',
            price: 250,
            currency: 'INR',
          },
          {
            userCategory: 'Private / Others',
            price: 700,
            currency: 'INR',
          },
        ],
      },
      {
        type: 'General / Ordinary Room',
        tariffs: [
          {
            userCategory: 'Officials on duty',
            price: 100,
            currency: 'INR',
          },
          {
            userCategory: 'Officials not on duty',
            price: 150,
            currency: 'INR',
          },
          {
            userCategory: 'Private / Others',
            price: 300,
            currency: 'INR',
          },
        ],
      },
      {
        type: 'Dormitory',
        tariffs: [
          {
            userCategory: 'Officials on duty',
            price: 50,
            currency: 'INR',
          },
          {
            userCategory: 'Officials not on duty',
            price: 100,
            currency: 'INR',
          },
          {
            userCategory: 'Private / Others',
            price: 150,
            currency: 'INR',
          },
        ],
      },
    ],
  },
  contactInformation: {
    bookingAction: 'Book Now',
    contacts: [
      {
        department: 'Forest Rest House',
        phoneNumbers: [
          '8794748831',
          '9856828345',
          '9366114399',
        ],
      },
      {
        department: 'Mess Incharge',
        phoneNumbers: [
          '8730951762',
          '9366687229',
        ],
      },
    ],
  },
}
