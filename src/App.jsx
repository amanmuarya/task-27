import { useState } from "react";
import { ShoppingBag, Plus, Minus, Trash2, Package } from "lucide-react";
import "./App.css";

// 
// Catalog data. In a real app this would come from an API — here it's a
// fixed list, since only the cart needs to be reactive state.
// 
const SHOES = [
  {
    id: "sk-014",
    name: "Cloudstep Knit Runner",
    colorway: "Fog Grey / Cobalt",
    price: 128,
    sku: "SK-014-FG",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    id: "sk-027",
    name: "Trailblazer Mid Hiker",
    colorway: "Bark / Moss",
    price: 145,
    sku: "SK-027-BM",
    img: "pic-2.webp",
  },
  {
    id: "sk-003",
    name: "Aero Court Classic",
    colorway: "Chalk White",
    price: 98,
    sku: "SK-003-CW",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
  },
  {
    id: "sk-041",
    name: "Nightshift High-Top",
    colorway: "Jet Black",
    price: 132,
    sku: "SK-041-JB",
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
  },
  {
    id: "sk-052",
    name: "Meridian Slip-On",
    colorway: "Sand Canvas",
    price: 85,
    sku: "SK-052-SC",
    img: "pic-4.webp",
  },
  {
    id: "sk-063",
    name: "Ridgeline Trail GTX",
    colorway: "Rust / Charcoal",
    price: 160,
    sku: "SK-063-RC",
    img: "pic-3.webp",
  },
  {
    id: "sk-018",
    name: "Retro Varsity Low",
    colorway: "Cream / Navy",
    price: 110,
    sku: "SK-018-CN",
    img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
  },
  {
    id: "sk-071",
    name: "Featherlight Racer",
    colorway: "Volt / White",
    price: 118,
    sku: "SK-071-VW",
    img: "pic-1.webp ",

  },
];

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

export default function App() {
  // The cart is the one piece of state the whole app revolves around:
  // an array of { id, name, sku, price, quantity }.
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        { id: shoe.id, name: shoe.name, sku: shoe.sku, price: shoe.price, quantity: 1 },
      ];
    });
  };

  const removeOne = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeLine = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="store-wrap">
      <header className="header">
        <div>
          <h1 className="brand-mark">STOCKROOM</h1>
          <p className="tagline">Independent sneaker supply — since lot no. 014</p>
        </div>
        <div className="header-count">
          <ShoppingBag size={16} />
          {itemCount} {itemCount === 1 ? "pair" : "pairs"} in cart
        </div>
      </header>

      <div className="layout">
        {/* ---------------- Shoe catalog ---------------- */}
        <section className="shoe-grid" aria-label="Shoe catalog">
          {SHOES.map((shoe) => (
            <article className="shoe-card" key={shoe.id}>
              <div className="shoe-image-wrap">
                <img
                  className="shoe-img"
                  src={shoe.img}
                  alt={`${shoe.name} in ${shoe.colorway}`}
                  loading="lazy"
                />
              </div>
              <div className="shoe-info">
                <h2 className="shoe-name">{shoe.name}</h2>
                <p className="shoe-colorway">{shoe.colorway}</p>
                <div className="shoe-meta">
                  <span className="shoe-sku">{shoe.sku}</span>
                  <span className="shoe-price">{formatPrice(shoe.price)}</span>
                </div>
                <button className="add-btn" onClick={() => addToCart(shoe)}>
                  <Plus size={15} /> Add to cart
                </button>
              </div>
            </article>
          ))}
        </section>

         {/* /* Cart / packing slip */  }
        <aside className="cart-panel" aria-label="Shopping cart">
          <div className="cart-header">
            <span className="cart-title">
              <Package size={14} /> Packing slip
            </span>
            <div className="barcode" aria-hidden="true">
              {[6, 10, 4, 14, 8, 16, 6, 12, 4, 10, 8].map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={28} strokeWidth={1.5} />
              <p>Cart's empty — add a pair to get started.</p>
            </div>
          ) : (
            <>
              <hr className="divider-dashed" />
              <ul className="cart-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {cart.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <p className="cart-item-name">{item.name}</p>
                    <span className="cart-item-line-total">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="cart-item-sku">{item.sku}</span>
                    <div className="qty-row">
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => removeOne(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => addToCart(item)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button className="remove-line" onClick={() => removeLine(item.id)}>
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="divider-dashed" />
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-value">{formatPrice(subtotal)}</span>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}