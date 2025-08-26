import type { Project, Product, Job, Tutorial, Book, Collection, BlogPost } from './types';

export const placeholderTutorials: Tutorial[] = [
  {
    id: 't1',
    title: 'Arduino Fundamentals: Getting Started',
    description: 'Learn the absolute basics of Arduino, from setting up your board to uploading your first sketch.',
    duration: '45 mins',
    category: 'Beginner',
    prerequisites: ['None'],
    project: '1',
  },
  {
    id: 't2',
    title: 'Reading Sensors with Arduino',
    description: 'Explore how to read data from common sensors like temperature and humidity sensors.',
    duration: '1 hour',
    category: 'Beginner',
    prerequisites: ['Arduino Fundamentals'],
    project: '1',
  },
  {
    id: 't3',
    title: 'Displaying Data on an OLED',
    description: 'Learn to connect and program an OLED screen to display text and graphics from your Arduino.',
    duration: '1.5 hours',
    category: 'Intermediate',
    prerequisites: ['Arduino Fundamentals', 'Reading Sensors with Arduino'],
    project: '1',
  },
  {
    id: 't4',
    title: 'Building the Weather Station',
    description: 'Assemble all the components and write the final code for your DIY Weather Station.',
    duration: '2 hours',
    category: 'Intermediate',
    prerequisites: ['All previous tutorials in this book'],
    project: '1',
  },
];


export const placeholderBooks: Book[] = [
  {
    id: 'b1',
    title: 'The Ultimate Arduino Weather Station Guide',
    description: 'A complete book to guide you from a beginner to building a fully functional Arduino Weather Station.',
    author: 'Alex Doe',
    category: 'Electronics',
    tutorials: placeholderTutorials,
  }
]

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

export const placeholderBlogPosts: BlogPost[] = [
  {
    id: 'bp1',
    title: 'The Art of PCB Design: A Beginner\'s Guide',
    excerpt: 'Dive into the world of printed circuit board design. This guide covers the basics from schematic capture to layout and routing.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'McPerry',
    date: 'July 28, 2024',
    slug: 'pcb-design-beginners-guide',
    category: 'Electronics',
    aiHint: 'circuit board design',
  },
  {
    id: 'bp2',
    title: 'Finding Your Unique Sound as a Music Producer',
    excerpt: 'Struggling to stand out? Explore techniques for developing a signature sound that sets you apart in the music industry.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Sugar Ranking',
    date: 'July 25, 2024',
    slug: 'finding-your-unique-sound',
    category: 'Music',
    aiHint: 'music production studio',
  },
  {
    id: 'bp3',
    title: 'Why Next.js is a Game-Changer for Web Development',
    excerpt: 'An in-depth look at the features that make Next.js a powerful framework for building modern, performant web applications.',
    imageUrl: 'https://placehold.co/600x400.png',
    author: 'Alex Doe',
    date: 'July 22, 2024',
    slug: 'why-nextjs-is-a-game-changer',
    category: 'Web Development',
    aiHint: 'code on screen',
  },
];
