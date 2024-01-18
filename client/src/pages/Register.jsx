import React from "react";
import { Link, Form, redirect, useLocation, useNavigation, useActionData } from "react-router-dom";

import "./Auth.css";

import { register } from "../utils/auth.js";

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	if (password !== confirmPassword) {
		return "Passwords do not match";
	}

	console.log(`Email: ${email}`);
	console.log(`Password: ${password}`);

	const pathname = new URL(request.url).searchParams.get("redirectTo") || "/play";
	try {
		if (await register(email, password)) {
			return redirect(pathname);
		}
		return "Failed to log in";
	} catch (error) {
		return error.message;
	}
}

export default function Register() {
	const navigation = useNavigation();
	const errorMessage = useActionData();
	const { search } = useLocation();
	console.log(search);

	return (
		<div className="auth">
			<h1 className="auth--title">Create an account</h1>
			{errorMessage && <p className="auth--error">{errorMessage}</p>}
			<Form method="post" replace>
				<input className="auth--input" type="email" name="email" placeholder="Email" />
				<input className="auth--input" type="password" name="password" placeholder="Password" />
				<input className="auth--input" type="password" name="confirmPassword" placeholder="Confirm password" />
				<button className="auth--button">
					{navigation.state === "submitting" ? "Signing up..." : "Sign up"}
				</button>
			</Form>
			<Link className="auth--link" to="/login">Already have an account? Sign in here</Link>
		</div>
	);
}