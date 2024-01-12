const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Book = require('./models/book');
const app = express();
const OpenAI = require("openai");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());

const port = 3000;

const seedBooks = async () => {
        const books = [
          { title: 'Book1', author: 'Author1', genre: 'Fiction' },
          { title: 'Book2', author: 'Author2', genre: 'Non-Fiction' },
        ];
      
        await Book.deleteMany({});
        await Book.insertMany(books);
      };
      
seedBooks();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/book_recommendations', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User model
const User = mongoose.model('User', { username: String, password: String, genres: String, authors: String });

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/register', async (req, res) => {
  const { username, password, genres, authors } = req.body;

  // Create a new user
  const newUser = new User({ username, password, genres, authors });
  await newUser.save();

  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ username, password });

  if (user) {
    // Redirect to user profile page
    res.redirect(`/profile/${user._id}`);
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

app.get('/profile/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.render('profile', { user });
});

app.post('/recommend', async (req, res) => {
        const { userId } = req.body;
      
        // Fetch user preferences from the database
        const user = await User.findById(userId);
        const { genres, authors } = user;
          
        // sending prompt for OpenAI's GPT-3 api
        const prompt = `Recommend books based on genres: ${genres} and authors: ${authors}`;

        const openai = new OpenAI({
          apiKey: api_key,
        });

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "user",
              "content": prompt
            }
          ],
          max_tokens: 150,
        });

        // sending response on browser
        res.send(response.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
