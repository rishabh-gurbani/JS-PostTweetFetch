const dummyTweets = [
    {
        username: 'name',
        userHandle: 'handle',
        timestamp: '32',
        content: "Don't wish for it, work for it.",
        likes: 1459,
        comments: 11,
        retweets: 270,
        stats: 1869
    },
    {
        username: 'name',
        userHandle: 'handle',
        timestamp: '32',
        content: "Don't wish for it, work for it.",
        likes: 1459,
        comments: 11,
        retweets: 270,
        stats: 1869
    },
    {
        username: 'name',
        userHandle: 'handle',
        timestamp: '32',
        content: "Don't wish for it, work for it.",
        likes: 1459,
        comments: 11,
        retweets: 270,
        stats: 1869
    }
];

if (!sessionStorage.getItem('tweets')) {
    sessionStorage.setItem('tweets', JSON.stringify(dummyTweets));
}

const tweets = JSON.parse(sessionStorage.getItem('tweets'));

const tweetComponent = (tweet) => {
    const timestamp = tweet.timestamp.toString().length > 2
        ? Math.floor((Date.now() - tweet.timestamp)/60000) : tweet.timestamp;
    return `
        <article class="flex text-neutral-50 border-b border-neutral-700 w-full px-4 py-2 bg-black round">
            <img src="/images/user-avatars/user-avatar-2.png" class="w-12 h-12 mt-1 rounded-full">
            <div class="ml-4 w-full">
                <div class="flex p-0">
                    <div class="mr-2 font-semibold">${tweet.username || "name"}</div>
                    <div class="mr-1 text-neutral-500">@${tweet.handle || "handle"}</div>
                    <div class="mr-1 text-neutral-500">•</div>
                    <div class="mr-1 text-neutral-500">${timestamp} min</div>
                </div>
                <p class="text-15 mb-2">
                    ${tweet.content}
                </p>

                <!-- Actions -->
                <div class="flex w-full justify-between my-4">
                    <div class="flex items-center gap-1">
                        <button>
                            <img src="/images/tweet-actions/comment.svg"  class="w-3.5 h-auto">
                        </button>
                        <div class="text-sm text-neutral-500">${tweet.comments}</div>
                    </div>
                    <div class="flex items-center gap-1">
                        <button>
                            <img src="/images/tweet-actions/rt.svg" class="w-4 h-auto">
                        </button>
                        <div class="text-sm text-neutral-500">${tweet.retweets}</div>
                    </div>
                    <div class="flex items-center gap-1">
                        <button>
                            <img src="/images/tweet-actions/heart.svg" class="w-3.5 h-auto">
                        </button>
                        <div class="text-sm text-neutral-500">${tweet.likes}</div>
                    </div>
                    <div class="flex items-start gap-1">
                        <button>
                            <img src="/images/tweet-actions/stats.svg" class="w-3.5 h-auto">
                        </button>
                        <div class="mt-0.5 text-sm self-end text-neutral-500">${tweet.stats}</div>
                    </div>
                    <div class="flex items-center">
                        <button>
                            <img src="/images/tweet-actions/share.svg" class="w-3.5 h-auto">
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `
}

const tweetsSection = document.querySelector("#tweets");
tweetsSection.innerHTML = tweets.map(tweet => tweetComponent(tweet)).join("\n");
