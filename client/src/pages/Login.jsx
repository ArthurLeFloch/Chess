import React from "react";
import { Link, Form, redirect, useNavigation, useActionData } from "react-router-dom";

import "./Auth.css";

import { login } from "../utils/auth.js";

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	console.log(`Email: ${email}`);
	console.log(`Password: ${password}`);

	const pathname = new URL(request.url).searchParams.get("redirectTo") || "/play";
	try {
		if (await login(email, password)) {
			return redirect(pathname);
		}
		return "Failed to log in";
	} catch (error) {
		return error.message;
	}
}

export default function Login() {
	const navigation = useNavigation();
	const errorMessage = useActionData();

	return (
		<div className="auth">
			<h1 className="auth--title">Sign in</h1>
			{errorMessage && <p className="auth--error">{errorMessage}</p>}
			<Form method="post" replace>
				<input className="auth--input" type="email" name="email" placeholder="Email" />
				<input className="auth--input" type="password" name="password" placeholder="Password" />
				<button className="auth--button" disabled={navigation.state === "submitting"}>
					{navigation.state === "submitting" ? "Signing in..." : "Sign in"}
				</button>
			</Form>
			<Link className="auth--link" to="/register">No account yet? Register here</Link>
		</div>
	);
}