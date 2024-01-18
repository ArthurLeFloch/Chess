import React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import "./style.css";

import Play from "./pages/Play.jsx";
import Login, { action as loginAction } from "./pages/Login.jsx";
import Register, { action as registerAction } from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";

import { requireAuth } from "./utils/auth.js";

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout />} >
		<Route index element={<h3>Index</h3>} />
		<Route path="play" element={<Play />} loader={async ({ request }) => await requireAuth(request)} />
		<Route path="login" element={<Login />} action={loginAction} />
		<Route path="register" element={<Register />} action={registerAction} />
		<Route path="*" element={<h3>Page not found</h3>} />
	</Route>
), { basename: process.env.PUBLIC_URL });

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
