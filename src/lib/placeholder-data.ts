import type { Project, Product, Job } from './types';

export const placeholderProjects: Project[] = [
  {
    id: '1',
    title: 'DIY Arduino Weather Station',
    description: 'Build a weather station to measure temperature, humidity, and pressure using an Arduino.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Alex Doe',
    category: 'Intermediate',
    components: ['Arduino Uno', 'DHT22 Sensor', 'BMP180 Sensor', 'OLED Display'],
    instructions: [
      { step: 1, description: 'Connect the DHT22 sensor to the Arduino.' },
      { step: 2, description: 'Connect the BMP180 sensor.' },
      { step: 3, description: 'Connect the OLED display.' },
      { step: 4, description: 'Upload the code to the Arduino.' },
    ],
    comments: [
      { id: 'c1', author: 'Bob', text: 'Great project! Had some trouble with the OLED library.', timestamp: '2 days ago' },
      { id: 'c2', author: 'Charlie', text: 'My pressure readings seem off, any ideas?', timestamp: '1 day ago' },
    ],
    upvotes: 125,
    downvotes: 3,
    aiHint: 'weather station'
  },
  {
    id: '2',
    title: 'Beginner LED Blinking with Raspberry Pi',
    description: 'A classic beginner project to learn the basics of Raspberry Pi GPIO programming.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Jane Smith',
    category: 'Beginner',
    components: ['Raspberry Pi', 'LED', 'Resistor', 'Breadboard'],
    instructions: [
      { step: 1, description: 'Setup your Raspberry Pi.' },
      { step: 2, description: 'Create the circuit on the breadboard.' },
      { step: 3, description: 'Write the Python script to blink the LED.' },
      { step: 4, description: 'Run the script.' },
    ],
    comments: [
      { id: 'c3', author: 'David', text: 'Perfect starter project, thanks!', timestamp: '5 hours ago' },
    ],
    upvotes: 250,
    downvotes: 1,
    aiHint: 'raspberry pi'
  },
    {
    id: '3',
    title: 'Advanced DIY Audio Amplifier',
    description: 'Construct a high-fidelity stereo amplifier from scratch for the best audio experience.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'McPerry',
    category: 'Advanced',
    components: ['Amplifier PCB', 'Power Transformer', 'Capacitors', 'Resistors', 'Heat Sink', 'Chassis'],
    instructions: [
      { step: 1, description: 'Solder all components onto the PCB.' },
      { step: 2, description: 'Mount the PCB and transformer in the chassis.' },
      { step: 3, description: 'Wire the power supply and input/output jacks.' },
      { step: 4, description: 'Test voltages before connecting speakers.' },
    ],
    comments: [
        { id: 'c4', author: 'Eve', text: 'This is a challenging but rewarding build!', timestamp: '1 week ago' },
        { id: 'c5', author: 'Frank', text: 'Where can I buy the PCB?', timestamp: '3 days ago' },
    ],
    upvotes: 310,
    downvotes: 5,
    aiHint: 'audio amplifier'
  }
];

export const placeholderProducts: Product[] = [
  {
    id: 'p1',
    name: 'Arduino Uno R3',
    description: 'The classic Arduino board for all your electronics projects.',
    imageUrl: 'https://placehold.co/400x400.png',
    affiliateUrl: '#',
    price: '$24.99',
    aiHint: 'microcontroller board'
  },
  {
    id: 'p2',
    name: 'Hakko FX888D-23BY Soldering Station',
    description: 'A reliable and high-quality soldering station for professionals and hobbyists.',
    imageUrl: 'https://placehold.co/400x400.png',
    affiliateUrl: '#',
    price: '$119.99',
    aiHint: 'soldering iron'
  },
  {
    id: 'p3',
    name: '300-piece Resistor Kit',
    description: 'A comprehensive kit of resistors for various electronic circuits.',
    imageUrl: 'https://placehold.co/400x400.png',
    affiliateUrl: '#',
    price: '$12.99',
    aiHint: 'electronic components'
  },
];

export const placeholderJobs: Job[] = [
    {
        id: 'j1',
        title: 'Embedded Systems Engineer',
        company: 'Tech Innovations Inc.',
        location: 'Remote',
        type: 'Full-time',
        description: 'Design and develop firmware for our next-generation IoT devices. Experience with C/C++ and RTOS required.',
        applyUrl: '#'
    },
    {
        id: 'j2',
        title: 'Junior Web Developer',
        company: 'Creative Solutions',
        location: 'New York, NY',
        type: 'Full-time',
        description: 'Join our team to build and maintain client websites. Proficiency in React and Node.js is a plus.',
        applyUrl: '#'
    },
    {
        id: 'j3',
        title: 'Music Producer Intern',
        company: 'Grinomuzik Records',
        location: 'Los Angeles, CA',
        type: 'Part-time',
        description: 'Assist our lead producers in recording sessions, mixing, and mastering tracks. Passion for music is a must.',
        applyUrl: '#'
    }
];
