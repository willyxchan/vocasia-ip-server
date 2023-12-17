const express = require("express");
const cors = require("cors");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const router = require("./router/routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is listened on http://localhost:${port}`);
});