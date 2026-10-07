import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ShoppingCart, Search, Plus, Minus, X, ChevronRight } from "lucide-react";
import "./styles.css";

const swp = "src/assets/swp.jpg";
const prtLogo ="src/assets/prt_logo.png";
const swpPremium ="src/assets/swp-premium.jpg";
const w320 ="src/assets/w320.jpg";
const w240 ="src/assets/w240.jpg";
const jbk ="src/assets/jbk.jpg";

const products = [
 
  
  {
    id: 1,
    name: "W320 Whole Cashew",
    subtitle: "Whole Premium Quality",
    price: 875,
    unit: "1 kg",
    image: w320,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "W240 Whole Cashew",
    subtitle: "Large Whole Kernels",
    price: 975,
    unit: "1 kg",
    image: w240,
    badge: "Premium",
  },
  {
    id: 3,
    name: "JBK Cashew",
    subtitle: "Jumbo Broken Kernels",
    price: 520,
    unit: "500 g",
    image: jbk,
    badge: "Fresh",
  },
   {
    id: 4,
    name: "Broken Cashew",
    subtitle: "Premium Cashew Pieces",
    price: 420,
    unit: "500 g",
    image: swp,
    badge: "Popular",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.subtitle}`.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#">
            <span className="logo">
              <img src={prtLogo} alt="PRT Nuts Logo"  width="80%"/>
            </span>            
            <span>
              
              <h1>Goodness in<br /><em>Every Bite.</em></h1>         </span>
          </a>

          <div className="search">
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cashews..."
            />
          </div>

          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={21} />
            <span>Cart</span>
            {totalItems > 0 && <b>{totalItems}</b>}
          </button>
        </div>
      </header>

      {/* <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">100% Premium Cashews</span>
            <h1>Goodness in<br /><em>Every Bite.</em></h1>
            <p>
              Carefully selected cashews, packed fresh for your family.
              Choose your favourite grade and order online.
            </p>
            <a href="#products" className="hero-btn">
              Shop Cashews <ChevronRight size={18} />
            </a>
          </div>
          <div className="hero-art">
            <div className="hero-circle"></div>
            <img src={w320} alt="Premium whole cashews" />
          </div>
        </div>
      </section> */}

      <main id="products" className="container products-section">
        <div className="section-heading">
          <div>
          
            <h2>Premium Cashews</h2>
          </div>
          <span className="product-count">{filteredProducts.length} products</span>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <span className="badge">{product.badge}</span>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-subtitle">{product.subtitle}</p>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <div>
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <span> / {product.unit}</span>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(product)}>
                    <Plus size={18} /> Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-search">No cashews found for “{search}”.</div>
        )}
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <strong>PRT NUTS</strong>
            <p>Premium quality cashews, packed fresh.</p>
          </div>
          <div className="footer-contact">
            <span>📞 +91 97872 71997</span>
            <span>✉ support@prtnuts.com</span>
            <span>🌐 prtnuts.com</span>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-head">
              <div>
                <span className="eyebrow">Your Selection</span>
                <h2>Shopping Cart</h2>
              </div>
              <button className="icon-btn" onClick={() => setCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={48} />
                <h3>Your cart is empty</h3>
                <p>Add some premium cashews to continue.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString("en-IN")} / {item.unit}</p>
                        <div className="qty">
                          <button onClick={() => changeQty(item.id, -1)}><Minus size={15} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)}><Plus size={15} /></button>
                        </div>
                      </div>
                      <strong>₹{(item.price * item.qty).toLocaleString("en-IN")}</strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
                  <div><span>Delivery</span><span>Calculated at checkout</span></div>
                  <button className="checkout">Proceed to Checkout <ChevronRight size={18} /></button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
