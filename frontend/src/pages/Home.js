import React from 'react';
import './home.css';

const Home = () => {
    const events = [
        { title: 'AI & Machine Learning Conference', date: '2024-06-15', category: 'Computer Science', description: 'Explore the latest trends in AI and Machine Learning.' },
        { title: 'Web Development Workshop', date: '2024-07-20', category: 'Computer Science', description: 'Hands-on workshop on modern web development techniques.' },
        { title: 'Cybersecurity Summit', date: '2024-08-10', category: 'Computer Science', description: 'Learn about the latest in cybersecurity and network protection.' },
        { title: 'Digital Marketing Seminar', date: '2024-09-05', category: 'Marketing', description: 'Strategies for effective digital marketing in 2024.' },
        { title: 'Blockchain Expo', date: '2024-10-12', category: 'Technology', description: 'Discover the future of blockchain technology and its applications.' },
        { title: 'Value the Idea', date: '2024-12-04', category: 'Business', description: 'Bring your idea to life' },
        { title: 'Startup Pitch Night', date: '2024-11-02', category: 'Business', description: 'Pitch your startup idea to investors and network with other entrepreneurs.' },
    ];

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Event Management System</h1>
            <div className="events-grid">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <h2 className="event-title">{event.title}</h2>
                        <p className="event-date">{event.date}</p>
                        <p className="event-category">{event.category}</p>
                        <p className="event-description">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
