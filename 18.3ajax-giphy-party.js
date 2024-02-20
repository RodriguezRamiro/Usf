
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* ajax result to add a gif*/
function addGif(res){
    let numResults = res.data.length;
    if(numResults){
        let randomIdx = Math.floor(Math.random()* numResults);
        let $newCol = $("<div>" , {class: "col-md-4 col-12 mb-4"});
        let $newGif = $("img",{ src: res.data[randomIdx].images.original.url, calss: "w-100" });

        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

//form submission -clear seacrbox and ajax call

$("form").on("submit", async function(e){
    e.preventDefault();
    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search",{
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    addGif(response.data);
});

/*remove Gif*/
$("#remove").on("click", function(){
    $gifArea.empty();
});


