# JS-PostTweetFetch
Advanced JS - Assignment 1 - Post Tweet Using Fetch

## User flow
1. Visits post-tweet page.
2. Enters tweet. Frontend performs basic checks.
3. Makes request to backend.
4. Gets response and displays on console. Handle errors.
5. (Additional) Display new tweets.

## Requirements
1. Post Tweet Page.
2. Tweets Section Page to show new tweets (additional).
3. API endpoint to handle requests (using express here).
4. API should also perform basic checks, to counter other cases (eg: request made from CLI).
5. Handle Different Cases on both frontend and backend

## Cases Handled
1. Malformed URL (endpoint doesnt exist)
2. Authentication (user logged in and correct user)
3. Authorisation (user has permission to tweet)
4. Rate limiting (can tweet only after certain interval)
5. Duplicate Tweet
6. Tweet too long or Empty Tweet