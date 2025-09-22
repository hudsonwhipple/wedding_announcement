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
    email: '',
    attendanceDates: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('english');

  const translations = {
    english: {
      weddingAnnouncements: "We are getting Married!",
      names: "Sara and Hudson",
      subtitle: "Please fill out the form if you would like an announcement and let us know if you are able to celebrate in person with us at our reception in Phoenix or our openhouse in Texas!",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      addressLine1: "Address Line 1",
      addressLine1Placeholder: "Street address, P.O. box, company name",
      addressLine2: "Address Line 2 (Optional)",
      addressLine2Placeholder: "Apartment, suite, unit, building, floor, etc.",
      city: "City",
      cityPlaceholder: "City",
      state: "State",
      statePlaceholder: "State",
      zipCode: "Zip Code",
      zipCodePlaceholder: "Zip Code",
      country: "Country",
      countryPlaceholder: "Country",
      emailAddress: "Email Address",
      emailPlaceholder: "Enter your email address",
      attendanceQuestion: "If you can come, which dates would you like to attend?",
      submitButton: "Submit Information",
      submitting: "Submitting...",
      successMessage: "Thank you! Your information has been submitted successfully.",
      errorMessage: "There was an error submitting your information. Please try again.",
      popupBlockedMessage: "Pop-ups are blocked. Please allow pop-ups for this site and try again, or ",
      clickHereToSubmit: "click here to submit manually.",
      loadingSubtitle: "Creating something beautiful...",
      dateOptions: [
        'Main Reception in Arizona: Tuesday, December 30th',
        'Open House in Dallas: Saturday, January 17th',
        'Open House in Austin: Saturday, January 24th'
      ]
    },
    spanish: {
      weddingAnnouncements: "¡Nos vamos a casar!",
      names: "Sara y Hudson",
      subtitle: "¡Por favor llena el formulario si te gustaría recibir un anuncio y déjanos saber si puedes celebrar en persona con nosotros en nuestra recepción en Phoenix o en nuestra casa abierta en Texas!",
      fullName: "Nombre Completo",
      fullNamePlaceholder: "Ingresa tu nombre completo",
      addressLine1: "Dirección Línea 1",
      addressLine1Placeholder: "Dirección, apartado postal, nombre de empresa",
      addressLine2: "Dirección Línea 2 (Opcional)",
      addressLine2Placeholder: "Apartamento, suite, unidad, edificio, piso, etc.",
      city: "Ciudad",
      cityPlaceholder: "Ciudad",
      state: "Estado",
      statePlaceholder: "Estado",
      zipCode: "Código Postal",
      zipCodePlaceholder: "Código Postal",
      country: "País",
      countryPlaceholder: "País",
      emailAddress: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      attendanceQuestion: "Si puedes venir, ¿qué fechas te gustaría asistir?",
      submitButton: "Enviar Información",
      submitting: "Enviando...",
      successMessage: "¡Gracias! Tu información ha sido enviada exitosamente.",
      errorMessage: "Hubo un error enviando tu información. Por favor intenta de nuevo.",
      popupBlockedMessage: "Las ventanas emergentes están bloqueadas. Por favor permite ventanas emergentes para este sitio e intenta de nuevo, o ",
      clickHereToSubmit: "haz clic aquí para enviar manualmente.",
      loadingSubtitle: "Creando algo hermoso...",
      dateOptions: [
        'Recepción Principal en Arizona: martes, el 30 de diciembre',
        'Casa Abierta en Dallas: sábado, el 17 de enero',
        'Casa Abierta en Austin: sábado, el 24 de enero'
      ]
    }
  };

  const currentTranslations = translations[language];

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

    // Debug: Log what we're about to send
    console.log('Form data being submitted:', formData);

    // Define the Google Form URL at the top of the function
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7gGVe5yuncJfJuFfg6E_63PaO6EzxVGSlDfoX7BuXvhBotA/formResponse';

    try {
      // Create URL with all form data
      const params = new URLSearchParams();
      params.append('entry.1821525375', formData.name || '');
      params.append('entry.315825374', formData.addressLine1 || '');
      params.append('entry.1686944653', formData.addressLine2 || '');
      params.append('entry.668287509', formData.city || '');
      params.append('entry.1211848837', formData.state || '');
      params.append('entry.1516230191', formData.zipCode || '');
      params.append('entry.430568182', formData.country || '');
      params.append('entry.809772035', formData.email || '');
      
      // Add attendance dates
      formData.attendanceDates.forEach(date => {
        params.append('entry.187162441', date);
      });

      console.log('Form data params:', params.toString());

      // Open popup window to submit form
      const popup = window.open('', 'formSubmit', 'width=1,height=1,left=-1000,top=-1000');
      
      // Check if popup was blocked
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        console.error('Popup was blocked by browser');
        setSubmitMessage('popup-blocked');
        setIsSubmitting(false);
        return;
      }
      
      try {
        // Create form in popup - don't double encode the values
        popup.document.write(`
          <html>
            <body>
              <form id="googleForm" method="POST" action="${GOOGLE_FORM_URL}">
                ${Array.from(params.entries()).map(([key, value]) => 
                  `<input type="hidden" name="${key}" value="${value}">`
                ).join('')}
              </form>
              <script>
                try {
                  document.getElementById('googleForm').submit();
                  window.submissionSuccess = true;
                } catch (error) {
                  window.submissionError = error;
                }
                setTimeout(() => window.close(), 1000);
              </script>
            </body>
          </html>
        `);
        popup.document.close();

        // Check for submission success after a delay
        setTimeout(() => {
          try {
            if (popup && !popup.closed) {
              if (popup.submissionError) {
                console.error('Form submission error in popup:', popup.submissionError);
              }
            }
          } catch (e) {
            // Cross-origin access might be blocked, assume success
            console.log('Cross-origin access blocked, assuming success');
          }
          
          if (popup && !popup.closed) {
            popup.close();
          }
        }, 2000);

      } catch (popupError) {
        console.error('Error writing to popup:', popupError);
        if (popup && !popup.closed) {
          popup.close();
        }
        throw popupError;
      }

      console.log('Form submitted via popup method');

      setSubmitMessage(currentTranslations.successMessage);
      setFormData({ 
        name: '', 
        addressLine1: '', 
        addressLine2: '', 
        city: '', 
        state: '', 
        zipCode: '', 
        country: '', 
        email: '', 
        attendanceDates: [] 
      });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage(currentTranslations.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = () => {
    const params = new URLSearchParams();
    params.append('entry.1821525375', formData.name || '');
    params.append('entry.315825374', formData.addressLine1 || '');
    params.append('entry.1686944653', formData.addressLine2 || '');
    params.append('entry.668287509', formData.city || '');
    params.append('entry.1211848837', formData.state || '');
    params.append('entry.1516230191', formData.zipCode || '');
    params.append('entry.430568182', formData.country || '');
    params.append('entry.809772035', formData.email || '');
    
    formData.attendanceDates.forEach(date => {
      params.append('entry.187162441', date);
    });

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf7gGVe5yuncJfJuFfg6E_63PaO6EzxVGSlDfoX7BuXvhBotA/formResponse';
    window.open(`${GOOGLE_FORM_URL}?${params.toString()}`, '_blank');
    
    setSubmitMessage(currentTranslations.successMessage);
    setFormData({ 
      name: '', 
      addressLine1: '', 
      addressLine2: '', 
      city: '', 
      state: '', 
      zipCode: '', 
      country: '', 
      email: '', 
      attendanceDates: [] 
    });
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
          <div className="loading-subtitle">{currentTranslations.loadingSubtitle}</div>
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
          <div className="language-toggle">
            <button 
              className={`language-btn ${language === 'english' ? 'active' : ''}`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
            <button 
              className={`language-btn ${language === 'spanish' ? 'active' : ''}`}
              onClick={() => setLanguage('spanish')}
            >
              Español
            </button>
          </div>
          
          <h1>{currentTranslations.weddingAnnouncements}</h1>
          <h2 className="names-subtitle">{currentTranslations.names}</h2>
          <p className="subtitle">{currentTranslations.subtitle}</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{currentTranslations.fullName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={currentTranslations.fullNamePlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressLine1">{currentTranslations.addressLine1}</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                placeholder={currentTranslations.addressLine1Placeholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressLine2">{currentTranslations.addressLine2}</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder={currentTranslations.addressLine2Placeholder}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">{currentTranslations.city}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder={currentTranslations.cityPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">{currentTranslations.state}</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder={currentTranslations.statePlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">{currentTranslations.zipCode}</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  placeholder={currentTranslations.zipCodePlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">{currentTranslations.country}</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  placeholder={currentTranslations.countryPlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{currentTranslations.emailAddress}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={currentTranslations.emailPlaceholder}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>{currentTranslations.attendanceQuestion}</label>
              <div className="checkbox-options">
                {currentTranslations.dateOptions.map((date, index) => (
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
              {isSubmitting ? currentTranslations.submitting : currentTranslations.submitButton}
            </button>

            {submitMessage && (
              <div className={`message ${submitMessage.includes('error') || submitMessage === 'popup-blocked' ? 'error' : 'success'}`}>
                {submitMessage === 'popup-blocked' ? (
                  <span>
                    {currentTranslations.popupBlockedMessage}
                    <button 
                      onClick={handleManualSubmit}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        font: 'inherit'
                      }}
                    >
                      {currentTranslations.clickHereToSubmit}
                    </button>
                  </span>
                ) : submitMessage.includes('error') ? (
                  currentTranslations.errorMessage
                ) : (
                  currentTranslations.successMessage
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;