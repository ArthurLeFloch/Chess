
const credentials = { email: 'user@user', password: '1234' };

async function getToken() {
	const res = await fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	const data = await res.json();
	console.log(res.status);
	return data.token;
}

async function tryAuth() {
	const token = await getToken();
	console.log(token);
	const res = await fetch('http://localhost:8080/auth', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
	const data = await res.json();
	console.log(data);
}

let token = '';

async function main() {
	await tryAuth();
}

main();