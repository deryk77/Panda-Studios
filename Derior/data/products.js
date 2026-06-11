/*
 * DERIOR — Single source of truth: DERIOR_PRODUCTS
 *
 * Pricing: USD × 3,700 UGX, rounded to nearest 50,000. All prices provisional.
 * DATA FLAGS:
 *   price_provisional: true  — all prices need owner confirmation
 *   stockImage: true         — primary image is an Unsplash placeholder, needs real photo
 *
 * OWNER PENDING ACTIONS (do not modify without owner confirmation):
 *   - Ebony TV Unit: homepage showed $1,800; category page shows $1,350. Using $1,350. Confirm.
 *   - "Wardrobe" and "Wardrobe II": names are placeholders. Owner to provide real names.
 *   - All prices: provisional at 3,700×. Owner to confirm final UGX prices.
 *   - stockImage products: owner to supply real photography/renders.
 *   - img/dinning 3-9.jpg: not tracked in git; may need to be committed or replaced.
 */

window.DERIOR_PRODUCTS = [

  // ─────────────────────────────────────────────────────────────────
  // LIVING ROOM  (16 products)
  // ─────────────────────────────────────────────────────────────────

  {
    id: 'lr-sofa-001',
    name: 'Linen Three-Seater Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 8900000,
    price_provisional: true,
    images: [
      'img/LR/S1 (1).webp', 'img/LR/S1 (2).webp', 'img/LR/S1 (3).webp',
      'img/LR/S1 (4).webp', 'img/LR/S1 (5).webp', 'img/LR/S1 (6).webp'
    ],
    description: 'The frame is built for decades of use, the linen upholstery for comfort that holds its shape. Tight back cushions and solid hardwood legs maintain the silhouette over time. Six angle photographs show exactly what you are ordering. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sofa-002',
    name: 'Vintage Velvet Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 10350000,
    price_provisional: true,
    images: [
      'img/LR/S2 (1).webp', 'img/LR/S2 (2).webp', 'img/LR/S2 (3).webp',
      'img/LR/S2 (4).webp', 'img/LR/S2 (5).webp'
    ],
    description: 'Deep-set cushions and a velvet cover that softens with age rather than pilling. The curved silhouette works as a centrepiece or against a wall. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sofa-003',
    name: 'Bouclé Modular Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 11850000,
    price_provisional: true,
    images: [
      'img/LR/S3 (1).webp', 'img/LR/S3 (2).webp', 'img/LR/S3 (3).webp',
      'img/LR/S3 (4).webp', 'img/LR/S3 (5).webp', 'img/LR/S3 (6).webp',
      'img/LR/S3 (7).webp', 'img/LR/S3 (8).webp'
    ],
    description: 'Modular configuration means the sofa fits the room, not the other way around. Bouclé upholstery adds texture without pattern or colour. Arrange as an L, a U, or a single run. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sofa-004',
    name: 'Deep Comfort Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 9600000,
    price_provisional: true,
    images: [
      'img/LR/S4 (1).webp', 'img/LR/S4 (2).webp', 'img/LR/S4 (3).webp',
      'img/LR/S4 (4).webp', 'img/LR/S4 (5).webp', 'img/LR/S4 (6).webp',
      'img/LR/S4 (7).webp', 'img/LR/S4 (8).webp'
    ],
    description: 'Designed first for comfort — deep seating, a relaxed back, and wide armrests. The profile stays low enough to keep the room feeling open. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sofa-005',
    name: 'Low-Profile Lounge Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 8150000,
    price_provisional: true,
    images: [
      'img/LR/S10 (1).jpg', 'img/LR/S10 (2).jpg',
      'img/LR/S10 (3).jpg', 'img/LR/S10 (4).jpg'
    ],
    description: 'A near-floor silhouette that draws the eye down and makes any room feel taller. The cushions are firm at the base, soft at the back. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sofa-006',
    name: 'Sectional Corner Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sofa-sets',
    subcategoryLabel: 'Sofa Sets',
    price_ugx: 14050000,
    price_provisional: true,
    images: [
      'img/LR/S7 (1).webp', 'img/LR/S7 (2).webp', 'img/LR/S7 (3).webp',
      'img/LR/S7 (4).webp', 'img/LR/S7 (5).webp', 'img/LR/S7 (6).webp',
      'img/LR/S7 (7).webp', 'img/LR/S7 (8).webp', 'img/LR/S7 (9).webp',
      'img/LR/S7 (10).webp'
    ],
    description: 'Sectional design accommodates large living spaces without committing to a single arrangement. The corner configuration seats six comfortably and can be re-ordered to suit the room. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-coffee-001',
    name: 'Solid Oak Coffee Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    price_ugx: 3300000,
    price_provisional: true,
    images: ['img/LR/STV.png'],
    description: 'Turned from solid oak — the grain is structural, not decorative. No veneers, no MDF core. A table that belongs on a floor plan for thirty years. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-coffee-002',
    name: 'Travertine Coffee Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    price_ugx: 4250000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80'],
    description: 'A travertine stone top on a slender steel frame — each slab unique in its natural patterning. Travertine is quarried, not engineered, so no two tables are identical. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'lr-console-001',
    name: 'Arc Console Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'console-tables',
    subcategoryLabel: 'Console Tables',
    price_ugx: 4450000,
    price_provisional: true,
    images: [
      'img/T.png', 'img/T (1).jpg', 'img/T (2).jpg',
      'img/T (3).jpg', 'img/T (4).jpg'
    ],
    description: 'A slim console designed for hallways and entry spaces where proportion matters. The arc base is welded steel with a powder-coated finish. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-console-002',
    name: 'Slim Console Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'console-tables',
    subcategoryLabel: 'Console Tables',
    price_ugx: 4050000,
    price_provisional: true,
    images: [
      'img/S.png', 'img/S (1).jpg', 'img/S (2).jpg', 'img/S (3).jpg'
    ],
    description: 'Narrow profile, substantial build. Works behind a sofa or as a dedicated entry piece. The finish is consistent across grain. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-console-003',
    name: 'Low Console Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'console-tables',
    subcategoryLabel: 'Console Tables',
    price_ugx: 3650000,
    price_provisional: true,
    images: [
      'img/N.png', 'img/N (1).jpg', 'img/N (2).jpg',
      'img/N (3).jpg', 'img/N (4).jpg', 'img/N (5).jpg'
    ],
    description: 'A longer, lower format that works well under a mirror or as a media credenza. Solid legs, no visible hardware on the top surface. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-side-001',
    name: 'Teak Side Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'side-tables',
    subcategoryLabel: 'Side Tables',
    price_ugx: 1650000,
    price_provisional: true,
    images: [
      'img/G.png', 'img/G (1).jpg', 'img/G (2).jpg', 'img/G (3).jpg'
    ],
    description: 'Solid teak weathers both indoor humidity and time better than most species. The form is simple: round top, four legs, no shelf. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-side-002',
    name: 'Brass & Glass Side Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'side-tables',
    subcategoryLabel: 'Side Tables',
    price_ugx: 1900000,
    price_provisional: true,
    images: [
      'img/D1.png', 'img/D1 (1).jpg', 'img/D1 (2).jpg', 'img/D1 (3).jpg'
    ],
    description: 'A tempered glass top on a brass-finished steel frame. Transparent enough to work anywhere, substantial enough to read as furniture. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'lr-sideboard-001',
    name: 'Walnut Sideboard',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sideboards',
    subcategoryLabel: 'Sideboards',
    price_ugx: 6650000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'],
    description: 'Walnut grain runs the full width of each door panel — no seams, no repeat. Adjustable interior shelving behind clean doors. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'lr-sideboard-002',
    name: 'Cane & Oak Sideboard',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'sideboards',
    subcategoryLabel: 'Sideboards',
    price_ugx: 5750000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'],
    description: 'Cane front panels set into solid oak carcassing. The weave pattern lightens a piece that would otherwise read as too heavy. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'lr-tv-001',
    name: 'Ebony TV Unit',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    price_ugx: 5000000,
    price_provisional: true,
    images: ['img/TV Unit.jpg'],
    description: 'A low-profile unit in ebony-stained hardwood, sized to anchor a wall without dominating it. Cable routing built into the back panel keeps the surface clear. Dimensions and finish options available on request.',
    featured: true,
    stockImage: false
  },

  // ─────────────────────────────────────────────────────────────────
  // DINING ROOM  (9 products)
  // ─────────────────────────────────────────────────────────────────

  {
    id: 'dr-stool-001',
    name: 'Rattan Bar Stool',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'bar-stools',
    subcategoryLabel: 'Bar Stools',
    price_ugx: 1050000,
    price_provisional: true,
    images: ['img/dinning 2.jpg'],
    description: 'Natural rattan over a steel frame, finished to a consistent tone. Seat height suits standard bar counters. The material breathes — useful in warmer climates. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-stool-002',
    name: 'Leather Counter Stool',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'bar-stools',
    subcategoryLabel: 'Bar Stools',
    price_ugx: 1250000,
    price_provisional: true,
    images: ['img/dinning 3.jpg'],
    description: 'Full-grain leather seat on a powder-coated frame. The leather will mark with use — that is intended; it will also deepen in character. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-bench-001',
    name: 'Upholstered Bench',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'benches',
    subcategoryLabel: 'Benches',
    price_ugx: 2350000,
    price_provisional: true,
    images: ['img/dinning 4.jpg'],
    description: 'Bench seating that adds flexibility to a dining room without requiring extra chairs. The upholstered seat pads for extended use. Solid frame, removable cover. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-chair-001',
    name: 'Leather Dining Chair',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    price_ugx: 1400000,
    price_provisional: true,
    images: ['img/dinning 5.jpg'],
    description: 'A dining chair built for the table, not the showroom. Slim profile, full-grain leather seat, solid wood frame with clean joinery. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-chair-002',
    name: 'Oak Wishbone Chair',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    price_ugx: 1200000,
    price_provisional: true,
    images: ['img/dinning 6.jpg'],
    description: 'The wishbone form in solid oak — clean lines, no padding, honest construction. Works equally at the dining table or at a desk. Dimensions and finish options available on request.',
    featured: true,
    stockImage: false
  },

  {
    id: 'dr-table-001',
    name: 'Round Oak Dining Table',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    price_ugx: 7750000,
    price_provisional: true,
    images: ['img/dinning 7.jpg'],
    description: 'A round table removes corners from the conversation — every seat is an equal position. The oak top is solid, not veneer. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-table-002',
    name: 'Extending Walnut Table',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    price_ugx: 9050000,
    price_provisional: true,
    images: ['img/DINING.jpg'],
    description: 'Extends to accommodate a larger group without changing the character of the room. The extension leaf stores within the table itself. Solid walnut throughout. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-drinks-001',
    name: 'Walnut Drinks Cabinet',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'drinks-cabinets',
    subcategoryLabel: 'Drinks Cabinets',
    price_ugx: 6200000,
    price_provisional: true,
    images: ['img/dinning 9.jpg'],
    description: 'A dedicated drinks cabinet in walnut with adjustable interior fittings for bottles and glassware. Closes cleanly when company has gone; the exterior gives nothing away. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'dr-sideboard-001',
    name: 'Ceramic Sideboard',
    category: 'dining-room',
    categoryLabel: 'Dining Room',
    subcategory: 'sideboards',
    subcategoryLabel: 'Sideboards',
    price_ugx: 5350000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80'],
    description: 'Ceramic panel inserts set into a hardwood frame — a surface that does not scratch or mark from objects placed on it. The combination of materials reads as considered rather than decorative. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  // ─────────────────────────────────────────────────────────────────
  // HOME OFFICE  (5 products)
  // ─────────────────────────────────────────────────────────────────

  {
    id: 'ho-desk-001',
    name: 'Office Desk',
    category: 'home-office',
    categoryLabel: 'Home Office',
    subcategory: 'desks',
    subcategoryLabel: 'Desks',
    price_ugx: 5200000,
    price_provisional: true,
    images: [
      'img/H.png', 'img/h (1).jpg', 'img/h (2).jpg', 'img/h (3).jpg'
    ],
    description: 'A straightforward writing desk with a solid top and clean understructure. No drawers to fill with paper — the surface is the thing. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'ho-desk-002',
    name: 'Adjustable Standing Desk',
    category: 'home-office',
    categoryLabel: 'Home Office',
    subcategory: 'desks',
    subcategoryLabel: 'Desks',
    price_ugx: 6850000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80'],
    description: 'Height-adjustable work surface that moves from seated to standing without interrupting the work. The mechanism is mechanical, not motorised, for long-term reliability. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'ho-shelf-001',
    name: 'Floating Shelf Unit',
    category: 'home-office',
    categoryLabel: 'Home Office',
    subcategory: 'shelves',
    subcategoryLabel: 'Shelves',
    price_ugx: 2300000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=600&q=80'],
    description: 'Wall-mounted shelving with concealed fixings — the shelf appears to sit in the wall rather than on it. Solid timber construction, load-bearing by design. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'ho-shelf-002',
    name: 'Modular Bookshelf',
    category: 'home-office',
    categoryLabel: 'Home Office',
    subcategory: 'shelves',
    subcategoryLabel: 'Shelves',
    price_ugx: 3650000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80'],
    description: 'Units connect horizontally and vertically to cover the full wall or stop at any point. Each module is finished on all sides for a freestanding option. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'ho-lamp-001',
    name: 'Brass Desk Lamp',
    category: 'home-office',
    categoryLabel: 'Home Office',
    subcategory: 'desk-lamps',
    subcategoryLabel: 'Desk Lamps',
    price_ugx: 900000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'],
    description: 'A weighted brass base with an adjustable arm and shade. Built to a standard where the bulb and driver are both user-replaceable. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  // ─────────────────────────────────────────────────────────────────
  // BEDROOM  (8 products)
  // ─────────────────────────────────────────────────────────────────

  {
    id: 'bd-bed-001',
    name: 'Platform Bed Frame',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    price_ugx: 6100000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'],
    description: 'Low platform frame in solid wood. No box spring required — the slat system supports the mattress directly and allows it to breathe. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'bd-bed-002',
    name: 'Linen Upholstered Bed',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    price_ugx: 7200000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80'],
    description: 'Linen headboard and frame that reads as furniture first, bedroom item second. The upholstery is removable for cleaning. Solid internal frame. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'bd-bedside-001',
    name: 'Bedside Table',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    price_ugx: 1250000,
    price_provisional: true,
    images: ['img/BD/ss7.png'],
    description: 'A single-drawer bedside table in solid hardwood. Small enough to work in any bedroom, built to outlast the mattress beside it. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'bd-bedside-002',
    name: 'Marble Top Bedside',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    price_ugx: 1550000,
    price_provisional: true,
    images: [
      'img/D2.jpg', 'img/D2 (1).jpg', 'img/D2 (2).jpg',
      'img/D2 (3).jpg', 'img/D2 (4).jpg'
    ],
    description: 'Solid hardwood carcassing with a honed marble top. The marble provides a heat- and scratch-resistant surface for bedside use. No two marble tops are identical. Dimensions and finish options available on request.',
    featured: true,
    stockImage: false
  },

  {
    id: 'bd-chest-001',
    name: 'Five-Drawer Chest',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'chest-drawers',
    subcategoryLabel: 'Chest of Drawers',
    price_ugx: 3650000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80'],
    description: 'Full-extension drawers with soft-close runners on a solid hardwood frame. Five drawers handle the full range of bedroom storage without requiring a wardrobe. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'bd-dressing-001',
    name: 'Linen Dressing Table',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    price_ugx: 3200000,
    price_provisional: true,
    images: ['https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80'],
    description: 'A dressing table in a linen-upholstered frame with a clear mirror. The surface is deep enough for the full morning routine. Dimensions and finish options available on request.',
    featured: false,
    stockImage: true
  },

  {
    id: 'bd-wardrobe-001',
    name: 'Wardrobe',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    price_ugx: 10350000,
    price_provisional: true,
    images: [
      'img/Y.png', 'img/Y (1).jpeg', 'img/Y (2).jpeg',
      'img/Y (4).jpg', 'img/Y (5).jpg'
    ],
    description: 'Floor-to-ceiling wardrobe with internal rail, shelving, and drawer configurations available on request. The exterior is clean — no visible hinges or hardware on the face. Name pending owner confirmation. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  },

  {
    id: 'bd-wardrobe-002',
    name: 'Wardrobe II',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    price_ugx: 11850000,
    price_provisional: true,
    images: [
      'img/Y2.png', 'img/Y2 (1).jpeg', 'img/Y2 (2).jpeg',
      'img/Y2 (3).jpeg', 'img/Y2 (4).jpeg', 'img/Y2 (5).jpeg',
      'img/Y2 (6).jpeg'
    ],
    description: 'A wider-format wardrobe with double-door opening and a dedicated full-length mirror panel. Internal layout confirmed at order. Name pending owner confirmation. Dimensions and finish options available on request.',
    featured: false,
    stockImage: false
  }

];

// Alias for backward compatibility with existing JS (main.js search, cart-ui.js)
window.PRODUCTS = window.DERIOR_PRODUCTS.map(function (p) {
  return {
    id:           p.id,
    name:         p.name,
    category:     p.categoryLabel,
    subcategory:  p.subcategoryLabel,
    price:        Math.round(p.price_ugx / 3700),
    priceDisplay: 'UGX ' + p.price_ugx.toLocaleString(),
    image:        p.images[0],
    url:          p.category + '.html#' + p.subcategory
  };
});
