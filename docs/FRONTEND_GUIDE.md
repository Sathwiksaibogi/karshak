# Karshak Frontend Guide
## Overview
The Karshak frontend provides separate user experiences for farmers and buyers. It is built with
React and Vite and communicates with the Karshak backend through REST APIs.

Karshak Contributor Task • Abhishek1692004 • Repository: Sathwiksaibogi/karshak

## Frontend Technologies
- React.js
- Vite
- JavaScript
- React Router
- Axios
- CSS
## Main User Flows
### Farmer Flow
A farmer can:
1. Register or log in.
2. Open the farmer dashboard.
3. Add agricultural products.
4. Add product information such as price, quantity, description, and image.
5. View listed products.
6. View and manage incoming orders.
7. Maintain farmer profile information.
### Buyer Flow
A buyer can:
1. Register or log in.
2. Open the buyer dashboard.
3. Browse agricultural product categories.
4. View product details.
5. Continue through the purchase and checkout flow.
6. Place an order.
7. View personal order history.
## Authentication and Routing
Karshak uses role-based application flows for Farmer and Buyer users. After authentication, the
application can direct the user to the appropriate experience based on the user role. Protected
backend routes use JWT-based authentication.
## Frontend and Backend Communication
The React frontend sends HTTP requests to the Node.js and Express backend. Axios is used for API
communication. The backend handles authentication, products, categories, users, and orders.
## Running the Frontend Locally
From the Karshak repository:
```bash
cd client
npm install
npm run dev
```
Vite starts the frontend development server. The exact local URL is shown in the terminal when the
server starts.

Karshak Contributor Task • Abhishek1692004 • Repository: Sathwiksaibogi/karshak

## Production Frontend
The production frontend is deployed on Vercel:
https://karshak-client.vercel.app/
## Future Frontend Improvements
Possible future improvements include:
- Improved responsive UI/UX
- Better search and filtering
- Product reviews and ratings
- Notifications
- Better farmer analytics
- Improved testing coverage
---
This guide provides a simple overview of the current Karshak frontend and its major user flows.