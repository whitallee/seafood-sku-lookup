// Vercel serverless function for SKU lookup
// Embedded fish database - data is stored directly in the code to avoid file system reads on Vercel
const fishDatabase = [
  {
    sku: "52012",
    names: ["crawfish", "crayfish", "crawdads", "mudbugs", "freshwater lobster"]
  },
  {
    sku: "25766",
    names: ["corn", "corn on the cob", "sweet corn"]
  },
  {
    sku: "37372",
    names: ["potatoes", "potato", "spuds"]
  },
  {
    sku: "37031",
    names: ["mac and cheese large", "mac and cheese family size", "macaroni and cheese", "mac n cheese", "family mac"]
  },
  {
    sku: "25506",
    names: ["sausage", "andouille", "smoked sausage"]
  },
  {
    sku: "37484",
    names: ["garlic butter", "garlic butter dollops", "garlic butter sauce"]
  },
  {
    sku: "37658",
    names: ["butter scampi", "butter scampi 8ct", "butter scampi dollop", "butter scampi dollop 8ct", "scampi butter", "scampi sauce", "garlic scampi", "shrimp butter"]
  },
  {
    sku: "37064",
    names: ["korean bbq portion", "portion korean bbq", "korean bbq", "k-bbq"]
  },
  {
    sku: "25878",
    names: ["grilled shrimp party tray", "grilled shrimp party size", "grilled shrimp large", "party tray grilled shrimp"]
  },
  {
    sku: "25558",
    names: ["grilled shrimp tray", "grilled shrimp with blackened", "grilled shrimp with blackened sauce", "grilled shrimp blackened", "blackened shrimp", "grill shrimp blackened", "blackened sauce shrimp", "cajun grilled shrimp"]
  },
  {
    sku: "37736",
    names: ["grilled shrimp with buffalo sauce", "grilled shrimp buffalo", "buffalo shrimp", "grill shrimp buffalo", "buff shrimp", "spicy buffalo shrimp"]
  },
  {
    sku: "37089",
    names: ["seasoned shrimp tray", "seasoned shrimp party tray", "seasoned shrimp", "shrimp party tray", "seasoned tray", "party shrimp"]
  },
  {
    sku: "37246",
    names: ["lemon dill shrimp", "buttery lemon dill shrimp cocktail tray", "buttery lemon dill shrimp", "dill shrimp", "herb shrimp", "dill sauce shrimp", "dill flavored shrimp", "lemon herb shrimp"]
  },
  {
    sku: "37618",
    names: ["shrimp scampi", "scampi shrimp", "garlic shrimp scampi"]
  },
  {
    sku: "37190",
    names: ["shrimp cocktail tray family size", "shrimp cocktail family size", "shrimp cocktail large", "large cocktail shrimp", "family shrimp cocktail"]
  },
  {
    sku: "37240",
    names: ["chesapeake shrimp cocktail", "chesapeake shrimp", "chesapeake seasoned", "old bay shrimp"]
  },
  {
    sku: "37513",
    names: ["jumbo pico breaded shrimp", "pico shrimp", "breaded pico shrimp", "pico de gallo shrimp"]
  },
  {
    sku: "37371",
    names: ["coconut shrimp", "shrimp jumbo coconut", "shrimp coconut", "breaded coconut shrimp"]
  },
  {
    sku: "37477",
    names: ["coconut shrimp family size", "coconut shrimp large", "shrimp jumbo coconut family size", "coconut shrimp family", "big coconut shrimp", "family coconut"]
  },
  {
    sku: "37874",
    names: ["imitation crab", "imitation snow crab cocktail tray", "imitation snow crab tray", "imitation crab tray", "fake crab tray", "crab imitation", "seafood tray", "krab", "surimi crab"]
  },
  {
    sku: "37876",
    names: ["imitation shrimp tray", "imitation crab and shrimp cocktail tray", "imitation seafood combo", "fake seafood tray"]
  },
  {
    sku: "37828",
    names: ["oyster rockefeller", "oyster rockefeller bacon", "rockefeller oyster", "fancy oysters", "baked oyster", "oysters rockefeller"]
  },
  {
    sku: "45240",
    names: ["shrimp salad", "seafood shrimp salad"]
  },
  {
    sku: "37650",
    names: ["seafood salad", "mixed seafood salad", "seafood mix salad"]
  },
  {
    sku: "25194",
    names: ["colossal tiger shrimp", "tiger shrimp", "colossal shrimp", "black tiger prawns", "giant tiger shrimp"]
  },
  {
    sku: "37922",
    names: ["colossal white shrimp", "white shrimp colossal", "jumbo white shrimp"]
  },
  {
    sku: "37191",
    names: ["argentine shrimp", "argentina shrimp", "red shrimp", "argentine red shrimp"]
  },
  {
    sku: "25259",
    names: ["black tiger shrimp", "tiger prawns", "black tigers"]
  },
  {
    sku: "25134",
    names: ["texas raw large shrimp", "raw shrimp texas", "large raw shrimp"]
  },
  {
    sku: "37287",
    names: ["texas raw jumbo shrimp", "jumbo raw shrimp texas", "raw jumbo shrimp"]
  },
  {
    sku: "37621",
    names: ["atlantic salmon", "salmon", "plain salmon", "salmon fillet", "regular salmon", "fresh salmon", "salmon portion"]
  },
  {
    sku: "25178",
    names: ["salmon texas size", "texas size salmon", "large salmon", "texas salmon"]
  },
  {
    sku: "25441",
    names: ["salmon center cut", "center cut salmon", "salmon center", "premium salmon cut"]
  },
  {
    sku: "37234",
    names: ["fiesta salmon burger", "salmon burger fiesta", "salmon burger fiesta tp", "fiesta burger", "salmon fiesta", "spicy salmon burger", "mexican salmon burger"]
  },
  {
    sku: "37236",
    names: ["cranberry salmon burger", "salmon burger cranberry", "cranberry burger", "cran salmon", "berry salmon burger", "holiday burger"]
  },
  {
    sku: "37533",
    names: ["basil pesto salmon", "pesto salmon", "basil salmon", "italian salmon"]
  },
  {
    sku: "37534",
    names: ["chipotle lime salmon", "chipotle lime salmon portion", "chipotle salmon", "lime salmon", "spicy lime salmon"]
  },
  {
    sku: "37885",
    names: ["honey garlic salmon", "honey salmon", "garlic honey salmon", "sweet garlic salmon"]
  },
  {
    sku: "37887",
    names: ["jalapeño salmon", "salmon jalapeño center cut", "salmon center cut smoky jalapeño", "jalapeno salmon", "spicy salmon", "jalapeño center cut"]
  },
  {
    sku: "37170",
    names: ["organic salmon", "organic", "healthy salmon", "organic atlantic salmon", "organic farmed salmon"]
  },
  {
    sku: "37826",
    names: ["orange salmon", "orange marinated salmon", "cedar plank orange", "citrus salmon", "sweet salmon", "orange glaze", "orange glazed salmon"]
  },
  {
    sku: "25220",
    names: ["steelhead trout", "steelhead", "ocean trout", "steelhead salmon"]
  },
  {
    sku: "25344",
    names: ["steelhead trout texas size", "steelhead texas size", "large steelhead", "texas steelhead"]
  },
  {
    sku: "25044",
    names: ["red rainbow trout", "rainbow trout", "red trout"]
  },
  {
    sku: "25103",
    names: ["whole rainbow trout", "rainbow trout whole", "trout whole"]
  },
  {
    sku: "25726",
    names: ["aji tuna", "yellowfin tuna", "ahi tuna", "yellowfin"]
  },
  {
    sku: "25925",
    names: ["chilean sea bass", "sea bass", "patagonian toothfish", "chilean bass"]
  },
  {
    sku: "25061",
    names: ["flounder", "summer flounder", "fluke"]
  },
  {
    sku: "37438",
    names: ["cheddar cod with green beans", "cod with green bean", "cod with green beans", "potato cheddar with green beans", "cheese cod green beans"]
  },
  {
    sku: "25710",
    names: ["whole red snapper", "red snapper whole", "whole snapper"]
  },
  {
    sku: "25082",
    names: ["whole atlantic salmon", "atlantic salmon whole", "whole salmon"]
  },
  {
    sku: "25046",
    names: ["whole mahi mahi", "mahi mahi whole", "whole mahi", "whole dolphin fish", "whole dorado"]
  },
  {
    sku: "25666",
    names: ["whole monkfish", "monkfish whole", "whole monk"]
  },
  {
    sku: "25072",
    names: ["whole texas hybrid striped bass", "striped bass whole", "whole hybrid bass", "texas striped bass"]
  },
  {
    sku: "25014",
    names: ["whole texas redfish", "redfish whole", "whole red drum", "texas redfish"]
  },
  {
    sku: "37518",
    names: ["whole whiting", "whiting whole", "whole silver hake"]
  },
  {
    sku: "25362",
    names: ["whole barramundi", "barramundi whole", "whole asian sea bass", "whole barra"]
  },
  {
    sku: "37554",
    names: ["whole sablefish", "sablefish whole", "whole black cod"]
  },
  {
    sku: "37607",
    names: ["whole colombian river sockeye salmon", "sockeye whole", "whole sockeye", "colombian sockeye"]
  },
  {
    sku: "37519",
    names: ["whole black sea bass", "black sea bass whole", "whole sea bass"]
  },
  {
    sku: "37521",
    names: ["whole bluefish", "bluefish whole"]
  },
  {
    sku: "37134",
    names: ["whole alaskan coho salmon", "coho salmon whole", "whole coho", "alaskan coho", "whole silver salmon"]
  },
  {
    sku: "25467",
    names: ["american red snapper head", "snapper head", "red snapper head", "fish head"]
  },
  {
    sku: "25738",
    names: ["whole buffalo fish", "buffalo fish whole", "whole buffalofish"]
  },
  {
    sku: "25772",
    names: ["whole haddock", "haddock whole"]
  },
  {
    sku: "25744",
    names: ["west coast whole flounder", "whole flounder west coast", "pacific flounder"]
  },
  {
    sku: "25817",
    names: ["whole texas catfish", "texas catfish whole", "whole catfish texas"]
  },
  {
    sku: "37139",
    names: ["whole european sea bass", "european sea bass whole", "whole branzino", "branzino"]
  },
  {
    sku: "37353",
    names: ["whole scored tilapia", "scored tilapia", "tilapia scored", "whole tilapia"]
  },
  {
    sku: "25663",
    names: ["whole alaskan halibut", "halibut whole", "alaskan halibut whole", "whole halibut"]
  },
  {
    sku: "37393",
    names: ["whole ocean perch", "ocean perch whole", "whole perch"]
  },
  {
    sku: "25958",
    names: ["whole farm king salmon", "king salmon whole", "whole king salmon", "whole chinook salmon"]
  },
  {
    sku: "25739",
    names: ["whole jumbo catfish", "jumbo catfish whole", "large catfish whole"]
  },
  {
    sku: "25798",
    names: ["whole catfish", "catfish whole"]
  },
  {
    sku: "25701",
    names: ["catfish", "catfish fillet", "catfish portion"]
  },
  {
    sku: "37349",
    names: ["whole swordfish", "swordfish whole", "whole broadbill"]
  },
  {
    sku: "37350",
    names: ["whole atlantic cod", "atlantic cod whole", "whole cod"]
  },
  {
    sku: "25742",
    names: ["whole black drum", "black drum whole"]
  },
  {
    sku: "25094",
    names: ["red grouper", "grouper", "red grouper fillet"]
  },
  {
    sku: "37517",
    names: ["whole mackerel", "mackerel whole"]
  },
  {
    sku: "37443",
    names: ["whole rockfish", "rockfish whole", "whole striped bass"]
  },
  {
    sku: "37352",
    names: ["whole amberjack", "amberjack whole"]
  },
  {
    sku: "25214",
    names: ["whole octopus", "octopus whole", "whole tako"]
  },
  {
    sku: "25260",
    names: ["caribbean lobster", "spiny lobster", "warm water lobster", "rock lobster"]
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
