export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'SphereSound Pro Wireless ANC Headphones',
    category: 'Electronics',
    brand: 'SphereTech',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.9,
    reviewCount: 342,
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    stock: 18,
    description: 'Immerse yourself in high-fidelity audio with hybrid Active Noise Cancellation, 40-hour battery life, spatial soundstage, and ultra-soft memory foam earcups.',
    specs: {
      'Battery Life': '40 Hours',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Jack',
      'Driver Size': '40mm Titanium Custom',
      'Noise Reduction': 'Up to -42dB'
    },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Midnight Black', 'Silver Frost', 'Royal Blue'],
    sizes: ['One Size']
  },
  {
    id: 'prod-2',
    name: 'Aura UltraBook Slim 15" M2',
    category: 'Electronics',
    brand: 'Aura',
    price: 1199.00,
    originalPrice: 1399.00,
    discount: 14,
    rating: 4.8,
    reviewCount: 189,
    isNew: true,
    isFeatured: true,
    isFlashSale: false,
    stock: 8,
    description: 'Ultra-thin aerospace aluminum chassis housing an edge-to-edge Retina display with 120Hz Refresh, M2 Extreme processor, and all-day 18-hour battery performance.',
    specs: {
      'Processor': 'Octa-Core M2 High Performance',
      'RAM': '16GB Unified LPDDR5',
      'Storage': '512GB NVMe SSD',
      'Display': '15.4" Liquid Retina TrueTone'
    },
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Space Gray', 'Starlight Silver'],
    sizes: ['15-inch']
  },
  {
    id: 'prod-3',
    name: 'Apex Runner Nitro Sneakers',
    category: 'Shoes',
    brand: 'Apex',
    price: 139.95,
    originalPrice: 179.95,
    discount: 22,
    rating: 4.7,
    reviewCount: 412,
    isNew: false,
    isFeatured: true,
    isFlashSale: true,
    stock: 25,
    description: 'Engineered nitrogen-infused foam cushioning delivers maximum energy return with every stride. Breathable woven mesh upper with dynamic lockdown system.',
    specs: {
      'Weight': '240 grams',
      'Cushioning': 'Nitro Foam Max',
      'Surface': 'Road & Track',
      'Upper': 'Prime Knit Mesh'
    },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Infrared Orange', 'Electric Blue', 'Phantom Black'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12']
  },
  {
    id: 'prod-4',
    name: 'Luminary Chrono Automatic Leather Watch',
    category: 'Accessories',
    brand: 'Luminary',
    price: 380.00,
    originalPrice: 450.00,
    discount: 15,
    rating: 4.9,
    reviewCount: 96,
    isNew: true,
    isFeatured: true,
    isFlashSale: false,
    stock: 12,
    description: 'Masterfully crafted automatic movement watch with anti-reflective sapphire glass, genuine Italian calfskin leather strap, and 100m water resistance.',
    specs: {
      'Movement': 'Japanese Automatic 24 Jewels',
      'Case': '316L Stainless Steel 41mm',
      'Glass': 'Scratch-resistant Sapphire',
      'Water Resistance': '10 ATM (100m)'
    },
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Cognac Brown', 'Onyx Black', 'Midnight Navy'],
    sizes: ['41mm']
  },
  {
    id: 'prod-5',
    name: 'Nordic Ergonomic Velvet Armchair',
    category: 'Furniture',
    brand: 'NordicLiving',
    price: 499.00,
    originalPrice: 650.00,
    discount: 23,
    rating: 4.6,
    reviewCount: 78,
    isNew: false,
    isFeatured: true,
    isFlashSale: true,
    stock: 6,
    description: 'Scandinavia-inspired modern lounge accent chair. Premium plush velvet upholstery with hand-turned solid oak legs and high-density memory foam padding.',
    specs: {
      'Frame': 'Kiln-dried Hardwood',
      'Upholstery': 'Stain-resistant Velvet',
      'Weight Capacity': '350 lbs',
      'Dimensions': '32"W x 34"D x 36"H'
    },
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Royal Blue', 'Emerald Green', 'Mustard Yellow', 'Charcoal'],
    sizes: ['Standard']
  },
  {
    id: 'prod-6',
    name: 'Urban Tech Water-Resistant Backpack',
    category: 'Fashion',
    brand: 'UrbanPact',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 265,
    isNew: false,
    isFeatured: false,
    isFlashSale: true,
    stock: 30,
    description: 'Sleek minimal commuter backpack with padded 16" laptop sleeve, RFID-blocking security pocket, USB charging port passthrough, and waterproof YKK zippers.',
    specs: {
      'Capacity': '25 Liters',
      'Material': '900D Cordura Waterproof Polyester',
      'Laptop Pocket': 'Fits up to 16.5" Laptops',
      'Weight': '1.1 kg'
    },
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Slate Gray', 'Matte Black', 'Navy Blue'],
    sizes: ['25L']
  },
  {
    id: 'prod-7',
    name: 'Vortex Ultra Smartwatch Series 7',
    category: 'Electronics',
    brand: 'Vortex',
    price: 299.00,
    originalPrice: 399.00,
    discount: 25,
    rating: 4.9,
    reviewCount: 520,
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    stock: 15,
    description: 'Rugged titanium aerospace frame, Always-on 1.9" AMOLED display with 2000 nits peak brightness, ECG monitor, dual-frequency GPS, and 10-day battery life.',
    specs: {
      'Display': '1.9" Crystal Curved AMOLED',
      'Sensors': 'ECG, SpO2, Heart Rate, Temperature',
      'Battery': 'Up to 10 Days',
      'Rating': 'IP68 & 50m Waterproof'
    },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Titanium Orange', 'Stealth Black', 'Ocean Blue'],
    sizes: ['45mm', '49mm']
  },
  {
    id: 'prod-8',
    name: 'PureCotton Luxury Oversized Hoodie',
    category: 'Fashion',
    brand: 'PureStyle',
    price: 74.50,
    originalPrice: 95.00,
    discount: 21,
    rating: 4.6,
    reviewCount: 154,
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    stock: 40,
    description: 'Heavyweight 450 GSM French Terry organic cotton hoodie featuring dropped shoulders, double-layered hood, and pre-shrunk soft interior fleece.',
    specs: {
      'Fabric': '100% Organic French Terry Cotton (450 GSM)',
      'Fit': 'Relaxed Oversized Drop-Shoulder',
      'Care': 'Machine Wash Cold, Lay Flat to Dry'
    },
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Heather Gray', 'Royal Blue', 'Washed Apricot', 'Off-White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-9',
    name: 'Velocity Carbon Fiber Pickleball Paddle Set',
    category: 'Sports',
    brand: 'Velocity',
    price: 119.99,
    originalPrice: 159.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 88,
    isNew: true,
    isFeatured: false,
    isFlashSale: true,
    stock: 14,
    description: 'USAPA approved tournament pickleball paddle set with raw T700 carbon fiber surface for high spin, honeycomb polypropylene core, and 2 court balls + carry bag.',
    specs: {
      'Face Material': 'T700 Raw Carbon Fiber',
      'Core Thickness': '16mm Honeycomb Polypropylene',
      'Weight': '8.0 oz',
      'Approval': 'USAPA Approved'
    },
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Cyber Cyan', 'Neon Orange'],
    sizes: ['Standard']
  },
  {
    id: 'prod-10',
    name: 'Minimalist Walnut Wood Desk Lamp',
    category: 'Furniture',
    brand: 'NordicLiving',
    price: 89.00,
    originalPrice: 120.00,
    discount: 26,
    rating: 4.7,
    reviewCount: 112,
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    stock: 20,
    description: 'Architectural LED table lamp with solid natural walnut wood body, touch-controlled warm light dimming, magnetic wireless smartphone charger base.',
    specs: {
      'Light Source': 'Warm LED (2700K - 5000K Adjustable)',
      'Charging Base': '15W Qi Wireless Fast Charging',
      'Power Input': 'USB-C Type-C',
      'Material': 'Solid American Walnut & Anodized Aluminum'
    },
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Natural Walnut', 'Dark Ebony'],
    sizes: ['Standard']
  },
  {
    id: 'prod-11',
    name: 'SphereLens 4K Cinema Drone',
    category: 'Electronics',
    brand: 'SphereTech',
    price: 799.00,
    originalPrice: 999.00,
    discount: 20,
    rating: 4.9,
    reviewCount: 230,
    isNew: true,
    isFeatured: true,
    isFlashSale: false,
    stock: 9,
    description: 'Foldable cinematic 4K HDR camera drone featuring 3-axis mechanical gimbal stabilization, 46-minute maximum flight time, and 12km HD video transmission.',
    specs: {
      'Camera': '1-inch CMOS 4K 60fps',
      'Flight Time': '46 Minutes',
      'Range': '12 Kilometers',
      'Obstacle Avoidance': '360 Omnidirectional'
    },
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Glacier White', 'Stealth Gray'],
    sizes: ['Standard']
  },
  {
    id: 'prod-12',
    name: 'Vogue Designer Polarized Sunglasses',
    category: 'Accessories',
    brand: 'Luminary',
    price: 129.00,
    originalPrice: 165.00,
    discount: 21,
    rating: 4.5,
    reviewCount: 168,
    isNew: false,
    isFeatured: false,
    isFlashSale: true,
    stock: 35,
    description: 'Classic handcrafted Italian acetate frame sunglasses featuring HD polarized TAC anti-glare lenses with 100% UV400 protection.',
    specs: {
      'Lens Type': 'TAC 7-layer Polarized',
      'UV Protection': 'UV400 Category 3',
      'Frame Material': 'Handcrafted Mazzucchelli Acetate'
    },
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Tortoise Gold', 'Gloss Black', 'Transparent Amber'],
    sizes: ['Medium']
  }
];

export const CATEGORIES = [
  { id: 'cat-all', name: 'All Categories', icon: 'LayoutGrid', count: 12 },
  { id: 'cat-electronics', name: 'Electronics', icon: 'Smartphone', count: 4, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { id: 'cat-fashion', name: 'Fashion', icon: 'Shirt', count: 2, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80' },
  { id: 'cat-shoes', name: 'Shoes', icon: 'Footprints', count: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { id: 'cat-accessories', name: 'Accessories', icon: 'Watch', count: 2, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80' },
  { id: 'cat-furniture', name: 'Furniture', icon: 'Armchair', count: 2, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80' },
  { id: 'cat-sports', name: 'Sports', icon: 'Trophy', count: 1, image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=500&q=80' }
];

export const BRANDS = ['SphereTech', 'Aura', 'Apex', 'Luminary', 'NordicLiving', 'UrbanPact', 'Vortex', 'PureStyle', 'Velocity'];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Tech Lead & Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    comment: 'ShopSphere delivers an unmatched luxury shopping experience! The audio headphones I bought arrived overnight in sleek packaging. Will definitely be a lifetime customer.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Fitness Coach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'The Apex Nitro sneakers are hands down the best running shoes I have owned. Smooth checkout and lightning fast order tracking.',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Interior Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Gorgeous Nordic furniture piece. The velvet texture and solid oak build exceeded expectations. Truly modern premium quality!',
    rating: 5
  }
];
