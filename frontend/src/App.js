import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import CustomerLogin from './CustomerLogin';
import { useState, useEffect } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseInt(formData.price),
        }),
      });
      if (response.ok) {
        setFormData({ name: '', price: '' });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Amazon-like Header */}
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <h1>amazon<span>.in</span></h1>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Amazon.in"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="header-actions">
            <div className="account">
              <a href="/customer/login">Customer Login</a> | <a href="/admin/login">Admin Login</a>
            </div>
            <div className="returns">
              <span>Returns</span>
              <span>& Orders</span>
            </div>
            <div className="cart">
              <span>🛒</span>
              <span>Cart</span>
            </div>
          </div>
        </div>
        <nav className="nav-bar">
          <div className="nav-links">
            <span>All</span>
            <span>Today's Deals</span>
            <span>Customer Service</span>
            <span>Registry</span>
            <span>Gift Cards</span>
            <span>Sell</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Banner */}
        <div className="hero-banner">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/Phase3/J23_P3B_PC_Hero_2X._CB575786858_.jpg" alt="Amazon Banner" />
        </div>

        {/* Admin Panel */}
        <div className="admin-panel">
          <h2>Admin: Add New Product</h2>
          <form onSubmit={handleAddProduct} className="add-product-form">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <h2>Results</h2>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Books/bookstore/Books._SY232_CB619151778_.jpg" alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">★★★★☆</span>
                      <span className="rating-count">(1,234)</span>
                    </div>
                    <div className="product-price">
                      <span className="price">₹{product.price}</span>
                      <span className="original-price">₹{Math.round(product.price * 1.2)}</span>
                      <span className="discount">(17% off)</span>
                    </div>
                    <div className="delivery-info">
                      <span>FREE delivery</span>
                      <span className="delivery-date">Tomorrow</span>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Get to Know Us</h4>
            <ul>
              <li>Careers</li>
              <li>Blog</li>
              <li>About Amazon</li>
              <li>Investor Relations</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Make Money with Us</h4>
            <ul>
              <li>Sell products on Amazon</li>
              <li>Sell on Amazon Business</li>
              <li>Sell apps on Amazon</li>
              <li>Become an Affiliate</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Amazon Payment Products</h4>
            <ul>
              <li>Amazon Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
              <li>Amazon Currency Converter</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Let Us Help You</h4>
            <ul>
              <li>Amazon and COVID-19</li>
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Shipping Rates & Policies</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
