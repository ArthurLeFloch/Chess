import React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from "react-router-dom";

import "./style.css";

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<div><h1>Chess</h1><Outlet /></div>} >
		<Route index element={<h3>Index</h3>} />
		<Route path="play" element={<h3>Play</h3>} /> {/* Protected route */}
		<Route path="login" element={<h3>Login</h3>} />
		<Route path="*" element={<h3>Page not found</h3>} />
	</Route>
), { basename: process.env.PUBLIC_URL });

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
