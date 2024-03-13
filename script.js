const apiKey ="8a56db4c441b400d94eb5feb2ed16b9c";

const blogContainer = document.getElementById
("blog-container");
const searchfield = document.getElementById
('search-input');
const searchbutton = document.getElementById
('search-button');

async function fetchRandomNews(){
    try{
       const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
       const response =await fetch(apiUrl);
       const data = await response.json();
       return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return[];
    }
}
searchbutton.addEventListener("click",async ()=>{
    const query = searchfield.value.trim();
    if(query!=""){
        try{
         const articles = await fetchNewsQuery(query);
         displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news  by query",error);
        }
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response =await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
     }catch(error){
         console.error("Error fetching random news",error);
         return[];
     }

}
function displayBlogs(articles){
    blogContainer.innerHTML ="";

    // articles.map(e=>{

    // })
    articles.map((article)=>{
        const blogCard = document.createElement
        ("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src =article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30?article.title.slice(0,30)+"....."
        : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement
        ("p");
        const truncatedDes =
        article.description&&article.description.length > 120 ? article.description.slice(0, 120) + "....."
        : article.description;
    description.textContent= truncatedDes;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

// (async()=>{
//     try{
//        const articles= await fetchRandomNews();
//        displayBlogs(articles);
//     } catch (error) {
//      console.error("Error fetching random news",error);
//     }
// })();


 fetchRandomNews().then(e=>{
    displayBlogs(e);
}).catch(e=>
    {
        console.log(e)
    })

    
    
