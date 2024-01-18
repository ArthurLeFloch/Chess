import { redirect } from "react-router-dom";

function getStorredToken() {
	console.log(document.cookie);
	return document.cookie.length > 0 ? document.cookie.split('=')[1] : null;
}

export async function register(email, password) {
	let res = await fetch('http://localhost:8080/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	res = await res.json();
	console.log(res);
	if (res.token) {
		console.log(res.token);
		document.cookie = `token=${res.token}`;
		return true;
	}
	console.log(res.message);
	return false;
}

export async function login(email, password) {
	let res = await fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	res = await res.json();
	console.log(res);
	if (res.token) {
		console.log(res.token);
		document.cookie = `token=${res.token}`;
		return true;
	}
	console.log(res.message);
	return false;
}

export async function isLoggedIn() {
	const token = getStorredToken();
	console.log("isLoggedIn");
	if (!token) {
		console.log("no token");
		return false;
	}
	const res = await fetch('http://localhost:8080/auth', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
	const data = await res.json();
	console.log(data);
	console.log(res.status);
	return res.status === 200;
}

export async function requireAuth(request) {
	const env = process.env.PUBLIC_URL;
	const pathname = new URL(request.url).pathname.replace(env, "");

	if (!await isLoggedIn()) {
		console.log("redirecting");
		throw redirect("/login?redirectTo=" + pathname);
	}

	return null;
}