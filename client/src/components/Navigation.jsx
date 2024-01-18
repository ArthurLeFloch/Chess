import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
	return (
		<nav className="nav">
			<NavLink className="nav--title" to="/" end>Chess</NavLink>
			<NavLink className="nav--link" to="/play">Play</NavLink>
			<NavLink className="nav--link" to="/login">Login</NavLink>
		</nav>
	);
}