async function fetchTweets() {
  const res = await fetch("/api/tweets");
  const data = await res.json();
  console.log("tweet info : ", data);

  return data;
}

async function likeTweet(id) {
  console.log(`btn click: ${id}`);
  const res = await fetch(`/api/like/${id}`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) {
    alert(data.msg);
  } else {
    renderTweets();
  }
}

async function renderTweets() {
  const tweets = await fetchTweets();

  const tweetsDiv = document.getElementById("tweets");
  tweetsDiv.innerHTML = "";
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
    <div class="tweet-action">
        <button id="likeBtn">좋아요</button>
        <p>좋아요 수 : ${tweet.likes_count}</p>
    </div>
    `;
    tweetsDiv.appendChild(div);

    document
      .getElementById("likeBtn")
      .addEventListener("click", likeTweet(tweet.tweet_id));
  });
}

document.addEventListener("DOMContentLoaded", renderTweets);
