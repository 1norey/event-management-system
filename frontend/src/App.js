// src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Event from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import Reservations from './pages/Reservations';
import OurTeam from './pages/OurTeam'; // Import OurTeam component
import PrivateRoute from './components/PrivateRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} allowedRoles={['admin']} />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/create" element={<PrivateRoute component={CreateEvent} allowedRoles={['admin']} />} />
                <Route path="/events/:id" element={<Event />} />
                <Route path="/reservations" element={<PrivateRoute component={Reservations} allowedRoles={['user', 'admin']} />} />
                <Route path="/our-team" element={<OurTeam />} /> {/* Route for OurTeam component */}
            </Routes>
        </div>
    );
}

export default App;
