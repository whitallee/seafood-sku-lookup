// Vercel serverless function for SKU lookup
const fishDatabase = [
  {
    sku: "SAL-001",
    names: ["atlantic salmon", "salmon", "norwegian salmon", "farm raised salmon"]
  },
  {
    sku: "SAL-002",
    names: ["king salmon", "chinook salmon", "chinook", "king"]
  },
  {
    sku: "SAL-003",
    names: ["coho salmon", "silver salmon", "coho", "silverbrite"]
  },
  {
    sku: "TUN-001",
    names: ["tuna", "yellowfin tuna", "yellowfin", "ahi tuna", "ahi"]
  },
  {
    sku: "TUN-002",
    names: ["bluefin tuna", "bluefin", "hon maguro"]
  },
  {
    sku: "COD-001",
    names: ["cod", "atlantic cod", "codfish"]
  },
  {
    sku: "HAL-001",
    names: ["halibut", "pacific halibut", "california halibut"]
  },
  {
    sku: "SWD-001",
    names: ["swordfish", "sword fish", "broadbill"]
  },
  {
    sku: "SNP-001",
    names: ["red snapper", "snapper", "northern red snapper"]
  },
  {
    sku: "MAH-001",
    names: ["mahi mahi", "mahi-mahi", "dolphin fish", "dorado"]
  },
  {
    sku: "SHR-001",
    names: ["white shrimp", "gulf white shrimp", "whites"]
  },
  {
    sku: "SHR-002",
    names: ["tiger shrimp", "black tiger shrimp", "tiger prawn"]
  },
  {
    sku: "SHR-003",
    names: ["pink shrimp", "gulf pink shrimp", "pinks"]
  }
];

function findSKU(fishName) {
  const searchTerm = fishName.toLowerCase().trim();

  for (const fish of fishDatabase) {
    for (const name of fish.names) {
      if (name.toLowerCase() === searchTerm) {
        return fish.sku;
      }
    }
  }

  return null;
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { fishName } = req.query;
  const sku = findSKU(fishName);

  if (sku) {
    res.status(200).json({
      fishName: fishName,
      sku: sku,
      found: true
    });
  } else {
    res.status(200).json({
      fishName: fishName,
      sku: null,
      found: false,
      message: 'Fish not found in database'
    });
  }
}
