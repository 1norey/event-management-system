import React, { useState } from 'react';
import './ourteam.css';

const teamMembers = [
    {
        name: 'Rinor Bytyqi',
        role: 'Full-Stack Developer',
        image: '/EventImages/Rinor Bytyqi.jpeg',
        details: 'Rinor Bytyqi is a proficient Full-Stack Developer with expertise in modern web technologies...'
    },
    {
        name: 'Egzon Gjoklaj',
        role: 'Full-Stack Developer',
        image: '/EventImages/Egzon Gjoklaj.jpeg',
        details: 'Egzon Gjoklaj is a skilled Full-Stack Developer who specializes in creating robust applications...'
    },
    {
        name: 'Art Zherka',
        role: 'Front-end Developer',
        image: '/EventImages/Art Zherka.jpg',
        details: 'Art Zherka is an innovative Front-end Developer with a passion for designing user-friendly interfaces...'
    },
    {
        name: 'Bajram Rexhbeqaj',
        role: 'Front-end Developer',
        image: '/EventImages/Bajram Rexhbeqaj.jpeg',
        details: 'Bajram Rexhbeqaj is a talented Front-end Developer focused on delivering high-quality web experiences...'
    },
    {
        name: 'Art Hoxha',
        role: 'Front-end Developer',
        image: '/EventImages/Art Hoxha.jpeg',
        details: 'Art Hoxha is a creative Front-end Developer with a knack for turning complex designs into reality...'
    },
   
];

const OurTeam = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const openPopup = (member) => {
        setSelectedMember(member);
    };

    const closePopup = () => {
        setSelectedMember(null);
    };

    return (
        <div className="team-container">
            <h2 className="team-header">EventAL Team</h2>
            {teamMembers.slice(0, 2).map((member, index) => (
                <div key={index} className="team-member" onClick={() => openPopup(member)}>
                    <img src={member.image} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
            ))}
            {teamMembers.slice(2, 5).map((member, index) => (
                <div key={index} className="team-member" onClick={() => openPopup(member)}>
                    <img src={member.image} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
            ))}
            {selectedMember && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <img src={selectedMember.image} alt={selectedMember.name} className="popup-image"/>
                        <h2>{selectedMember.name}</h2>
                        <p>{selectedMember.role}</p>
                        <p>{selectedMember.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurTeam;
