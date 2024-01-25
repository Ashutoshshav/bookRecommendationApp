# Book Recommendations Web App

## Introduction

This web application provides personalized book recommendations using OpenAI's language model.

## Technologies Used

- Backend: Node.js with Express.js
- Database: MongoDB
- Frontend: HTML, Bootstrap with EJS
- AI Integration: OpenAI's GPT-3

## How to Run

1. Install dependencies: `npm install`
2. Start MongoDB: `mongod`
3. Start the Node.js server: `node app.js`
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app.js`: Backend server setup and logic
- `views/`: EJS templates for frontend views

## API Endpoints

- `/register`: User registration endpoint
- `/login`: User login endpoint
- `/profile`: User profile page

## Important Note

Make sure to replace 'api_key' in `app.js` with your actual OpenAI API key.

