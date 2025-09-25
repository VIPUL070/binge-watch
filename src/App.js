import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import MOVIE_KEY from "./config";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = MOVIE_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id){
     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id ))
  }


  useEffect(() => {

    const controller = new AbortController();

    async function fetchMovies() {

      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal : controller.signal }

        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();

        if (data.Response === 'False') throw new Error("Movie not Found");

        setMovies(data.Search);
        setError('');

      } catch (err) {
        if(err.name !== "AbortError")
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }
    
    handleCloseMovie();
    fetchMovies();
    return () => { controller.abort()}

  }, [query])

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      {/* component composition */}
      <Main>

        <Movies>
          {isLoading && <Loader />}

          {!isLoading && !error &&
            <MovieList movies={movies}
              onSelectMovie={handleSelectMovie}
            />}

          {error && <ErrorMsg message={error} />}

        </Movies>

        <Movies>
          {selectedId
            ? <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
            :
            <>
              <Summary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>
          }

        </Movies>

      </Main>
    </>
  );
}

function Loader() {
  return <h1 className="loader">Loading...</h1>
}

function ErrorMsg({ message }) {
  return <h1 className="error">{message}</h1>
}

function Navbar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>BingeWatch</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{ }</strong> results
      </p>
    </nav>
  );
}

function ToggleButton({ onClick, isOpen }) {
  return (
    <button className="btn-toggle" onClick={onClick} >
      {isOpen ? "–" : "+"}
    </button>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies" >
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movies({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton
        onClick={() => setIsOpen((open) => !open)}
        isOpen={isOpen}>
      </ToggleButton>

      {isOpen && children}
    </div>
  );
}

function SelectedMovie({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find
  ((movie) => movie.imdbID === selectedId)?.userRating;

  function handleNewMovie() {
    const newMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating
    };

    onAddWatched(newMovie)
    onCloseMovie();
  }

  useEffect(() => {

    function callBack(e){
      if(e.key === "Escape"){
        onCloseMovie();
      }
    }

    document.addEventListener("keydown" , callBack);

    return () => {document.removeEventListener('keydown' , callBack)}

  },[onCloseMovie])

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }

    getMovieDetails();
  }, [selectedId])


  useEffect(() => {
    if(!movie.Title) return;
    document.title = `Movie | ${movie.Title} `;

    //cleanup function
    return () => {document.title = "Binge Watch"};
  },[movie.Title])


  return (
    <div className="details">
      {loading ? <Loader />
        :
        (<>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span> {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating maxRating={10} size={25} onSetRating={setUserRating} />

                  {userRating > 0 &&
                    <button className="btn-add"
                      onClick={handleNewMovie}>
                      + Add to list
                    </button>}
                </>
                :
                <p>You rated it already {watchedUserRating}⭐</p>
              }
            </div>
            <p><em>{movie.Plot}</em></p>
            <p>Actors : {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
        )}
    </div>
  );
}

// function WatchedMovies() {
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <ToggleButton 
//         onClick={() => setIsOpen2((open) => !open)}
//         isOpen={isOpen2}
//         >
//       </ToggleButton>

//       {isOpen2 && (
//         <>
//           <Summary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }


function Watched({ movie , onDeleteWatched}) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
        >x</button>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched , onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched movie={movie} onDeleteWatched={onDeleteWatched}/>
      ))}
    </ul>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

export default App