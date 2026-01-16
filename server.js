const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load fish database
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Function to find SKU by fish name or alias
function findSKU(fishName) {
  const searchTerm = fishName.toLowerCase().trim();

  for (const fish of data.fishDatabase) {
    for (const name of fish.names) {
      if (name.toLowerCase() === searchTerm) {
        return fish.sku;
      }
    }
  }

  return null;
}

// API endpoint to lookup SKU
app.get('/api/sku/:fishName', (req, res) => {
  const fishName = req.params.fishName;
  const sku = findSKU(fishName);

  if (sku) {
    res.json({
      fishName: fishName,
      sku: sku,
      found: true
    });
  } else {
    res.json({
      fishName: fishName,
      sku: null,
      found: false,
      message: 'Fish not found in database'
    });
  }
});

// Home route for testing
app.get('/', (req, res) => {
  res.send(`
    <h1>Seafood SKU Lookup API</h1>
    <p>Try: <a href="/api/sku/salmon">/api/sku/salmon</a></p>
    <p>Try: <a href="/api/sku/tiger%20shrimp">/api/sku/tiger shrimp</a></p>
    <p>Try: <a href="/api/sku/ahi">/api/sku/ahi</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`Seafood SKU API running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/sku/salmon`);
});
