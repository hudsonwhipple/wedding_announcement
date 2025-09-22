# Sara & Hudson Wedding Website

A beautiful, animated React website for wedding announcements and RSVPs.

## Features

- 🎨 Animated background with floating bubbles
- 💕 Romantic loading screen with floating hearts
- 📱 Fully responsive design for mobile and desktop
- 📝 Google Forms integration for RSVP collection
- ✨ Smooth animations and hover effects

## Live Website

[Visit the wedding website](https://your-vercel-url.vercel.app)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`

## Google Forms Integration

The form submissions are connected to a Google Form. To set up:

1. Create a Google Form with the required fields
2. Get the form action URL and entry IDs
3. Update the form URL and entry IDs in `src/App.js`

## Deployment

This project is automatically deployed to Vercel when changes are pushed to the main branch.
3. Open the link and inspect the form fields
4. Find the `name` attributes (they look like `entry.123456789`)
5. Replace the placeholders in App.js with these actual entry IDs
