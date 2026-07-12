const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to players.json
const dataFile = path.join(__dirname, "../data/players.json");

// ===============================
// GET ALL PLAYERS
// ===============================
router.get("/", (req, res) => {

    fs.readFile(dataFile, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading player data."
            });
        }

        const players = data ? JSON.parse(data) : [];

        res.json(players);

    });

});


// ===============================
// ADD A NEW PLAYER
// ===============================
router.post("/", (req, res) => {

    const newPlayer = req.body;

    fs.readFile(dataFile, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading player data."
            });
        }

        const players = data ? JSON.parse(data) : [];

        newPlayer.id = players.length > 0
            ? players[players.length - 1].id + 1
            : 1;

        players.push(newPlayer);

        fs.writeFile(
            dataFile,
            JSON.stringify(players, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error saving player."
                    });
                }
                

                res.status(201).json({
                    message: "Player Registered Successfully!",
                    player: newPlayer
                });

            }
        );

    });

});


// ===============================
// DELETE PLAYER
// ===============================
router.delete("/:id", (req, res) => {

    const playerId = parseInt(req.params.id);

    fs.readFile(dataFile, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading player data."
            });
        }

        let players = data ? JSON.parse(data) : [];

        const updatedPlayers = players.filter(
            player => player.id !== playerId
        );

        fs.writeFile(
            dataFile,
            JSON.stringify(updatedPlayers, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error deleting player."
                    });
                }

                res.json({
                    message: "Player Deleted Successfully!"
                });

            }
        );

    });

});

module.exports = router;