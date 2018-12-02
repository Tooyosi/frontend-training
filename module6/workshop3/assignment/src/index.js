(function(){
    const host = 'http://api.giphy.com/v1';
    const apiKey = 'iwTVKSrJ1kuws0AH3yLhCteDIMspgpk6';
    const form = document.getElementById('search');
    const input = document.getElementById('name');
    const output = document.getElementById('headerInfo');
    var images = document.querySelectorAll('img');

    form.addEventListener('click', function(e){
        e.preventDefault();
        output.textContent = 'Loading...';
        axios.get(`${host}/gifs/search?q=${input.value}&api_key=${apiKey}%limit=3`)
        .then(function(response){
            output.textContent = '';
            const { data: { data } } = response;
            data.forEach((gif) => {
                images.forEach((image)=>{
                    image.src = gif.images.original.url;
                });
            });
        })
        .catch(function(err){
            console.log(err);
            output.textContent = err;
        })
    })
}());