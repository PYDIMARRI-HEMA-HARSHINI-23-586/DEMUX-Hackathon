const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;
const jwtSecret = 'your_jwt_secret';  // Replace with your own secret

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecowatt', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));  // Serve static files from the frontend folder

// Sign-Up Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// Sign-In Route
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(400).send('Error signing in');
    }
});

// Serve HTML Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
});

app.get('/signin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signin.html'));
});

app.get('/quiz.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'quiz.html'));
});

app.get('/tutorials.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'tutorials.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
