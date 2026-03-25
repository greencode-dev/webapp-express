import express from "express";
import router from "./router/movieRouter.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto sul nostro Server Express!");
});

app.use("/api/movies", router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log(`Express avviato correttamente su http://localhost:${process.env.APP_PORT}/`);
});
