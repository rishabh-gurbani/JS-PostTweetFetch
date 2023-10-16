const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());

// Serve static files from the "public" directory for images
app.use(express.static(path.join(__dirname, '')));

// Serve static files from the "src" directory for HTML and CSS
app.use(express.static(path.join(__dirname, 'src')));

// Serve static files from the "dist" directory for your Tailwind CSS output
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// only for demo purposes.
// ideally stored in a db
// and separate data structures for each.
const users = [
    {
        id: 789123,
        username: 'Rishabh',
        authToken: '12yoda328yoda',
        canPost: true,
        tweets: [
            {
                tweet_id: 21,
                content: "hello",
                media: [],
                timestamp: Date.parse("2021-01-01"),
                likes: 15,
                retweets: 1,
            },
        ],
    },
    {
        id: 843427,
        username: 'Rock',
        authToken: '12d23edda',
        canPost: false,
        tweets: [
            {
                tweet_id: 27,
                content: "wassup",
                media: [],
                timestamp: Date.parse("2021-01-01"),
                likes: 201,
                retweets: 45,
            },
        ],
    }
];

const getUserByID = (userID) => users.find((user) => user['id'] === userID);

// middleware to check user authenticated or not
const authenticateUser = (req, res, next) => {
    const headers = req.headers;
    const userID = Number(headers['user-id']);
    const authToken = headers['authorization'];

    if (isNaN(userID) || authToken === 'null') {
        return res.status(401).json({ message: 'User ID or auth token not provided!' });
    }

    const user = getUserByID(userID);

    if (!user || user.authToken !== authToken) {
        return res.status(401).json({ message: 'Invalid User or Auth Token!' });
    }

    next();
}

const rateLimit = (user) => {
    const rateLimitMs = 3 * 1000;
    const tweets = user.tweets;
    const lastTweetTimestamp = tweets.slice(-1)[0]?.timestamp;
    if(!lastTweetTimestamp) return true;
    return Date.now() - lastTweetTimestamp >= rateLimitMs;
}

const isDuplicateTweet = (user, tweetContent) => {
    const tweets = user.tweets;
    const lastTweet = tweets.slice(-1)[0].content;
    if(lastTweet){
        return lastTweet === tweetContent;
    }
    return false;
}

const maxTweetLength = 250;

app.post('/api/createTweet', authenticateUser, (req, res) => {
    const userID = Number(req.headers['user-id']);
    const user = getUserByID(userID);

    // canWrite check
    if(!user.canPost){
        return res.status(403).json({message: 'User not allowed to post.' });
    }

    // rate limit
    if(!rateLimit(user)) {
        return res.status(429).json({message: 'Exhausted limit. Wait for some time before posting.'});
    }

    // duplicate tweet
    const tweetContent = req.body.content;
    if(isDuplicateTweet(user, tweetContent)){
        return res.status(400).json({message: 'Attempt to post duplicate tweet!'});
    }

    if(tweetContent.length === 0){
        return res.status(400).json({message: 'Empty tweet.'});
    }

    if(tweetContent.length > maxTweetLength){
        return res.status(400).json({message: 'Tweet limit exceeded.'});
    }

    const newTweet = {
            tweet_id: Math.floor(Math.random()*100),
            content: tweetContent,
            media: [],
            timestamp: Date.now(),
            likes: 0,
            retweets: 0,
    }

    user.tweets.push(newTweet);

    return res.status(201).json({
        posted: true,
        ...newTweet,
    })

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})