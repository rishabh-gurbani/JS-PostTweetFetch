import {postTweet} from './post-tweet.js';

const characterCount = document.querySelector("#character-count");
const textArea = document.querySelector("textarea");
const postButton = document.querySelector("#post-button");

textArea.addEventListener('input', function () {
    const text = textArea.value;
    characterCount.textContent = text.length;
    if(text.length>280){
        characterCount.classList.add("text-red-500");
        characterCount.textContent = `${280 - text.length}`;
    } else {
        characterCount.classList.remove("text-red-500");
    }

    postButton.disabled = text.length === 0 || text.length > 280;
});

postButton.addEventListener('click',  async () => {
    await postTweet(textArea.value);
    textArea.value = '';
    characterCount.textContent = `0`;
    postButton.disabled = true;
});
