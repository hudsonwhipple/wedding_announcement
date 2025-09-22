import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    attendanceDates: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dateOptions = [
    'Main Reception in Arizona, December 30th',
    'Open House in Dallas, January 17th',
    'Open House in Austin, January 24th'
  ];

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 60 + 20, // 20-80px
          left: Math.random() * 100, // 0-100%
          animationDuration: Math.random() * 20 + 10, // 10-30s
          delay: Math.random() * 5, // 0-5s delay
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();

    // Loading animation timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds loading animation

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      attendanceDates: checked 
        ? [...prev.attendanceDates, value]
        : prev.attendanceDates.filter(date => date !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Your actual Google Form URL
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7gGVe5yuncJfJuFfg6E_63PaO6EzxVGSlDfoX7BuXvhBotA/formResponse';
      
      const formDataToSend = new FormData();
      // Your actual entry IDs
      formDataToSend.append('entry.1821525375', formData.name);
      formDataToSend.append('entry.315825374', formData.addressLine1);
      formDataToSend.append('entry.1686944653', formData.addressLine2);
      formDataToSend.append('entry.668287509', formData.city);
      formDataToSend.append('entry.1211848837', formData.state);
      formDataToSend.append('entry.1516230191', formData.zipCode);
      formDataToSend.append('entry.430568182', formData.country);
      
      // Handle checkbox entries
      formData.attendanceDates.forEach(date => {
        formDataToSend.append('entry.187162441', date);
      });

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });

      setSubmitMessage('Thank you! Your information has been submitted successfully.');
      setFormData({ 
        name: '', 
        addressLine1: '', 
        addressLine2: '', 
        city: '', 
        state: '', 
        zipCode: '', 
        country: '', 
        phone: '', 
        attendanceDates: [] 
      });
    } catch (error) {
      setSubmitMessage('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="hearts-container">
          <div className="heart heart-1">💕</div>
          <div className="heart heart-2">💖</div>
          <div className="heart heart-3">💝</div>
          <div className="heart heart-4">💗</div>
          <div className="heart heart-5">💓</div>
          <div className="heart heart-6">💕</div>
          <div className="heart heart-7">💞</div>
          <div className="heart heart-8">💘</div>
          <div className="heart heart-9">💖</div>
          <div className="heart heart-10">💝</div>
          <div className="heart heart-11">💗</div>
          <div className="heart heart-12">💓</div>
          <div className="heart heart-13">💕</div>
          <div className="heart heart-14">💞</div>
          <div className="heart heart-15">💘</div>
        </div>
        <div className="loading-text">
          <h1 className="loading-title">Sara & Hudson</h1>
          <div className="loading-subtitle">Creating something beautiful...</div>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        <div className="romantic-glow"></div>
      </div>
    );
  }

  return (
    <div className="App fade-in-main">
      {/* Animated background bubbles */}
      <div className="bubbles-container">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDuration: `${bubble.animationDuration}s`,
              animationDelay: `${bubble.delay}s`,
              opacity: bubble.opacity,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="photo-section">
          <div className="photo-gallery">
            <img 
              src="/H+S-46-copy.jpg" 
              alt="Sara and Hudson" 
              className="main-photo"
            />
            <img 
              src="/H+S-38-copy.jpg" 
              alt="Sara and Hudson" 
              className="main-photo secondary-photo"
            />
            <img 
              src="/H+S-15-copy.jpg" 
              alt="Sara and Hudson" 
              className="main-photo secondary-photo"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h1>Wedding Announcements</h1>
          <h2 className="names-subtitle">Sara and Hudson</h2>
          <p className="subtitle">We are so excited for December 30th! Please let us know if you can be there to celebrate with us in Arizona or Texas. You mean the world to us!</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                placeholder="Street address, P.O. box, company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder="State"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Zip Code"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>If you can come, which dates would you like to attend?</label>
              <div className="checkbox-options">
                {dateOptions.map((date, index) => (
                  <div key={index} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`date-${index}`}
                      value={date}
                      checked={formData.attendanceDates.includes(date)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`date-${index}`}>{date}</label>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Information'}
            </button>

            {submitMessage && (
              <div className={`message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
