// Fetch data function
function fetchData() {
  // Using JSONPlaceholder's posts endpoint to fetch posts
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      // Update the span content with the title of the first post
      updateDataSpan(posts);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to update the content of the span element
function updateDataSpan(posts) {
  const dataSpan = document.getElementById("data-span");
  if (dataSpan && posts.length > 0) {
    dataSpan.textContent = `First post title: ${posts[0].title}`;
  } else {
    dataSpan.textContent = "No posts available.";
  }
}

// Call the fetchData function to initiate the data fetch
fetchData();
