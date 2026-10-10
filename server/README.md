# User Management API

## Run the API

From this directory, install dependencies and start the backend:

```sh
npm install
npm run dev
```

The API uses the `PORT` and `MONGO_URL` values configured in the server environment.

## Interactive API documentation

With the backend running, open [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs) to explore and send requests from Swagger UI. The machine-readable OpenAPI document is available at [`http://localhost:5000/api-docs.json`](http://localhost:5000/api-docs.json).

Use **Try it out** on an endpoint to submit a request. Register or log in to receive an access token and refresh-token cookie. Use **Authorize** and paste the access token to call protected routes. Swagger is served by this backend, so the browser sends the HttpOnly refresh cookie to the refresh and logout routes.

User list and details endpoints require authentication. Create, edit, and delete user endpoints require an authenticated user with the exact `Admin` role. Registration creates a regular `User`.
