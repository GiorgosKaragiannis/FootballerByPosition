const tag = document.getElementById("player");
const userInput = document.getElementById("userInput");

function generatePlayer() {
    const value = userInput.value; 
    const index = Number(value);

    if(!value || Number.isNaN(index) || index < 1 || index > 11) {
        tag.innerText = "Position must be a number between 1 and 11.";
        return;
    }

    fetch(`http://localhost:3000/player/${index}`)
        .then(response => response.text())
        .then(playerName => {
            tag.innerHTML = playerName;
        })
        .catch(err => {
            console.error(err);
            tag.innerHTML = "Error fetching player";
        });
}

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        generatePlayer();
    }
});
