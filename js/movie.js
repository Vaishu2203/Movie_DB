
/*<div class="movie">
            
        </div>
        */
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-search');
const moviesContainer = document.querySelector('#movies-container');




function movieSelection(movies){   
    return movies.map((movie)=>{
       if(movie.poster_path){
        return `<img 
        src=${imgurl + movie.poster_path}
        data-movie-id=${movie.id}/> <span class="badge" id=${movie.title}></span>;`;
        
       }
    })
}

function createMovieContainer(movies,title=''){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate =`
    <h2>${title}</h2>
    <section class="section">
        ${movieSelection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;
    movieElement.innerHTML = movieTemplate;
    return movieElement;

}

function renderSearchMovies(data){
    movieSearchable.innerHTML = '' ;
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ',data);
}

function renderMovies(data){
    
    const movies = data.results;
    const movieBlock = createMovieContainer(movies,this.title);
    moviesContainer.appendChild(movieBlock);
    
}

function handleError(error){
    console.log('Error:',error);
}
buttonElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value;
    sesarchMovie(value);

    inputElement.value = '';
    console.log('Value:',value);

}
function createVideoTemplate(data ,content){
    console.innerHTML= '<p id="content-close">X</p>';
    console.log('Videos: ',data);
    const videos = data.results;
    const lenght = videos.length>4 ? 4:videos.lenght;
    const iframeContainer = document.createElement('div');
    for(let i=0;i< videos.length;i++){
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }           
}

function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.height = 315;
    iframe.width = 360;
    iframe.allowFullscreen = true;

    return iframe;

}

document.onclick = function(event){
    const target = event.target;
    if(target.tagName.toLowerCase() == 'img'){
        console.log('hello there..');
        console.log('Event:',event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID:',movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieId}videos`;
        const url = generateUrl(path);


        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data,content))
            .catch((error)=>{
                console.log('Error: ',error);
            });
    }
    if(target.id =='content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
    
}

getUpcomingMovie();

getTopRatedMovie();

getPopularMovie();

