export const postTweet = async (tweet) => {

    const userID = 789123;
    const authToken = '12yoda328yoda';

    const headers = {
        'Content-type': 'application/json',
        'Authorization': authToken,
        'User-ID': userID,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    };

    const body = JSON.stringify({
        'content': tweet,
        'media': [],
    });

    try{
        const response = await fetch('http://localhost:3000/api/createTweet',
            {
                method: 'POST',
                headers: headers,
                body: body,
            }
        );
        const data = await response.json();

        if(response.ok){
            console.log(data);
            const { content, timestamp, likes, comments, retweets, stats } = data;
            return {
                content, timestamp , likes, comments, retweets, stats
            }
        } else {
            console.log(response.status);
            console.log(data.message);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// postTweet(`w`).then();
