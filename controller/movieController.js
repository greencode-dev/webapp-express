import db from "../data/db.js";

function index(req, res) {
    const sql = "SELECT * FROM movies";
    db.query(sql)
        .then(([result]) => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Errore del server", message: err.message });
        });
}

function show(req, res) {
    const sqlQueryMovie = "SELECT * FROM movies WHERE id = ?";
    const sqlQueryReview = "SELECT * FROM reviews WHERE movie_id = ?";

    db.query(sqlQueryMovie, [req.params.id])
        .then(([movie]) => {
            if (movie.length === 0 || movie[0].id === null) {
                return res.status(404).json({ error: "Film non trovato", message: "Il film cercato non esiste" });
            }
            const movieObj = movie[0];
           
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