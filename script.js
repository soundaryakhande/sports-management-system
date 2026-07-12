const playerForm = document.getElementById("playerForm");

if (playerForm) {
    playerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const player = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            sport: document.getElementById("sport").value,
            phone: document.getElementById("phone").value
        };

        try {
            const response = await fetch("/players", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(player)
            });

            const data = await response.json();

            alert(data.message);

            playerForm.reset();

            window.location.href = "players.html";

        } catch (error) {
            console.log(error);
            alert("Failed to register player.");
        }
    });
}




let players = [];

async function loadPlayers() {

    const tableBody = document.getElementById("playerBody");

    if (!tableBody) return;

    try {

        const response = await fetch("/players");

        players = await response.json();

        displayPlayers(players);

    } catch (error) {

        console.log(error);

    }

}


function displayPlayers(data) {

    const tableBody = document.getElementById("playerBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No Players Found</td>
            </tr>
        `;

        return;
    }

    data.forEach(player => {

        tableBody.innerHTML += `
            <tr>
                <td>${player.id}</td>
                <td>${player.name}</td>
                <td>${player.age}</td>
                <td>${player.gender}</td>
                <td>${player.sport}</td>
                <td>${player.phone}</td>
                <td>
                    <button onclick="deletePlayer(${player.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}




function searchPlayer() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = players.filter(player =>
        player.name.toLowerCase().includes(search) ||
        player.sport.toLowerCase().includes(search)
    );

    displayPlayers(filtered);

}




async function deletePlayer(id) {

    const confirmDelete = confirm("Are you sure you want to delete this player?");

    if (!confirmDelete) return;

    try {

        await fetch(`/players/${id}`, {
            method: "DELETE"
        });

        loadPlayers();

    } catch (error) {

        console.log(error);

    }

}



loadPlayers();