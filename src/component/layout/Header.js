import React from 'react';
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <div className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "")}>Home</NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? "text-primary" : "")}>Movie</NavLink>
    </div>
  );
};

export default Header;