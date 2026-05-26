# Supplements Shop

Static supplements and equipment catalog with a client-side cart. Data is loaded from JSON files and rendered with vanilla JavaScript.

## Structure
- `index.html` - supplements catalog
- `equipment.html` - equipment catalog
- `app.js` / `equipment.js` / `cart.js` - UI logic
- `image/` - product images
- `*.json` - product data

## Run locally
From the project folder:
```bash
python -m http.server 8000
```
Open http://localhost:8000/ and navigate between Supplements and Equipments.

## Notes
- This is a static site (no backend).
- Shopping cart state is stored in `localStorage`.
