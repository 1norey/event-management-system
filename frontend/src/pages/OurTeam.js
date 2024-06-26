import React from 'react';
import './ourteam.css';

const OurTeam = () => {
    return (
        <div className="team-container">
            <div className="team-member">
                <img src="/EventImages/" alt="Member 1" />
                <h3>Rinor Bytyqi</h3>
                <p>Full-Stack Developer</p>
            </div>
            <div className="team-member">
                <img src="/EventImages/" alt="Member 2" />
                <h3>Egzon Gjoklaj</h3>
                <p>Full-Stack Developer</p>
            </div>
            <div className="team-member">
                <img src="/EventImages/Art Zherka.jpg" alt="Member 3" />
                <h3>Art Zherka</h3>
                <p>Front-end Developer</p>
            </div>
            <div className="team-member">
                <img src="/EventImages/" alt="Member 3" />
                <h3>Art Hoxha</h3>
                <p>Front-end Developer</p>
            </div>
            <div className="team-member">
                <img src="/EventImages/" alt="Member 3" />
                <h3>Bajram Rexhbeqaj</h3>
                <p>Front-end Developer</p>
            </div>
        </div>
    );
};

export default OurTeam;
