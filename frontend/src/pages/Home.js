import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './home.css'; // Import your CSS file for home styles
import './slider.css'; // Import your CSS file for slider styles
import PriceCalculator from './PriceCalculator.';

const Home = () => {
    // Sample events data
    const events = [
        {
            id: 1,
            title: "AI Conference 2024",
            date: "2024-09-15",
            description: "Join us for a day of insightful talks and networking with AI experts.",
            imageUrl: "/EventImages/AiEventImage.png"
        },
        {
            id: 2,
            title: "Blockchain Expo",
            date: "2024-10-20",
            description: "Discover the latest trends in blockchain technology.",
            imageUrl: "/EventImages/blockchainImage.jpg"
        },
        // Add more events as needed
    ];

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("2024-07-15T00:00:00");
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


      // Price Calculator
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
  }


    return (
        <div className="home-container">
            <h1 className="home-title">Upcoming Events</h1>
            <Slider {...sliderSettings}>
                {events.map(event => (
                    <div key={event.id} className="slider-item">
                        <div className="slider-item-background" style={{ backgroundImage: `url(${event.imageUrl})` }}>
                            <div className="slider-content">
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="countdown-container">
                <h2>New Events Coming Countdown</h2>
                <div className="countdown-timer" id="countdown-timer">
                    <div className="time-box">
                        <span className="time" id="days">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span>
                        <span className="label">Days</span>
                    </div>
                    <div className="time-box">
                        <span className="time" id="hours">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>
                        <span className="label">Hours</span>
                    </div>
                    <div className="time-box">
                        <span className="time" id="minutes">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
                        <span className="label">Minutes</span>
                    </div>
                    <div className="time-box">
                        <span className="time" id="seconds">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                        <span className="label">Seconds</span>
                    </div>
                </div>
            </div>

            <div className="about-event-management">
                <img src="/EventImages/eventmanagment.jpg" alt="Event Management" className="event-image" />
                <p>
                    Welcome to Event-Management, where exceptional events are crafted with precision and passion. We specialize in curating unforgettable experiences tailored to your unique vision. Whether you're planning a corporate gala, a dreamy wedding, a milestone celebration, or a cutting-edge conference, we are here to turn your ideas into reality.
                    At Events, we offer a comprehensive range of services to meet every aspect of event planning and management. Our team of seasoned professionals handles everything from venue selection and decor to logistics and entertainment, ensuring that every detail is flawlessly executed. With our meticulous attention to detail and dedication to excellence, we guarantee a seamless and stress-free event experience for you and your guests.
                    Why choose us? Because we believe in creativity, collaboration, and delivering results that exceed expectations. From intimate gatherings to grand affairs, we bring innovation and expertise to every project, making each event a true reflection of your style and personality. Discover the difference with EVENTS. Let's create moments that will be cherished forever. Contact us today to begin planning your next extraordinary event.
                </p>
            </div>

            <div className="services-section">
                <h2>Our Services</h2>
                <div className="services-container">
                    <div className="service">
                        <img src="/EventImages/corporate.png" alt="Service Icon 1" />
                        <h3>Corporate Events</h3>
                        <p>We specialize in planning and managing corporate events that align with your business objectives and impress your guests.</p>
                    </div>
                    <div className="service">
                        <img src="/EventImages/techevents1.jpeg" alt="Service Icon 2" />
                        <h3>Technology Events</h3>
                        <p>From intimate ceremonies to lavish celebrations, our wedding planning services ensure your special day is flawless and unforgettable.</p>
                    </div>
                    <div className="service">
                        <img src="/EventImages/party1.jpg" alt="Service Icon 3" />
                        <h3>Private Parties</h3>
                        <p>Celebrate life's milestones with style. We offer personalized event planning services for private parties of all sizes.</p>
                    </div>
                    <div className="service">
                        <img src="/EventImages/conferences.jpg" alt="Service Icon 4" />
                        <h3>Conferences</h3>
                        <p>From venue selection to program coordination, we manage every detail to ensure your conference is successful and impactful.</p>
                    </div>
                </div>
            </div>

<div className="gap"></div>

<div class="price-calculator">
  <h2>Event Reservation Price Calculator</h2>
  <form>
    <label>
      Event Type:
      <select value={eventType} onChange={handleEventTypeChange}>
        <option value="">Select an event type</option>
        <option value="corporate">Corporate</option>
        <option value="wedding">Technology Conference</option>
        <option value="privateParty">Private Party</option>
        <option value="Conference">Conference</option>
      </select>
    </label>
    <label>
      Guest Count:
      <input type="number" value={guestCount} onChange={handleGuestCountChange} />
    </label>
    <label>
      Duration (hours):
      <input type="number" value={duration} onChange={handleDurationChange} />
    </label>
    <button type="button" onClick={calculatePrice}>
      Calculate Price
    </button>
    <p class="result">Price: ${price}</p>
  </form>
</div>

 <div className="gap"></div>
 <div class="social-media-div">
  <h2>Stay Connected</h2>
  <ul>
    <li>
      <a href="https://www.facebook.com/yourfacebookpage" target="_blank">
        <img src="/EventImages/f.jpg" alt="Facebook Logo"></img>
        <span>Facebook</span>
      </a>
    </li>
    <li>
      <a href="https://www.x.com/yourxhandle" target="_blank">
        <img src="/EventImages/x.jpg" alt="X Logo"></img>
        <span>X</span>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/yourinstagramhandle" target="_blank">
        <img src="/EventImages/instagram.jpg" alt="Instagram Logo"></img>
        <span>Instagram</span>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/company/yourlinkedincompany" target="_blank">
        <img src="/EventImages/linked.png" alt="LinkedIn Logo"></img>
        <span>LinkedIn</span>
      </a>
    </li>
    <li>
      <a href="https://www.youtube.com/youryoutubechannel" target="_blank">
        <img src="/EventImages/youtube.png" alt="YouTube Logo"></img>
        <span>YouTube</span>
      </a>
    </li>
  </ul>
  <p>Follow us for the latest updates on our events!</p>
</div>
<div className="gap"></div>

            <div class="carousel-container">
        <div class="carousel-inner">
           
            <div class="carousel-item">
                <img src="/EventImages/uber.jpg" alt="Uber"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/bose.jpg" alt="Bose"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/walt.png" alt="Walt"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/heineken.jpg" alt="Heineken"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/sponsors.jpeg" alt="Sponsors"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/thanks1.jpg" alt="Thanks"></img>
            </div>
           
            <div class="carousel-item">
                <img src="/EventImages/uber.jpg" alt="Uber"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/bose.jpg" alt="Bose"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/walt.png" alt="Walt"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/heineken.jpg" alt="Heineken"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/sponsors.jpeg" alt="Sponsors"></img>
            </div>
            <div class="carousel-item">
                <img src="/EventImages/thanks1.jpg" alt="Thanks"></img>
            </div>
        </div>
    </div>

<div class="text">
    <h1> Thank you to some of our Sponsors</h1>
</div>
    
            <div className="contact-us">
                <div className="contact-form">
                    <h2>Get in Touch</h2>
                    <p>Have a question or want to learn more about our events? Send us a message!</p>
                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <textarea placeholder="Message" />
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div>
                    <iframe className="contact-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387198.0696314914!2d-74.60356651051723!3d40.69632978678025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1718931541611!5m2!1sen!2s"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Home;




