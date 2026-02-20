# Kodbank Frontend

React-based frontend for the Kodbank digital banking application.

## Quick Start

### Installation
```bash
npm install
```

### Environment Setup
Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Development
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```

## Features

- **Home Page**: Welcome and navigation
- **Registration**: Create new account
- **Login**: Secure authentication
- **Dashboard**: View balance with animations
- **Responsive Design**: Mobile-friendly

## Pages

### Home (/)
- Welcome screen
- Feature showcase
- Navigation to register/login

### Register (/register)
- Create new account
- Input validation
- Auto-redirect to login on success

### Login (/login)
- Username & password authentication
- Token storage
- Auto-redirect to dashboard on success

### Dashboard (/dashboard)
- User welcome message
- Check balance button
- Balance display with confetti animation
- Logout button

## Components

- `Home.js` - Landing page
- `Register.js` - Registration form
- `Login.js` - Login form
- `Dashboard.js` - User dashboard

## Services

### api.js
API client with methods:
- `registerUser(userData)` - Register new user
- `loginUser(credentials)` - Login user
- `checkBalance(token)` - Fetch balance

## Styling

- `Auth.css` - Authentication pages styles
- `Dashboard.css` - Dashboard styles
- `Home.css` - Home page styles
- `App.css` - Global styles

## Dependencies

- React 18
- React Router DOM 6
- Axios
- Confetti React (for celebrations)

## Environment Variables

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API base URL |

## Build for Vercel

```bash
npm run build
```

The build folder will be deployed as static content.

## Technologies

- React 18
- React Router DOM
- Axios
- CSS3 with animations
- Confetti-react
