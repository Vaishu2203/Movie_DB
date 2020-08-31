
const imgurl = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=1603c434ca92923f370ae582420bcae4'


function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=1603c434ca92923f370ae582420bcae4`
    return url;
}
function requestMovies(url, onComplete,onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function sesarchMovie(value){
    const path = '/search/movie';
    const url= generateUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies,handleError);

}
function getUpcomingMovie(){
    const path = '/movie/upcoming';
    const url= generateUrl(path);
    const render= renderMovies.bind({ title:'UpComing Movies'});
    requestMovies(url, render,handleError);

}

function getTopRatedMovie(){
    const path = '/movie/top_rated';
    const url= generateUrl(path);
    const render= renderMovies.bind({ title: 'Top Rated Movies'});
    requestMovies(url, render,handleError);

}

function getPopularMovie(){
    const path = '/movie/popular';
    const url= generateUrl(path);
    const render= renderMovies.bind({title:'Popular Movies' });
    requestMovies(url, render,handleError);

}
