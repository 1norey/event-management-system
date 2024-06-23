// ImageSlider.js

import React, { useState } from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ events }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        afterChange: (index) => setCurrentSlide(index)
    };

    return (
        <Slider {...sliderSettings}>
            {events.map(event => (
                <div key={event.id}>
                    <img src={/EventImages/AiEventImage.png} alt={event.title} />
                    <div className="slider-description">
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
