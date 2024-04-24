function displayArticleImg(img) {
    const articleImgContainer = document.getElementById("article-img-container");
    articleImgContainer.style.display = "block";
    var articleImg = document.getElementById("article-img");
    articleImg.src = img;
}

export default displayArticleImg;