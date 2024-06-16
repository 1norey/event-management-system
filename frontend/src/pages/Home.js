import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css'; // Import your main home.css file
import './slider.css'; // Import the newly created slider.css file

const Home = () => {
    const events = [
        { title: 'AI & Machine Learning Conference', date: '2024-06-15', category: 'Computer Science', description: 'Explore the latest trends in AI and Machine Learning.'},
        { title: 'Web Development Workshop', date: '2024-07-20', category: 'Computer Science', description: 'Hands-on workshop on modern web development techniques.' },
        // Add more events as needed
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Event Management System</h1>
            <Slider {...sliderSettings}>
                {events.map((event, index) => (
                    <div key={index} className="slider-item" >
                        <div className="content">
                            <h2 className="event-title">{event.title}</h2>
                            <p className="event-date">{event.date}</p>
                            <p className="event-category">{event.category}</p>
                            <p className="event-description">{event.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Home;
