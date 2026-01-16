// Home page for the API
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Seafood SKU Lookup API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #333; }
          a { color: #0070f3; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .example { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>🐟 Seafood SKU Lookup API</h1>
        <p>Welcome to the Seafood SKU Lookup API! This API helps you find SKUs for various seafood items.</p>

        <h2>Try it out:</h2>
        <div class="example">
          <a href="/api/sku/salmon">/api/sku/salmon</a>
        </div>
        <div class="example">
          <a href="/api/sku/tiger shrimp">/api/sku/tiger shrimp</a>
        </div>
        <div class="example">
          <a href="/api/sku/ahi">/api/sku/ahi</a> (alias for yellowfin tuna)
        </div>

        <h2>Usage:</h2>
        <p>GET <code>/api/sku/{fishName}</code></p>

        <h2>Available fish:</h2>
        <ul>
          <li>Salmon varieties (atlantic salmon, king salmon, coho salmon)</li>
          <li>Tuna varieties (yellowfin/ahi, bluefin)</li>
          <li>Shrimp varieties (white shrimp, tiger shrimp, pink shrimp)</li>
          <li>Cod, Halibut, Swordfish, Snapper, Mahi Mahi</li>
        </ul>
      </body>
    </html>
  `);
}
