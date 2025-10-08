// Transportation options for Kumbakonam temples and attractions

export interface TransportOption {
  type: 'auto' | 'taxi' | 'bus' | 'walk';
  name: string;
  description: string;
  cost: string;
  duration: string;
  availability: string;
  contactNumbers?: string[];
  tips: string[];
}

export interface NearbyTransportHub {
  type: 'train' | 'bus' | 'taxi-stand' | 'auto-stand';
  name: string;
  distance: string;
  description: string;
  services: string[];
}

export interface TempleTransportation {
  templeId: string;
  templeName: string;
  transportOptions: TransportOption[];
  nearbyHubs: NearbyTransportHub[];
  parkingInfo: {
    available: boolean;
    type: string;
    capacity: string;
    cost: string;
  };
}

export const kumbakonamTransportation: TempleTransportation[] = [
  {
    templeId: "adi-kumbeswarar",
    templeName: "Adi Kumbeswarar Temple",
    transportOptions: [
      {
        type: 'auto',
        name: 'Auto-Rickshaw',
        description: 'Most convenient for temple hopping. Available throughout the day.',
        cost: '₹30-80 within town',
        duration: '5-10 mins from most locations',
        availability: '24/7',
        contactNumbers: ['+91 98765 43210', '+91 98765 43211'],
        tips: [
          'Agree on fare before starting',
          'Use prepaid auto stand near railway station',
          'Typical fare from railway station: ₹60',
          'Can hire for full day: ₹1,000-1,500'
        ]
      },
      {
        type: 'taxi',
        name: 'Taxi / Cab Service',
        description: 'Comfortable option for families and groups. AC available.',
        cost: '₹200-500 per trip, ₹2,000-3,000 full day',
        duration: '5-15 mins',
        availability: 'On-call, advance booking recommended',
        contactNumbers: ['+91 435 242 5555', '+91 99999 88888'],
        tips: [
          'Book through hotels for reliable service',
          'Ola/Uber available in limited areas',
          'Full day hire includes driver',
          'AC cars cost ₹500 more per day'
        ]
      },
      {
        type: 'walk',
        name: 'Walking',
        description: 'Temple is centrally located on Big Street. Pleasant walk from most hotels.',
        cost: 'Free',
        duration: '10-20 mins from town center',
        availability: 'Always',
        tips: [
          'Early morning walks recommended',
          'Big Street is pedestrian-friendly',
          'Carry water bottle',
          'Avoid midday heat (12 PM - 3 PM)'
        ]
      },
      {
        type: 'bus',
        name: 'Town Bus',
        description: 'Local bus service connects major areas. Very economical.',
        cost: '₹10-20 per trip',
        duration: '15-25 mins',
        availability: '6 AM - 9 PM',
        tips: [
          'Bus stop on TSR Big Street',
          'Routes: 1, 2, 5 pass near temple',
          'Can be crowded during peak hours',
          'Conductor will announce stops'
        ]
      }
    ],
    nearbyHubs: [
      {
        type: 'auto-stand',
        name: 'Big Street Auto Stand',
        distance: '200m',
        description: 'Main auto-rickshaw stand near the temple',
        services: ['Auto-rickshaws', 'Prepaid counters', '24/7 service']
      },
      {
        type: 'bus',
        name: 'TSR Big Street Bus Stop',
        distance: '300m',
        description: 'Main town bus stop',
        services: ['Town buses', 'Inter-city buses', 'Route information']
      },
      {
        type: 'taxi-stand',
        name: 'Kumbakonam Taxi Stand',
        distance: '500m',
        description: 'Main taxi booking point',
        services: ['Taxis', 'Tourist vehicles', 'Full day hire']
      }
    ],
    parkingInfo: {
      available: true,
      type: 'Free parking area',
      capacity: '50-60 vehicles',
      cost: 'Free'
    }
  },
  {
    templeId: "sarangapani",
    templeName: "Sarangapani Temple",
    transportOptions: [
      {
        type: 'auto',
        name: 'Auto-Rickshaw',
        description: 'Easy access from all parts of town.',
        cost: '₹30-60 within town',
        duration: '5-10 mins',
        availability: '24/7',
        contactNumbers: ['+91 98765 43210'],
        tips: [
          'Temple on Sarangapani Sannidhi Street',
          'Auto stand available at temple entrance',
          'From railway station: ₹50-70',
          'Narrow street entrance - autos drop at main road'
        ]
      },
      {
        type: 'walk',
        name: 'Walking from Adi Kumbeswarar',
        description: 'Pleasant 10-minute walk connecting two major temples.',
        cost: 'Free',
        duration: '10-15 mins (800m)',
        availability: 'Always',
        tips: [
          'Follow Big Street then turn to Sarangapani Street',
          'Well-lit route even in evening',
          'Many shops and eateries on the way',
          'Look for tall gopuram as landmark'
        ]
      },
      {
        type: 'taxi',
        name: 'Taxi Service',
        description: 'Convenient for elderly and families.',
        cost: '₹150-300 per trip',
        duration: '5-8 mins',
        availability: 'On-call',
        contactNumbers: ['+91 435 242 5555'],
        tips: [
          'Book in advance during festivals',
          'Can arrange pickup after darshan',
          'AC cars recommended for summer',
          'Driver will wait if informed'
        ]
      }
    ],
    nearbyHubs: [
      {
        type: 'auto-stand',
        name: 'Sarangapani Auto Stand',
        distance: '100m',
        description: 'Auto stand at temple entrance',
        services: ['Auto-rickshaws', 'Temple tours', 'Full day hire']
      },
      {
        type: 'bus',
        name: 'Sarangapani Bus Stop',
        distance: '400m',
        description: 'Town bus stop',
        services: ['Town buses', 'Route 3, 5, 7']
      }
    ],
    parkingInfo: {
      available: true,
      type: 'Paid parking',
      capacity: '30-40 vehicles',
      cost: '₹20 for 2-wheelers, ₹40 for cars'
    }
  },
  {
    templeId: "ramaswamy",
    templeName: "Ramaswamy Temple",
    transportOptions: [
      {
        type: 'auto',
        name: 'Auto-Rickshaw',
        description: 'Readily available throughout the day.',
        cost: '₹40-70',
        duration: '8-12 mins',
        availability: '24/7',
        tips: [
          'From town center: ₹50',
          'Combo tour with other temples: ₹800/day',
          'Prepaid auto recommended',
          'Temple clearly signposted'
        ]
      },
      {
        type: 'walk',
        name: 'Walking',
        description: 'Walkable from central areas through heritage streets.',
        cost: 'Free',
        duration: '20-25 mins (1.5 km)',
        availability: 'Always',
        tips: [
          'Route passes through old town',
          'Good photo opportunities',
          'Start early to avoid heat',
          'Ask locals for directions - very helpful'
        ]
      }
    ],
    nearbyHubs: [
      {
        type: 'auto-stand',
        name: 'Temple Road Auto Stand',
        distance: '200m',
        description: 'Small auto stand near temple',
        services: ['Auto-rickshaws', 'Local tours']
      },
      {
        type: 'bus',
        name: 'Ramaswamy Street Bus Stop',
        distance: '500m',
        description: 'Town bus connection',
        services: ['Town buses', 'Routes 2, 4']
      }
    ],
    parkingInfo: {
      available: true,
      type: 'Free parking',
      capacity: '20-30 vehicles',
      cost: 'Free'
    }
  }
];

// General transportation information
export const generalTransportInfo = {
  railwayStation: {
    name: 'Kumbakonam Junction',
    distance: '2 km from town center',
    services: [
      'Well connected to Chennai, Trichy, Madurai, Bangalore',
      'Prepaid auto stand available',
      'Cloak room for luggage',
      'Retiring rooms available'
    ],
    autoFare: '₹60-80 to temple area',
    taxiFare: '₹200-300 to hotels',
    contactNumber: '+91 435 242 0100'
  },
  busStand: {
    name: 'Kumbakonam New Bus Stand',
    distance: '1.5 km from town center',
    services: [
      'State transport and private buses',
      'Routes to Chennai, Trichy, Tanjore, Chidambaram',
      'Frequent local services',
      'Ticket counters and waiting rooms'
    ],
    autoFare: '₹40-60 to temples',
    contactNumber: '+91 435 243 0200'
  },
  airports: [
    {
      name: 'Trichy International Airport',
      distance: '90 km (1.5-2 hours)',
      transport: 'Taxi: ₹2,000-2,500, Bus: ₹100-150',
      contactNumber: '+91 431 234 1234'
    },
    {
      name: 'Chennai International Airport',
      distance: '250 km (5-6 hours)',
      transport: 'Taxi: ₹5,000-6,000, Train: ₹200-800',
      contactNumber: '+91 44 2256 0551'
    }
  ],
  localTransport: {
    autoRickshaw: {
      baseFare: '₹30',
      perKm: '₹15-20',
      fullDayHire: '₹1,000-1,500',
      tips: [
        'Bargain is expected',
        'Use meter or agree fare beforehand',
        'Keep small denominations',
        'Prepaid autos available at railway station'
      ]
    },
    taxi: {
      baseFare: '₹150',
      perKm: '₹20-25',
      fullDayHire: '₹2,500-3,500 (8 hours, 80 km)',
      tips: [
        'Book through hotels for reliability',
        'AC cars cost ₹500 more per day',
        'Driver bata (meals) included in full day hire',
        'Popular operators: Bharat Taxi, Savaari, Local hotels'
      ]
    },
    bus: {
      fare: '₹10-30',
      routes: 'All major temples and areas covered',
      timings: '6 AM - 9 PM',
      tips: [
        'Very economical option',
        'Can be crowded during peak hours',
        'No air conditioning',
        'Ask conductor for your stop'
      ]
    },
    bicycle: {
      rental: '₹50-100 per day',
      availability: 'Limited shops near hotels',
      tips: [
        'Good for leisurely exploration',
        'Not recommended in summer heat',
        'Temple town is mostly flat',
        'Lock properly when parking'
      ]
    }
  },
  importantNumbers: {
    taxiBooking: [
      '+91 435 242 5555',
      '+91 98765 43210'
    ],
    autoUnion: '+91 435 242 3333',
    busEnquiry: '+91 435 243 0200',
    railwayEnquiry: '139',
    touristPolice: '+91 435 243 0888'
  }
};

export default kumbakonamTransportation;