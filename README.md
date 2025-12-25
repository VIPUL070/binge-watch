# Binge Watch 🎬

A movie search and discovery web application inspired by IMDb. Search for movies, explore details, ratings, and build your personal watchlist.

## Features ✨

- **Movie Search** - Search for any movie by title
- **Detailed Information** - View comprehensive movie details including ratings, plot, cast, and more
- **Watchlist** - Add movies to your personal watchlist
- **Rate Movies** - Give your own ratings to movies you've watched
- **Real-time Data** - Powered by the OMDb API for up-to-date movie information
- **Clean Interface** - Simple and intuitive user experience

## Demo 🎯

Perfect for:

- Movie enthusiasts looking to discover new films
- Keeping track of movies you want to watch
- Building a personal movie collection
- Quick movie information lookup

## Tech Stack 🛠️

- **React** - Frontend library for building user interfaces
- **OMDb API** - Movie database API for fetching movie data
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Custom styling

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OMDb API Key (get one free at [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository

```bash
git clone https://github.com/VIPUL070/binge-watch.git
```

2. Navigate to the project directory

```bash
cd binge-watch
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the root directory and add your OMDb API key

```bash
REACT_APP_OMDB_API_KEY=your_api_key_here
```

5. Start the development server

```bash
npm start
```

6. Open your browser and visit `http://localhost:3000`

## How to Use 📖

1. **Search for Movies** - Type a movie name in the search bar
2. **Browse Results** - Click on any movie to see detailed information
3. **Add to Watchlist** - Save movies you want to watch later
4. **Rate Movies** - Give your personal rating to movies
5. **Manage Watchlist** - View and manage your saved movies

## Project Structure 📁

```
binge-watch/
├── public/            # Static files
├── src/
│   ├── components/    # React components
│   ├── App.js         # Main application component
│   ├── index.js       # Entry point
│   └── index.css      # Global styles
└── package.json       # Project dependencies
```

## API Integration 🔌

This project uses the [OMDb API](http://www.omdbapi.com/) to fetch movie data. The API provides:

- Movie search functionality
- Detailed movie information
- Ratings from various sources (IMDb, Rotten Tomatoes, Metacritic)
- Movie posters and images

## Features in Detail 🔍

### Movie Search

Search through millions of movies with instant results as you type.

### Movie Details

View comprehensive information including:

- Title, year, and runtime
- Genre and director
- Cast and crew
- Plot summary
- IMDb rating and other ratings
- Movie poster

### Personal Watchlist

- Add movies to watch later
- Remove movies from watchlist
- Persistent storage using localStorage

### User Ratings

Rate movies on your own scale and keep track of your opinions.

## Contributing 🤝

Contributions are welcome! Feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements 🔮

- User authentication and cloud sync
- Movie recommendations based on preferences
- Social features (share watchlists, reviews)
- TV series support
- Advanced filters (genre, year, rating)
- Trending movies section
- Mobile app version

## Acknowledgments 🙏

- [OMDb API](http://www.omdbapi.com/) for providing movie data

## Contact 📧

VIPUL070 - [@VIPUL070](https://github.com/VIPUL070)

Project Link: [https://github.com/VIPUL070/binge-watch](https://github.com/VIPUL070/binge-watch)

---

⭐ If you find this project helpful, please consider giving it a star!
