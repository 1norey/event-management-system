import React, { useState } from 'react';

const PriceCalculator = () => {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleGuestCountChange = (e) => {
    setGuestCount(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const calculatePrice = () => {
    let basePrice = 0;
    switch (eventType) {
      case 'corporate':
        basePrice = 500;
        break;
      case 'wedding':
        basePrice = 2000;
        break;
      case 'privateParty':
        basePrice = 1000;
        break;
      default:
        basePrice = 0;
    }

    const guestPrice = guestCount * 10;
    const durationPrice = duration * 50;

    const totalPrice = basePrice + guestPrice + durationPrice;
    setPrice(totalPrice);
  };

  return (
    <div className="price-calculator">
      <h2>Price Calculator</h2>
      <form>
        <label>
          Event Type:
          <select value={eventType} onChange={handleEventTypeChange}>
            <option value="">Select an option</option>
            <option value="corporate">Corporate Event</option>
            <option value="wedding">Wedding</option>
            <option value="privateParty">Private Party</option>
          </select>
        </label>
        <br />
        <label>
          Guest Count:
          <input type="number" value={guestCount} onChange={handleGuestCountChange} />
        </label>
        <br />
        <label>
          Duration (hours):
          <input type="number" value={duration} onChange={handleDurationChange} />
        </label>
        <br />
        <button type="button" onClick={calculatePrice}>
          Calculate Price
        </button>
      </form>
      <p>
        Total Price: ${price}
      </p>
    </div>
  );
};

export default PriceCalculator;