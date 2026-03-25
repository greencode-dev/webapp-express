import db from "../data/db.js";

function index(req, res) {
    const sqlQuery = "SELECT * FROM movies";
    db.query(sqlQuery)
        .then(([movies]) => {
            const mappedMovies = movies.map(movie => ({
                ...movie,
                image: movie.image ? `http://localhost:${process.env.APP_PORT}/movies_cover/${movie.image}` : null
            }));
            res.json(mappedMovies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Errore del server", message: err.message });
        });
}

function show(req, res) {
    const sqlQueryMovie = `
        SELECT movies.*, AVG(reviews.vote) AS average_vote 
        FROM movies 
        LEFT JOIN reviews ON movies.id = reviews.movie_id 
        WHERE movies.id = ? 
        GROUP BY movies.id
    `;
    const sqlQueryReview = "SELECT * FROM reviews WHERE movie_id = ?";

    db.query(sqlQueryMovie, [req.params.id])
        .then(([movie]) => {
            if (movie.length === 0 || movie[0].id === null) {
                return res.status(404).json({ error: "Film non trovato", message: "Il film cercato non esiste" });
            }
            const movieObj = movie[0];
            if (movieObj.image) {
                movieObj.image = `http://localhost:${process.env.APP_PORT}/movies_cover/${movieObj.image}`;
            }
           
            db.query(sqlQueryReview, [req.params.id])
                .then(([reviews]) => {
                    movieObj.reviews = reviews;
                    res.json(movieObj);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: "Errore del server", message: err.message });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Errore del server", message: err.message });
        });
}

function store(req, res) {
    res.send("Store Page");
}

function update(req, res) {
    res.send("Update Page");
}

function destroy(req, res) {
    res.send("Destroy Page");
}

export default { index, show, store, update, destroy };   