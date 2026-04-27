import React, { useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function HomePage() {
  const menuCardsRef = useRef([]);
  const galleryItemsRef = useRef([]);
  const specialsRef = useRef([]);
  const ordersRef = useRef([]);
  const { user } = useAuth();

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('visible'), index * 100);
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      setTimeout(() => item.classList.add('visible'), index * 100);
    });

    const specialsCards = document.querySelectorAll('.special-card');
    specialsCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('visible'), index * 100);
    });

    const orderCards = document.querySelectorAll('.order-card');
    orderCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('visible'), index * 100);
    });

    return () => fadeObserver.disconnect();
  }, []);

  const handleMenuFilter = (category) => {
    const cards = document.querySelectorAll('.menu-card');
    const tabs = document.querySelectorAll('.menu-tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  const handleOrder = (itemName) => {
    alert(`${itemName} added to your order! Check our menu to complete your order.`);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Saving...';
    
    const reservationData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      party: form.party.value,
      date: form.date.value,
      time: form.time.value,
      requests: form.requests.value,
      status: 'pending',
      createdAt: serverTimestamp()
    };
    
    try {
      await addDoc(collection(db, 'reservations'), reservationData);
      btn.textContent = 'Reservation Requested!';
      btn.style.background = '#4CAF50';
      setTimeout(() => {
        btn.textContent = 'Request Reservation';
        btn.style.background = '';
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      btn.textContent = 'Error! Try again';
    }
  };

  return (
    <>
      <Nav />
      
      <section className="hero animated">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <p className="hero-tag">Welcome to Food Lover</p>
          <h1 className="hero-title">
            <span className="word">Refined</span>
            <span className="word">Dining</span>
          </h1>
          <p className="hero-subtitle">Experience culinary artistry in an atmosphere of timeless elegance. Where every meal becomes a cherished memory.</p>
          <a href="#reservation" className="btn-primary">Reserve Your Table</a>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image fade-in">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Food Lover restaurant interior" />
            </div>
            <div className="about-content fade-in">
              <p className="section-tag">Our Story</p>
              <h3>A Legacy of Culinary Excellence</h3>
              <p>Since 2010, Food Lover has been the heart of fine dining in our community. Our chef combines traditional techniques with modern innovation to create dishes that tell a story.</p>
              <p>Every ingredient is carefully sourced from local farms and artisan producers, ensuring freshness and sustainability in every bite.</p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Years</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50K</div>
                  <div className="stat-label">Guests</div>
                </div>
                <div className="stat">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="menu">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Our Menu</p>
            <h2 className="section-title">Culinary Creations</h2>
          </div>
          <div className="menu-tabs">
            <button className="menu-tab active" onClick={(e) => handleMenuFilter('all')}>All</button>
            <button className="menu-tab" onClick={(e) => handleMenuFilter('starters')}>Starters</button>
            <button className="menu-tab" onClick={(e) => handleMenuFilter('mains')}>Mains</button>
            <button className="menu-tab" onClick={(e) => handleMenuFilter('desserts')}>Desserts</button>
            <button className="menu-tab" onClick={(e) => handleMenuFilter('drinks')}>Drinks</button>
          </div>
          <div className="menu-grid">
            <div className="menu-card" data-category="starters">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80" alt="Burrata" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Burrata & Heirloom Tomatoes</h4>
                  <span className="menu-card-price">$18</span>
                </div>
                <p className="menu-card-desc">Creamy burrata, seasonal tomatoes, aged balsamic, basil oil</p>
              </div>
            </div>
            <div className="menu-card" data-category="starters">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1626200419199-391ae4be7a76?w=600&q=80" alt="Beef Tartar" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Wagyu Beef Tartar</h4>
                  <span className="menu-card-price">$24</span>
                </div>
                <p className="menu-card-desc">Hand-cut wagyu, quail egg, capers, truffle aioli</p>
              </div>
            </div>
            <div className="menu-card" data-category="mains">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" alt="Ribeye" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Dry-Aged Ribeye</h4>
                  <span className="menu-card-price">$56</span>
                </div>
                <p className="menu-card-desc">45-day dry-aged, bone marrow butter, seasonal vegetables</p>
              </div>
            </div>
            <div className="menu-card" data-category="mains">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80" alt="Duck" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Roasted Duck Breast</h4>
                  <span className="menu-card-price">$42</span>
                </div>
                <p className="menu-card-desc">Cherry gastrique, sweet potato purée, baby bok choy</p>
              </div>
            </div>
            <div className="menu-card" data-category="mains">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80" alt="Salmon" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Pan-Seared Salmon</h4>
                  <span className="menu-card-price">$38</span>
                </div>
                <p className="menu-card-desc">Wild salmon, lemon beurre blanc, asparagus, dill</p>
              </div>
            </div>
            <div className="menu-card" data-category="desserts">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80" alt="Chocolate" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Chocolate Fondant</h4>
                  <span className="menu-card-price">$14</span>
                </div>
                <p className="menu-card-desc">Valrhona chocolate, vanilla bean ice cream</p>
              </div>
            </div>
            <div className="menu-card" data-category="desserts">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1579306194692-6cdc97294a90?w=600&q=80" alt="Crème Brûlée" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Crème Brûlée</h4>
                  <span className="menu-card-price">$12</span>
                </div>
                <p className="menu-card-desc">Classic vanilla, caramelized sugar, fresh berries</p>
              </div>
            </div>
            <div className="menu-card" data-category="drinks">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80" alt="Cocktail" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">Ember Old Fashioned</h4>
                  <span className="menu-card-price">$16</span>
                </div>
                <p className="menu-card-desc">Bourbon, smoked maple, angostura, orange peel</p>
              </div>
            </div>
            <div className="menu-card" data-category="drinks">
              <div className="menu-card-image">
                <img src="https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80" alt="Wine" />
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h4 className="menu-card-title">House Wine Selection</h4>
                  <span className="menu-card-price">$14</span>
                </div>
                <p className="menu-card-desc">Rotating selection of premium wines by the glass</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="specials" className="specials">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Chef's Table</p>
            <h2 className="section-title">Tonight's Specials</h2>
          </div>
          <div className="specials-grid">
            <div className="special-card">
              <span className="special-badge">Chef's Choice</span>
              <h4>Truffle Risotto</h4>
              <p>Wild foraged mushrooms, black truffle, aged parmesan, fresh herbs</p>
              <div className="special-price">$48</div>
              <button className="special-btn" onClick={() => handleOrder('Truffle Risotto')}>Order Now</button>
            </div>
            <div className="special-card">
              <span className="special-badge limited">Limited</span>
              <h4>Wagyu A5 Steak</h4>
              <p>Japanese A5 wagyu, charred onion, red wine reduction, seasonal greens</p>
              <div className="special-price">$125</div>
              <button className="special-btn" onClick={() => handleOrder('Wagyu A5 Steak')}>Order Now</button>
            </div>
            <div className="special-card">
              <span className="special-badge">New</span>
              <h4>Lobster Thermidor</h4>
              <p>Maine lobster, cognac cream, gruyere, roasted fingerling potatoes</p>
              <div className="special-price">$72</div>
              <button className="special-btn" onClick={() => handleOrder('Lobster Thermidor')}>Order Now</button>
            </div>
          </div>
        </div>
      </section>

      <section id="ordering" className="ordering">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Convenience</p>
            <h2 className="section-title">Order Online</h2>
          </div>
          <div className="ordering-grid">
            <div className="order-card">
              <div className="order-icon">🍽️</div>
              <h4>Pickup</h4>
              <p>Order online and pick up at your convenience. Skip the wait!</p>
              <a href="#menu" className="special-btn">Start Order</a>
            </div>
            <div className="order-card">
              <div className="order-icon">🚗</div>
              <h4>Curbside</h4>
              <p>We bring your order right to your car. Just pull up and we'll deliver.</p>
              <a href="#menu" className="special-btn">Start Order</a>
            </div>
            <div className="order-card">
              <div className="order-icon">📦</div>
              <h4>Delivery</h4>
              <p>Fresh meals delivered to your door within our delivery zone.</p>
              <a href="#menu" className="special-btn">Start Order</a>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="events">
        <div className="container">
          <div className="events-grid">
            <div className="events-image fade-in">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800&q=80" alt="Private event dining" />
            </div>
            <div className="events-content fade-in">
              <p className="section-tag">Private Dining</p>
              <h3>Host Your Event With Us</h3>
              <p>Celebrate life's special moments in an intimate setting. Our private dining room is perfect for anniversary dinners, business gatherings, birthday celebrations, and more.</p>
              <ul className="event-features">
                <li>Private room seating up to 20 guests</li>
                <li>Custom menu curated by our chef</li>
                <li>Dedicated event coordinator</li>
                <li>Flexible seating arrangements</li>
                <li>AV equipment available</li>
              </ul>
              <a href="#reservation" className="btn-primary">Inquire Now</a>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Gallery</p>
            <h2 className="section-title">Our Space</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" alt="Restaurant interior" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Dining table" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" alt="Chef cooking" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1424847651672-bf20e4dafd5d?w=800&q=80" alt="Plated dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1514933651103-005eeb06f14c?w=600&q=80" alt="Bar" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=600&q=80" alt="Outdoor dining" />
            </div>
          </div>
        </div>
      </section>

      <section id="reservation" className="reservation">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Reservations</p>
            <h2 className="section-title">Book Your Table</h2>
          </div>
          <form className="reservation-form fade-in" onSubmit={handleReservation}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="name" required placeholder=" " defaultValue={user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : ''} />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " defaultValue={user?.email || ''} readOnly={!!user} />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="tel" id="phone" required placeholder=" " />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <div className="form-group">
                <input type="number" id="party" min="1" max="12" required placeholder=" " />
                <label htmlFor="party">Party Size</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="date" id="date" required placeholder=" " />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-group">
                <input type="time" id="time" required placeholder=" " />
                <label htmlFor="time">Time</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <input type="text" id="requests" placeholder=" " />
                <label htmlFor="requests">Special Requests (Optional)</label>
              </div>
            </div>
            <button type="submit" className="form-submit">Request Reservation</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;