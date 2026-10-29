# KFC Clone Frontend

React frontend for the KFC clone. This README explains where product photos are stored, how they are selected, and which files handle the image display.

## Run the app

Open a terminal in `frontend/kfc-app` and run:

```sh
npm install
npm start
```

The development site opens at `http://localhost:3000`. To create a production build, run `npm run build`.

## Product image matching

Product names are matched to local photos in `src/utils/ProductImage.jsx`. The supplied image files are stored in `src/assets/png` and are bundled with the app, so product photos do not depend on the old external KFC image host.

When a product's online image fails, `ProductImage` displays the local photo mapped to that product title. If a title has no local mapping, the image is hidden instead of showing an unrelated fallback. Product titles must match the keys in the map exactly.

| Product title | Local image |
| --- | --- |
| Bucket for Two | `bucket-for-two.png` |
| Classic Biryani Combo | `classic-biryani-combo.png` |
| Classic Chicken Biryani Bucket | `classic-chicken-biryani-bucket.png` |
| Pepsi Black Can 330 ml | `pepsi-black-can-330ml.png` |
| Mingles Bucket Meal | `mingles-bucket-meal.jpg` |
| 10pc Strips with Nashville Sauce | `nashville-strips.jpg` |
| Single Chicken Roll | `chicken-roll.jpg` |
| Single Roll Combo for 1 | `single-roll-combo.jpg` |
| Double Chicken Roll | `double-chicken-roll.jpg` |
| Double Roll Combo for 1 | `double-chicken-roll.jpg` |
| 5pc Smoky Red Chicken | `smoky-red-chicken.jpg` |
| 1 pc Smoky Red Chicken | `single-smoky-red-chicken.jpg` |
| Zinger Tandoori Box | `tandoori-zinger-box.jpg` |
| Veg Zinger Box | `zinger-box.jpg` |
| 2 Veg Krispers Meal | `two-veg-krispers.jpg` |
| Mixed Zinger Doubles | `mixed-zinger-doubles.jpg` |
| Veg Zinger Burger | `mixed-zinger-doubles.jpg` |
| Choco Mud Pie | `choco-mud-pie.jpg` |
| Chick’n Wings Combo | `chickn-wings-combo.jpg` |
| Family Feast | `family-feast.jpg` |
| Large Fries | `large-fries.jpg` |
| Large Popcorn | `large-popcorn.jpg` |
| Regular Popcorn | `regular-popcorn.jpg` |

Some supplied photos are also used for closely related menu items, such as the double-roll photo for both the Double Chicken Roll and Double Roll Combo. The Veg Zinger Burger uses the supplied burger photo as requested.

## Image-related files

- `src/utils/ProductImage.jsx` imports local images and selects one by product title. It also handles failed image loads.
- `src/SliderData.json` contains the local featured, favorites, and quick-bites product data used on the homepage.
- `src/utils/getdata.js` requests menu products from the API and falls back to matching items in `SliderData.json` if the menu request fails.
- `src/home_components/Featured.jsx`, `Favorites.jsx`, and `QuickBites.jsx` render homepage product cards.
- `src/menu_components/Item.jsx`, `SingleItem.jsx`, and `Reccom.jsx` render menu, product-detail, and recommendation images.
- `src/cart_components/Cartproduct.jsx` renders product photos in the cart.
- `src/pages/Home.jsx` renders the homepage banners and food imagery.
- `src/menu_components/item.module.css` sizes the cart icon in product buttons.
- `src/reportWebVitals.js` provides the performance-reporting module imported by `src/index.js`.
- `frontend/snapshots/` holds the supplied source photos. Their app-ready copies are in `src/assets/png`.

The separate `Backend/Database/kfc_db.sql` sample database is not the source of the frontend menu cards or their image mappings.
