// ============================================================
// Japan Fall Trip 2026 — trip data
// Sourced from: Japan_Fall_Trip_-_Hotel_Reservations.pdf,
// Booking_information-_car_rental.pdf, Japan_2026_Trip_Budget_Summary.pdf,
// and the planning-chat docs uploaded to this project.
// Edit this file (or just tell Claude what changed) to update the site.
// ============================================================

const TRIP = {
  travelers: "Doritte & Rick",
  start: "2026-09-25",
  end: "2026-11-03",
  diet: "Pescatarian — fish & seafood yes, meat & poultry no. Flag this at every property on arrival.",
  passwordHint: "Ask Doritte or Rick"
};

// Each stay: destination, hotel name, check-in/out (ISO), nights, address, phone, total USD, coords, notes
const HOTELS = [
  {
    dest: "Kyoto", hotel: "Minn Nijo-jo", checkin: "2026-09-25", checkout: "2026-10-03", nights: 8,
    address: "17-1 Shinsenencho, Nakagyo-ku, Kyoto", phone: "+81 50-3627-5213", total: 1750,
    lat: 35.0117, lng: 135.7444,
    notes: "First 8 nights of Kyoto, near Nijo Castle."
  },
  {
    dest: "Kyoto", hotel: "Nazuna Kyoto Nishi Honganji", checkin: "2026-10-03", checkout: "2026-10-05", nights: 2,
    address: "228-2 Bukuguyacho, Shimogyo-ku, Kyoto", phone: "+81 75-585-2810", total: 1590,
    lat: 34.9928, lng: 135.7530,
    notes: "Final 2 Kyoto nights — a ryokan-style close to the Kyoto leg before the drive north."
  },
  {
    dest: "Kanazawa", hotel: "Mitsui Garden Hotel Kanazawa", checkin: "2026-10-05", checkout: "2026-10-07", nights: 2,
    address: "1-22 Kamitsutsumi-cho, Kanazawa, Ishikawa", phone: "+81 76-263-5531", total: 387,
    lat: 36.5652, lng: 136.6559,
    notes: "Top-floor public bath looks toward Kanazawa Castle Park and Kenrokuen."
  },
  {
    dest: "Takayama", hotel: "Takayama Green Hotel (Keio)", checkin: "2026-10-07", checkout: "2026-10-09", nights: 2,
    address: "2-180 Nishino-isshiki, Takayama, Gifu", phone: "+81 577-33-5500", total: 700,
    lat: 36.1408, lng: 137.2519,
    notes: "One hotel dinner here is worth it — Hida beef / regional set menu."
  },
  {
    dest: "Hirayu Onsen", hotel: "Hodakaso Yamano Hotel", checkin: "2026-10-09", checkout: "2026-10-11", nights: 2,
    address: "577-13 Okuhida Onsengo Kansaka, Takayama", phone: "+81 578-892-004", total: 800,
    lat: 36.2072, lng: 137.5814,
    notes: "Inform the hotel if arriving after 18:00 — dinner may not be served. Eat both dinners at the hotel; evening options nearby are limited."
  },
  {
    dest: "Matsumoto", hotel: "Matsumoto Hotel Kagetsu", checkin: "2026-10-11", checkout: "2026-10-13", nights: 2,
    address: "4-8-9 Ote, Matsumoto, Nagano", phone: "+81 263-32-0114", total: 710,
    lat: 36.2380, lng: 137.9720,
    notes: "Reserve at least one of the two Matsumoto dinners; keep the other casual."
  },
  {
    dest: "Shiojiri / Narai", hotel: "La Terra Resort", checkin: "2026-10-13", checkout: "2026-10-14", nights: 1,
    address: "4045-1 Senba, Shiojiri City, Nagano", phone: "+81 263-52-7000", total: 470,
    lat: 36.1103, lng: 137.9530,
    notes: "For an October stay, request the cabin with the private outdoor tub rather than a main-building room."
  },
  {
    dest: "Kiso Valley", hotel: "Ryori Ryokan Shikanoyu", checkin: "2026-10-14", checkout: "2026-10-16", nights: 2,
    address: "Ena, Gifu Prefecture (details in confirmation)", phone: "Via booking confirmation", total: 591,
    lat: 35.5333, lng: 137.4167,
    notes: "Nakasendo Magome–Tsumago hike booked for Oct 15 ($300)."
  },
  {
    dest: "Gujo Hachiman", hotel: "Miharaya Ryokan", checkin: "2026-10-16", checkout: "2026-10-17", nights: 1,
    address: "266 Hachimancho Yanagimachi, Gujo, Gifu", phone: "+81 575-65-3348", total: 192,
    lat: 35.7167, lng: 136.9583,
    notes: "One-night reset between the mountains and the coast — canal-town wandering, no big sightseeing agenda."
  },
  {
    dest: "Ise-Shima", hotel: "Nemu Resort Hotel Nemu", checkin: "2026-10-17", checkout: "2026-10-19", nights: 2,
    address: "2692-3 Hazako, Hamajima-cho, Shima City, Mie", phone: "+81 599-52-1211", total: 492,
    lat: 34.3350, lng: 136.7986,
    notes: "Meals currently booked for 3 guests — confirm this is intentional, or amend headcount. Ise Grand Shrine guided walk booked Oct 18 ($220). Eat dinner at the resort both nights, not in town."
  },
  {
    dest: "Kumano", hotel: "Minamino Fields Fudozaka Cottage", checkin: "2026-10-19", checkout: "2026-10-22", nights: 3,
    address: "1227 Minamihirano, Nachikatsuura, Wakayama", phone: "Contact via Booking.com", total: 334,
    lat: 33.6167, lng: 135.9333,
    notes: "Self-catering cottage, no meals — plan a serious grocery stop before driving up. Contact the host in advance with your arrival time; check-in window is 15:00–17:00."
  },
  {
    dest: "Koyasan", hotel: "Koyasan Syukubou Fudouin", checkin: "2026-10-22", checkout: "2026-10-24", nights: 2,
    address: "Koyasan 456, Koya Town, Wakayama", phone: "+81 736-562-414", total: 1220,
    lat: 34.2125, lng: 135.5936,
    notes: "Meals currently booked for 3 guests — amend to 2 before the free-cancellation deadline of Oct 7, 2026, if it's just the two of you."
  },
  {
    dest: "Kurashiki", hotel: "Kurashiki Ivy Square", checkin: "2026-10-24", checkout: "2026-10-25", nights: 1,
    address: "7-2 Honmachi, Kurashiki, Okayama", phone: "+81 86-422-0011", total: 300,
    lat: 34.5967, lng: 133.7717,
    notes: "One night before the ferry crossing to Naoshima. To reach Naoshima: train/taxi from Kurashiki to Uno Port (~30 min), then the ferry."
  },
  {
    dest: "Naoshima", hotel: "UOGASHI 7070 Ocean View", checkin: "2026-10-25", checkout: "2026-10-28", nights: 3,
    address: "2193-2 Miyanoura, Naoshima, Kagawa", phone: "Contact details in confirmation", total: 865,
    lat: 34.4597, lng: 133.9967,
    notes: "3 nights gives room for a Teshima side trip. Request upgrading to a sea-view / annex room for the torii gate views and a private bathroom."
  },
  {
    dest: "Miyajima", hotel: "Kinsuikan", checkin: "2026-10-28", checkout: "2026-10-29", nights: 1,
    address: "1133 Miyajima-cho, Hatsukaichi, Hiroshima", phone: "+81 829-44-2131", total: 880,
    lat: 34.2960, lng: 132.3196,
    notes: "One night on the island."
  },
  {
    dest: "Hiroshima", hotel: "Sheraton Grand Hiroshima", checkin: "2026-10-29", checkout: "2026-10-30", nights: 1,
    address: "12-1 Wakakusa-cho, Higashi-ku, Hiroshima", phone: "+81 82-262-7111", total: 383,
    lat: 34.3963, lng: 132.4756,
    notes: "Peace Memorial Museum is the natural anchor for this stop."
  },
  {
    dest: "Tokyo", hotel: "Dai-ichi Hotel Tokyo", checkin: "2026-10-30", checkout: "2026-11-03", nights: 4,
    address: "1-2-6 Shimbashi, Minato-ku, Tokyo", phone: "+81 3-3501-4411", total: 1595,
    lat: 35.6669, lng: 139.7592,
    notes: "4-5 nights makes up for a rushed Tokyo last time. Guided Omotesando/Aoyama architecture tour booked for Oct 31 (VietnamStay/Lily) — Prada Aoyama, Nezu Museum, 21_21 DESIGN SIGHT. Last day (Nov 3) is kept deliberately open as a rest day before flying home."
  }
];

// Flights — add each confirmed leg here as you get them.
const FLIGHTS = [
  {
    route: "Tel Aviv (TLV) → Tokyo Narita (NRT)",
    flightNo: "LY91 (El Al, Dreamliner)",
    bookingRef: "ZE7M8J",
    cabin: "Premium Economy (Q)",
    stops: "Direct",
    status: "Confirmed",
    depAirport: "TLV", depDateTime: "2026-11-03T19:00:00",
    arrAirport: "NRT", arrDateTime: "2026-11-04T13:25:00",
    duration: "11h 25m",
    flag: "The ticket's own numbers (an 11h25m flight, TLV at UTC+2 in November, NRT at UTC+9) only resolve to the exact minute one way: departing Tel Aviv 19:00 on Nov 3 and landing Narita 13:25 on Nov 4. That makes this look like an outbound TLV→NRT flight rather than the Tokyo→Tel Aviv return — worth confirming which leg this actually is, since it currently lands a day after your Tokyo hotel checkout (Nov 3)."
  }
];
// Return leg (Tokyo -> Tel Aviv) not added yet — drop in the confirmation when you have it.

const CAR = {
  company: "ORIX (booked via Klook)",
  bookingNo: "JQC448833",
  vehicle: "Toyota Prius Hybrid or similar (mid-size, 5 seats, 2 suitcases, automatic, A/C)",
  pickupLocation: "Kyoto Station Shichijo Horikawa Store",
  pickupAddress: "389 Munkaku-cho, Higashi-Nakasuji, Kyoto",
  pickupPhone: "075-744-6153",
  pickupDateTime: "2026-10-05T10:00:00",
  dropoffLocation: "Shin-Osaka Store",
  dropoffPhone: "06-6399-0543",
  fuelPolicy: "Full to full",
  mileage: "Unlimited mileage",
  insurance: "Enhanced Plus — Collision Damage Waiver (¥0 excess), Third-Party Liability (¥0 excess), Non-operation Charge (¥0 excess)",
  payment: "US$1,604.45 paid online; ¥260,260 due at the store",
  cancellation: "Free cancellation before 28 Sep 2026 10:00 (local time) — booking becomes non-amendable after that",
  driver: "Rick (age 78) — 1 free extra driver included, free GPS included",
  flag: "Earlier planning notes mention picking the car up in Kanazawa — the confirmed Klook booking is Kyoto Station on Oct 5, dropping off at Shin-Osaka. Going with the confirmed booking; worth a final glance to be sure nothing changed since."
};

const BUDGET = {
  total: 26590,
  currency: "USD",
  rows: [
    ["Accommodation (39 nights, 17 properties)", 14040],
    ["Tours & guided activities", 6000],
    ["Car rental (19 days, incl. ETC card)", 1750],
    ["Travel insurance (both travelers)", 2300],
    ["Phones (SIM/eSIM or rental)", 1000],
    ["Tips", 300],
    ["~20 light dinners not covered by hotel rates", 1200]
  ],
  tours: [
    ["Kanazawa Night Walking Tour", "Oct 6", 75],
    ["Nakasendo Magome–Tsumago Hike", "Oct 15", 300],
    ["Ise Grand Shrine guided walk", "Oct 18", 220],
    ["Kyoto x4 + Tokyo x1 guided package", "Sep 27, 28, 29, Oct 2, Oct 31", 4666]
  ],
  notIncluded: [
    "International Driving Permit fee",
    "Fuel / tolls beyond the ETC card",
    "Remaining independent dinners not yet finalized",
    "Incidental entrance fees on free/unplanned days",
    "Souvenirs and personal expenses"
  ],
  note: "Prepared Aug 2, 2026 — figures reflect confirmed bookings plus rounded estimates. Excludes the separate ~3-week Vietnam trip."
};

const REMINDERS = [
  { text: TRIP.diet, flag: false },
  { text: "Nemu Resort Hotel Nemu (Ise-Shima) and Koyasan Syukubou Fudouin both show meals booked for 3 guests — confirmed it's just the two of you traveling, so this is likely a hotel-side booking mistake. Not urgent to fix, but worth a heads-up to the properties so breakfast isn't over-set.", flag: false },
  { text: "Car rental: confirmed pickup is Kyoto Station on Oct 5, drop-off Shin-Osaka on Oct 24 — earlier notes mentioning a Kanazawa pickup are outdated.", flag: true },
  { text: "Israeli passport holders don't need a visa for Japan for stays up to 90 days — this trip is well within that. Just make sure passports are valid 6+ months beyond Nov 3, 2026, and be ready to show proof of onward/return travel at immigration.", flag: false },
  { text: "Driving in Japan requires an International Driving Permit (IDP) — this has to be obtained in Israel before you fly (from the Ministry of Transport / a licensing bureau), it cannot be arranged in Japan. This isn't yet in the budget as a line item beyond the placeholder — get this sorted well before Oct 5.", flag: true },
  { text: "The uploaded flight ticket (ref ZE7M8J) works out to Tel Aviv → Narita, departing Nov 3 at 19:00 and landing Nov 4 at 13:25 — see the flag on the Flights tab. Worth confirming this is the leg you meant to add, and the return (Tokyo → Tel Aviv) is still needed.", flag: true },
  { text: "This site is hosted on GitHub Pages, which is technically public even behind the password screen. Passport numbers are now on the Crew tab — same trade-off you accepted for the Vietnam site, flagging it again here since it's new data.", flag: true },
  { text: "Travel insurance: policy numbers and emergency-assistance line to be added once you send them over.", flag: false },
  { text: "Kinsuikan (Miyajima): consider upgrading to a sea-view / annex room for torii gate views and a private bathroom.", flag: false },
  { text: "UOGASHI 7070 (Naoshima) and Minamino Fields Fudozaka (Kumano): contact hosts in advance with your arrival time.", flag: false },
  { text: "La Terra Resort (Shiojiri/Narai): request the cabin with the private outdoor tub rather than a main-building room for an October stay.", flag: false },
  { text: "Uno Port ferry to Naoshima: train or taxi from Kurashiki to Uno Port (~30 min), then the ferry across.", flag: false },
  { text: "Hodakaso Yamano Hotel (Hirayu Onsen): inform the property if arriving after 18:00 — dinner may not be served.", flag: false }
];

const CREW = [
  {
    name: "Doritte", role: "Trip planner",
    passport: { country: "Israel", fullName: "Doritte Yael Hoek", number: "39055920", expiry: "2036-05-13" }
  },
  {
    name: "Rick", role: "Driver (age 78 — listed on the car rental)",
    passports: [
      { country: "Israel", fullName: "Richard Neil Borenstein", number: "36330282", expiry: "2032-08-22" },
      { country: "United States", fullName: "Richard Neil Borenstein", number: "566006902", expiry: "2028-07-05" }
    ]
  }
];

const CONNECTIVITY = "Data plans: keeping home phone numbers, adding a local data plan through your home carrier (not a separate Japan eSIM/rental).";

const TOUR_OPERATOR = {
  company: "VietnamStay (same operator as the Vietnam leg)",
  bookingCode: "SO851003",
  designer: "Lily — +84 982 893 692",
  hotline: "+84 985 459 921",
  clients: "Doritte Hoek + 1 (2 total), Israeli nationality",
  period: "25 Sep – 3 Nov 2026",
  price: "US$2,333/person (land services, after 3% returning-client discount) — US$4,666 total for 2, matching the budget's guided-package line",
  note: "Confirmed day tours below. International flight details still need to go to VietnamStay for airport transfer arrangements."
};

// Narrative day notes, keyed by ISO date, pulled from the planning-chat docs.
// Days without an entry just show the hotel/location — that's expected for legs
// that haven't been mapped out yet.
const DAY_NOTES = {
  "2026-09-27": "Guided tour (VietnamStay/Lily) — Nanzen-ji, Aqueduct & Japanese Gardens: Nanzen-ji Temple and Sanmon Gate, the Meiji-era Suirokaku Aqueduct, Murin-an Garden, a walk along the Keage Incline, and Shoren-in Temple. English-speaking guide, private Alphard vehicle, 10 hours.",
  "2026-09-28": "Guided tour (VietnamStay/Lily) — Antique Streets, Gion & Machiya Architecture: Shinmonzen and Furumonzen antique streets, Gion Shirakawa and Tatsumi Bridge, machiya townhouse architecture, and Kennin-ji Temple (Twin Dragons ceiling). English-speaking guide, private Alphard vehicle, 10 hours.",
  "2026-09-29": "Guided tour (VietnamStay/Lily) — Nishijin Textiles & Kamishichiken: Nishijin textile district and workshop (silk dyeing/weaving demonstration), Kamishichiken geisha district, then free time. Half-day, English-speaking guide, private Alphard vehicle.",
  "2026-10-02": "Guided tour (VietnamStay/Lily) — Uji Tea Culture & Byodo-in: Fukujuen tea visit covering cultivation and processing, a matcha stone-mill grinding experience, Byodo-in Temple (Phoenix Hall & Hoshokan Museum), and a walk along the Uji River. English-speaking guide, private Alphard vehicle, 10 hours.",
  "2026-10-05": "Rental car pickup at Kyoto Station, ~8:30–9:00 AM — confirm ETC card, English GPS/CarPlay, and fuel type before leaving the lot. Drive to Kanazawa (allow 4–4.5 hrs with stops). Evening: check in at Mitsui Garden Hotel, light walk around Kanazawa Castle Park / Oyama Shrine, dinner out in town.",
  "2026-10-06": "Kanazawa Night Walking Tour booked ($75). Suggested plan: Kenrokuen early (~7:30–8:00 AM) before crowds, then Kanazawa Castle Park, lunch at Omicho Market, one craft/samurai-district stop in the afternoon.",
  "2026-10-07": "Drive Kanazawa → Shirakawa-go (~2.5–3 hrs there) → Takayama. Shirakawa-go: observation viewpoint, village lanes, one gassho-zukuri house interior. Check in at Takayama Green Hotel, early walk through Sanmachi Suji old town.",
  "2026-10-08": "Takayama full day — Miyagawa morning market and old town before crowds build, then Hida Folk Village or Hida Furukawa in the afternoon.",
  "2026-10-09": "Transition to Hirayu Onsen / Kamikochi. Keep it light — scenic drive, no forced sightseeing.",
  "2026-10-11": "Transition Hirayu → Matsumoto. Check into Matsumoto Hotel Kagetsu, visit Matsumoto Castle if energy allows (timed-entry tickets), light walk on Nawate/Nakamachi Street, reserved dinner in town.",
  "2026-10-12": "Matsumoto full day — castle grounds and old streets if not done the day before, then pick one: Matsumoto City Museum of Art, the Folkcraft Museum, or the former Kaichi School. Deliberately slow afternoon.",
  "2026-10-13": "Transition to Shiojiri/Narai — La Terra Resort.",
  "2026-10-14": "Transition to Kiso Valley — Ryori Ryokan Shikanoyu.",
  "2026-10-15": "Nakasendo Magome–Tsumago hike booked ($300).",
  "2026-10-16": "Transition to Gujo Hachiman — Miharaya Ryokan. Canal-town wandering, easy dinner.",
  "2026-10-17": "Drive Gujo Hachiman → Ise-Shima (plan on ~3 hrs before sightseeing, longer with stops). Visit Ise Jingu Geku (Outer Shrine) in the afternoon, then settle into NEMU Resort. Dinner at the resort.",
  "2026-10-18": "Ise Grand Shrine guided walk booked ($220) — Ise Jingu Naiku (Inner Shrine) early, then Oharai-machi / Okage Yokocho for lunch. Afternoon: Yokoyama Observatory / Ago Bay for the classic Ise-Shima coastal view.",
  "2026-10-19": "Drive to Kumano — Minamino Fields Fudozaka cottage. Grocery stop essential; no meals at the cottage.",
  "2026-10-22": "Drive to Koyasan — Koyasan Syukubou Fudouin (temple lodging).",
  "2026-10-24": "Drive to Kurashiki — Kurashiki Ivy Square, one night before the ferry to Naoshima.",
  "2026-10-25": "Ferry from Uno Port to Naoshima (~30 min crossing). Check into UOGASHI 7070.",
  "2026-10-28": "Ferry/travel to Miyajima — Kinsuikan.",
  "2026-10-29": "Miyajima → Hiroshima — Sheraton Grand Hiroshima. Peace Memorial Museum likely anchor for the day.",
  "2026-10-30": "Hiroshima → Tokyo — Dai-ichi Hotel Tokyo, 4 nights.",
  "2026-10-31": "Guided tour (VietnamStay/Lily) — Omotesando & Aoyama Architecture: architectural walk through Omotesando/Aoyama, Prada Aoyama (Herzog & de Meuron), Nezu Museum (Kengo Kuma, bamboo approach & garden), 21_21 DESIGN SIGHT (Tadao Ando), Tokyo Midtown design district. English-speaking guide, private Alphard vehicle, 10 hours.",
  "2026-11-03": "Rest day — departure. Last day of the trip, kept deliberately open before flying home."
};
