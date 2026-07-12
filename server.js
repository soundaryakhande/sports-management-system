const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const playerRoutes = require("./routes/playerRoutes");

app.use("/players", playerRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});