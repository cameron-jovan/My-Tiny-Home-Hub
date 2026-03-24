export const seedListings = [
  {
    id: 'nordic-minimalist',
    title: 'The Nordic Minimalist',
    price: 84500,
    description: 'A Scandinavian-inspired retreat featuring floor-to-ceiling windows and sustainable materials. This beautifully crafted tiny home blends modern Nordic design with eco-conscious living, offering panoramic views through its expansive glass facade.',
    sqft: 320,
    beds: '1 Loft',
    type: 'Tiny House on Wheels',
    status: 'Ready',
    financingAvailable: true,
    image: '/images/listings/nordic.png',
    photos: ['/images/listings/nordic.png'],
    location: 'Portland, OR',
    amenities: ['Solar Packages', 'Smart Home Tech'],
    seller: { name: 'Nordic Tiny Co.', verified: true },
    specs: {
      length: '24 ft', width: '8.5 ft', height: '13.5 ft',
      weight: '12,000 lbs', trailer: 'Triple-axle',
      insulation: 'R-28 Spray Foam', water: '40 gal freshwater',
      electrical: '30 amp / Solar Ready'
    }
  },
  {
    id: 'urban-adu',
    title: 'The Urban ADU',
    price: 112000,
    description: 'Perfect for backyard living, this model features full-sized appliances and a contemporary aesthetic. Designed for urban lots, it includes a full kitchen, modern bathroom, and flexible living space ideal for rental income or multigenerational living.',
    sqft: 480,
    beds: '1 BR',
    type: 'ADU / Backyard Suite',
    status: 'Pre-Order',
    financingAvailable: true,
    image: '/images/listings/urban-adu.png',
    photos: ['/images/listings/urban-adu.png'],
    location: 'Los Angeles, CA',
    amenities: ['Smart Home Tech'],
    seller: { name: 'ADU Builders LA', verified: true },
    specs: {
      length: '24 ft', width: '20 ft', height: '11 ft',
      foundation: 'Concrete slab', insulation: 'R-21 Fiberglass',
      water: 'City hookup', electrical: '200 amp panel',
      hvac: 'Mini-split heat pump'
    }
  },
  {
    id: 'offgrid-homestead',
    title: 'The Off-Grid Homestead',
    price: 96000,
    description: 'Equipped with advanced solar arrays and rain catchment systems for true self-sufficiency. This rugged yet refined tiny home is built for remote living with premium insulation, composting systems, and a 5kW solar setup.',
    sqft: 280,
    beds: '2 Lofts',
    type: 'Tiny House on Wheels',
    status: 'Ready',
    financingAvailable: true,
    image: '/images/listings/offgrid.png',
    photos: ['/images/listings/offgrid.png'],
    location: 'Bozeman, MT',
    amenities: ['Off-grid Ready', 'Solar Packages'],
    seller: { name: 'Off-Grid Living Co.', verified: true },
    specs: {
      length: '22 ft', width: '8.5 ft', height: '13 ft',
      weight: '10,500 lbs', trailer: 'Dual-axle',
      insulation: 'R-30 Closed Cell', water: '80 gal + rainwater',
      electrical: '5kW Solar + Battery Bank'
    }
  },
  {
    id: 'vista-panorama',
    title: 'The Vista Panorama',
    price: 145000,
    description: 'Our most premium offering with high-performance insulation and panoramic mountain views. Features a gourmet kitchen, luxury bathroom with soaking tub, and a wraparound deck for entertaining.',
    sqft: 520,
    beds: '1 BR',
    type: 'Park Model',
    status: 'Custom',
    financingAvailable: true,
    image: '/images/listings/vista.png',
    photos: ['/images/listings/vista.png'],
    location: 'Asheville, NC',
    amenities: ['Smart Home Tech', 'Solar Packages'],
    seller: { name: 'Vista Homes', verified: true },
    specs: {
      length: '38 ft', width: '14 ft', height: '13 ft',
      weight: '18,000 lbs', trailer: 'Triple-axle',
      insulation: 'R-38 SIP Panels', water: '60 gal freshwater',
      electrical: '50 amp / 3.6kW Solar'
    }
  },
  {
    id: 'desert-loft',
    title: 'The Desert Loft',
    price: 79000,
    description: 'Heat-optimized materials and high-efficiency AC make this the perfect Southwest retreat. Corrugated metal exterior with stucco accents, designed for extreme climates with superior thermal performance.',
    sqft: 240,
    beds: '1 Loft',
    type: 'Modular Foundation',
    status: 'Limited',
    financingAvailable: true,
    image: '/images/listings/desert.png',
    photos: ['/images/listings/desert.png'],
    location: 'Tucson, AZ',
    amenities: ['Off-grid Ready'],
    seller: { name: 'Desert Dwellings', verified: true },
    specs: {
      length: '20 ft', width: '12 ft', height: '12 ft',
      foundation: 'Pier & beam', insulation: 'R-24 Rigid Foam',
      water: '50 gal + greywater recycling',
      electrical: '30 amp / Solar Ready',
      hvac: 'High-efficiency mini-split'
    }
  },
  {
    id: 'sky-loft',
    title: 'Sky Loft',
    price: 89500,
    description: 'A vertically-oriented design that maximizes living space with a dramatic lofted sleeping area and cathedral ceilings. Perfect for those who want to feel spacious in a compact footprint.',
    sqft: 300,
    beds: '1 Loft',
    type: 'Tiny House on Wheels',
    status: 'Ready',
    financingAvailable: true,
    image: '/images/listings/nordic.png',
    photos: ['/images/listings/nordic.png'],
    location: 'Denver, CO',
    amenities: ['Smart Home Tech'],
    seller: { name: 'Sky Tiny Builds', verified: false },
    specs: {
      length: '24 ft', width: '8.5 ft', height: '13.5 ft',
      weight: '11,000 lbs', trailer: 'Dual-axle',
      insulation: 'R-24 Spray Foam', water: '40 gal freshwater',
      electrical: '30 amp service'
    }
  },
  {
    id: 'the-obsidian',
    title: 'The Obsidian',
    price: 108000,
    description: 'Sleek all-black exterior with warm wood interior contrasts. This statement piece features premium fixtures, heated floors, and a designer kitchen that rivals full-sized homes.',
    sqft: 350,
    beds: '1 BR',
    type: 'Container Home',
    status: 'Pre-Order',
    financingAvailable: true,
    image: '/images/listings/urban-adu.png',
    photos: ['/images/listings/urban-adu.png'],
    location: 'Austin, TX',
    amenities: ['Smart Home Tech', 'Solar Packages'],
    seller: { name: 'Container Kings', verified: true },
    specs: {
      length: '40 ft', width: '8 ft', height: '9.5 ft',
      weight: '14,000 lbs', foundation: 'Pier & beam',
      insulation: 'R-19 Closed Cell', water: 'City hookup',
      electrical: '50 amp / Solar Ready'
    }
  },
  {
    id: 'the-haven',
    title: 'The Haven',
    price: 126000,
    description: 'A park model designed for full-time living with two distinct sleeping areas and a spacious open floor plan. Features include a chef\'s kitchen, spa-like bathroom, and covered porch.',
    sqft: 450,
    beds: '2 BR',
    type: 'Park Model',
    status: 'In Stock',
    financingAvailable: true,
    image: '/images/listings/vista.png',
    photos: ['/images/listings/vista.png'],
    location: 'Savannah, GA',
    amenities: ['Smart Home Tech'],
    seller: { name: 'Haven Homes', verified: true },
    specs: {
      length: '36 ft', width: '12 ft', height: '13 ft',
      weight: '16,000 lbs', trailer: 'Triple-axle',
      insulation: 'R-28 Fiberglass', water: '60 gal freshwater',
      electrical: '50 amp service'
    }
  },
  {
    id: 'zenith-v2',
    title: 'The Zenith Series V2',
    price: 124000,
    description: '320 sq ft of pure architectural excellence. Our luxury series features designer fixtures, custom cabinetry, and a rooftop deck with retractable awning.',
    sqft: 320,
    beds: '1 BR',
    type: 'Tiny House on Wheels',
    status: 'Custom',
    financingAvailable: true,
    image: '/images/listings/offgrid.png',
    photos: ['/images/listings/offgrid.png'],
    location: 'Seattle, WA',
    amenities: ['Smart Home Tech', 'Solar Packages'],
    seller: { name: 'Zenith Builds', verified: true },
    specs: {
      length: '28 ft', width: '8.5 ft', height: '13.5 ft',
      weight: '13,500 lbs', trailer: 'Triple-axle',
      insulation: 'R-30 SIP Panels', water: '50 gal freshwater',
      electrical: '30 amp / 2.4kW Solar'
    }
  },
  {
    id: 'coastal-retreat',
    title: 'The Coastal Retreat',
    price: 135000,
    description: 'Salt-air resistant materials and beachy modern aesthetics make this the ultimate coastal living solution. Features weathered teak accents, marine-grade hardware, and floor-to-ceiling ocean views.',
    sqft: 400,
    beds: '1 BR + Loft',
    type: 'Modular Foundation',
    status: 'Ready',
    financingAvailable: true,
    image: '/images/listings/desert.png',
    photos: ['/images/listings/desert.png'],
    location: 'Outer Banks, NC',
    amenities: ['Smart Home Tech'],
    seller: { name: 'Coastal Tiny Living', verified: true },
    specs: {
      length: '30 ft', width: '14 ft', height: '14 ft',
      foundation: 'Elevated pier', insulation: 'R-24 Closed Cell',
      water: 'City hookup', electrical: '50 amp panel',
      hvac: 'Coastal-rated mini-split'
    }
  }
];

export const seedPosts = [
  {
    id: 'new-minimalism',
    slug: 'the-new-minimalism-building-beyond-limits',
    title: 'The New Minimalism: Building Beyond Limits',
    excerpt: 'The shift towards tiny living isn\'t merely a response to housing costs; it\'s a profound architectural statement on the nature of space itself.',
    content: `The shift towards tiny living isn't merely a response to housing costs; it's a profound architectural statement on the nature of space itself. In an era where digital clutter consumes our attention, the physical environment must act as a sensory sanctuary.

## The Structural Philosophy

Modern tiny homes are no longer just "smaller houses." They are hyper-engineered living modules that prioritize every square footage. Architects are utilizing vertical voids, hidden storage mechanisms, and kinetic furniture to redefine what it means to occupy a room.

The integration of smart technology has further blurred the lines between living space and intelligent environment. Voice-controlled lighting, automated climate systems, and retractable partitions mean that a 320-square-foot home can function with the versatility of a space three times its size.

## The Hawthorne Kitchen

Featured in our 2024 Design Series, the Hawthorne model demonstrates how thoughtful kitchen design can transform the cooking experience. With custom maple cabinetry, a full-size gas range, and pull-out pantry systems, this kitchen proves that tiny doesn't mean compromising on culinary ambitions.

## Living Without Compromise

As we explore the intersection of utility and beauty, certain models have emerged as paragons of this movement. The integration of high-end materials—sustainably sourced timber, polished concrete, and floor-to-ceiling glass—elevates these structures from temporary dwellings to permanent architectural legacies.

The final frontier of tiny living is the concierge experience. Buying a tiny home is a complex orchestration of logistics, zoning, and design. Whether you're looking for a primary residence or a curated retreat, the philosophy remains the same: create your life, and the space will follow.`,
    category: 'Design',
    author: 'Jo\'van Thomas',
    readTime: '15 min read',
    date: '2026-03-15',
    image: '/images/listings/nordic.png',
    featured: true
  },
  {
    id: 'adu-financing-2026',
    slug: 'adu-financing-guide-2026',
    title: 'Navigating ADU Financing in 2026: What Every Homeowner Needs to Know',
    excerpt: 'From FHA loans to state-specific grants, the ADU financing landscape has never been more favorable. Here\'s your complete guide.',
    content: `The accessory dwelling unit (ADU) market has exploded in 2026, with over 40 states now offering streamlined permitting processes. But financing remains the biggest hurdle for most homeowners.

## Understanding Your Options

**FHA 203(k) Loans**: These renovation loans now cover ADU construction on existing properties, with rates as low as 6.2% for qualifying borrowers.

**State-Specific Programs**: California's ADU Grant Program offers up to $40,000 for low-income homeowners. Oregon's ADU financing pilot provides 0% interest construction loans.

**HELOC + Construction**: For homeowners with significant equity, combining a HELOC with a construction-to-permanent loan remains the most flexible option.

## The Numbers That Matter

The average ROI on an ADU in a major metro area is now 8.3% annually through rental income alone. Property value increases of 20-35% are typical within the first year of completion.

## Getting Pre-Approved

Start with a pre-qualification from at least three lenders who specialize in ADU financing. Expect to need 10-20% down for most conventional options, though some state programs require as little as 3.5%.`,
    category: 'Financing',
    author: 'Cameron Jo\'van',
    readTime: '12 min read',
    date: '2026-03-10',
    image: '/images/listings/urban-adu.png',
    featured: true
  },
  {
    id: 'off-grid-essentials',
    slug: 'off-grid-tiny-home-essentials',
    title: 'Off-Grid Essentials: Choosing Your Power & Water Systems',
    excerpt: 'Solar, wind, or hybrid? Rainwater vs. well? We break down every off-grid system you need to consider.',
    content: `Going off-grid with your tiny home is more accessible than ever, but the choices can be overwhelming. Here's our comprehensive breakdown of the essential systems.

## Solar Power Systems

**Budget System (2-3kW)**: $8,000-$12,000 installed. Suitable for minimal energy use—LED lighting, phone charging, small appliances. Pair with 200Ah lithium battery bank.

**Standard System (5-7kW)**: $15,000-$22,000 installed. Handles full household load including mini-split HVAC. 400-600Ah battery bank recommended.

**Premium System (8-12kW)**: $25,000-$40,000 installed. Supports electric cooking, washer/dryer, and workshop tools. 800Ah+ battery bank with generator backup.

## Water Systems

Rainwater collection is legal in most states but requires proper filtration. A typical system costs $3,000-$8,000 including UV purification and storage tanks.

## The True Cost of Independence

Most off-grid tiny homeowners report breaking even on their system investment within 4-7 years, after which their utility costs drop to near zero.`,
    category: 'Lifestyle',
    author: 'Jo\'van Thomas',
    readTime: '10 min read',
    date: '2026-03-05',
    image: '/images/listings/offgrid.png',
    featured: false
  },
  {
    id: 'zoning-georgia-2026',
    slug: 'tiny-home-zoning-georgia-2026',
    title: 'Everything You Need to Know About Tiny Home Zoning in Georgia (2026)',
    excerpt: 'Georgia is quickly becoming one of the most tiny-home-friendly states. Here\'s the complete zoning breakdown by county.',
    content: `Georgia has made significant strides in tiny home zoning over the past two years. As of 2026, the state now has clear guidelines for both mobile tiny homes and foundation-based ADUs.

## State-Level Regulations

Georgia House Bill 1045 (passed 2025) established a statewide framework for tiny homes on wheels (THOW) as legal dwelling units, provided they meet IRC Appendix Q standards and are placed in approved zones.

## County-by-County Breakdown

**Fulton County (Atlanta)**: ADUs permitted in all residential zones R-1 through R-5. Maximum 800 sq ft. Owner-occupancy requirement waived as of January 2026.

**Chatham County (Savannah)**: Progressive ADU ordinance allows ground-floor and detached units up to 750 sq ft. Short-term rental allowed with permit.

**Clarke County (Athens)**: Tiny homes on wheels permitted in RD-zoned areas. Must be on approved foundation or pad.

## Getting Started

1. Contact your county's planning department for a pre-application meeting
2. Obtain a soil survey and setback analysis
3. Submit site plan with utility connections detailed
4. Allow 4-8 weeks for permit review`,
    category: 'Zoning',
    author: 'Cameron Jo\'van',
    readTime: '8 min read',
    date: '2026-02-28',
    image: '/images/listings/desert.png',
    featured: false
  },
  {
    id: 'pacific-northwest-living',
    slug: 'navigating-living-in-pacific-northwest',
    title: 'Navigating Living in the Pacific Northwest: A Design Guide',
    excerpt: '10 tips for designing a tiny home that thrives in the rain, mist, and stunning beauty of the PNW.',
    content: `The Pacific Northwest presents unique challenges and extraordinary opportunities for tiny home living. From rain management to maximizing gray-day comfort, here's how to get it right.

## Moisture Management

The PNW average of 37 inches of annual rainfall makes moisture management priority #1. Specify rain screen siding systems, vapor barriers rated for marine climates, and ensure 18+ inches of ground clearance.

## Maximizing Natural Light

With 226 cloudy days per year in Seattle, light design is critical. We recommend:
- Skylights on at least 10% of roof area
- Light tubes in bathrooms and hallways
- South-facing clerestory windows
- Light-colored interior finishes (white oak, birch)

## Insulation for PNW Climate

The PNW is mild but damp. Target R-values of R-24 walls and R-30 roof minimum. Closed-cell spray foam is preferred for its moisture resistance properties.

## Best PNW Tiny Home Communities

1. **Tiny Tranquility** (Portland, OR) - 25 sites, community garden
2. **Puget Sound Village** (Olympia, WA) - 40 sites, waterfront access
3. **Cascade Tiny Living** (Bend, OR) - 15 sites, mountain views`,
    category: 'Design',
    author: 'Jo\'van Thomas',
    readTime: '11 min read',
    date: '2026-02-20',
    image: '/images/listings/vista.png',
    featured: true
  }
];

export const categories = [
  { name: 'Container Homes', slug: 'container', count: 24, image: '/images/listings/urban-adu.png' },
  { name: 'Park Models', slug: 'park-model', count: 18, image: '/images/listings/vista.png' },
  { name: 'ADUs', slug: 'adu', count: 32, image: '/images/listings/urban-adu.png' },
  { name: 'Off-Grid Cabins', slug: 'off-grid', count: 15, image: '/images/listings/offgrid.png' },
  { name: 'Tiny on Wheels', slug: 'thow', count: 41, image: '/images/listings/nordic.png' },
];

export const topicHubs = [
  { name: 'Financing', icon: '💰', description: 'Loans, grants & payment plans', slug: 'financing' },
  { name: 'Design', icon: '✏️', description: 'Floor plans & interior ideas', slug: 'design' },
  { name: 'Zoning', icon: '📋', description: 'Laws, permits & regulations', slug: 'zoning' },
  { name: 'Lifestyle', icon: '🌿', description: 'Living tips & community', slug: 'lifestyle' },
];
