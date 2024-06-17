import React from 'react';
import Slider from 'react-slick';
import './home.css';
import './slider.css';

const Home = () => {
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
            imageUrl: "/EventImages/BlockchainEventImage.png"
        },
        // Add more events as needed
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  // Enable autoplay
        autoplaySpeed: 3000,  // Change slide every 3 seconds
        arrows: true  // Show navigation arrows
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Upcoming Events</h1>
            <Slider {...settings}>
                {events.map(event => (
                    <div key={event.id} className="slider-item">
                        <div
                            className="slider-item-background"
                            style={{ backgroundImage: `url(${event.imageUrl})` }}
                        >
                            <div className="slider-content">
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Home;
