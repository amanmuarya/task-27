# React + Vite

# STOCKROOM — Online Shoe Store
 
A React shopping-cart demo built around a single `useState` hook. Browse a
catalog of shoes on the left, add them to a cart styled like a warehouse
packing slip on the right, adjust quantities, and see the total update live.
 
## Features
 
- **Shoe catalog** — a grid of shoe cards, each showing an image, name,
  colorway, SKU, and price.
- **Add to cart** — clicking "Add to cart" on any shoe adds it to the cart,
  or increments its quantity if it's already there.
- **Remove from cart** — quantity can be decreased with a stepper (down to
  0, at which point the line disappears), or a line can be removed entirely
  with the "Remove" button.
- **Live cart total** — subtotal and total recalculate automatically as
  items are added or removed, using `Array.prototype.reduce`.
- **Empty-state messaging** — the cart shows a friendly prompt when there's
  nothing in it yet.
- **Responsive layout** — two columns on desktop (catalog + sticky cart),
  a single stacked column on narrower screens.
- **Accessible controls** — icon-only buttons have `aria-label`s, and
  focus states are visible for keyboard navigation.
 
> **Note:** `App.jsx` and `App.css` are the two files provided. If you're
> starting from scratch, scaffold a project first (see
> [Installation](#installation)) — that will generate `main.jsx`,
> `index.html`, and `package.json` for you. Then drop the two provided files
> into `src/`, overwriting the default `App.jsx`/`App.css`.
 
### Running the App
 
```bash
npm run dev
```
 
Vite will print a local URL (typically `http://localhost:5173`) — open it
npm run build
npm run preview   # serve the production build locale
 
## How the Cart State Works
 
The entire cart is one piece of state:
 
```jsx
const [cart, setCart] = useState([]);
```
 
Each entry in `cart` looks like:
 
```js
{ id: "sk-014", name: "Cloudstep Knit Runner", sku: "SK-014-FG", price: 128, quantity: 2 }
```
 
**Adding an item** (`addToCart`):
- If the shoe is already in the cart, its `quantity` is incremented.
- Otherwise, a new line is appended with `quantity: 1`.
```jsx
 
