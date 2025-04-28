async function fetchTweets() {
  const res = await fetch("/api/tweets");
  return await res.json();
}

async function renderTweets() {
  const tweets = await fetchTweets();

  const tweetsDiv = document.getElementById("tweets");
  tweets.forEach((tweet) => {
    const div = document.createElement("div");
    div.className = "tweet";
    div.innerHTML = `
    <div class="tweet-body-row">
        <p>${tweet.content}</p>
    </div>
    <div class="tweet-author">
        <p>- ${tweet.username}</p>
    </div>
    <div class="tweet=action">
        <button>좋아요</button>
        <p>좋아요 수 : ${tweet.likes_count}</p>
    </div>
    `;
    tweetsDiv.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", renderTweets);
