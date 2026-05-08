let currentPokemon = null;
let attempts = 3;

getPokemon();

function getPokemon() {
    const id = Math.floor(Math.random() * 1000) + 1;
    let image = document.getElementById("pokeImg");

    attempts = 3;
    document.getElementById("guessButton").disabled = false;
    document.getElementById("textBar").innerHTML = "";
    document.getElementById("attempts").innerHTML = `Guesses left: ${attempts}`;
    document.getElementById("guess").value = "";

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Invalid URL");
        })
        .then(data => {
            currentPokemon = data.name;
            image.src = data.sprites.front_default;
        })
        .catch(error => console.log(error));
}

function checkGuess() {
    console.log("hi");
    const guess = document.getElementById("guess").value.toLowerCase();
    const attemptText = document.getElementById("attempts");
    const textBar = document.getElementById("textBar");
    attempts -= 1;

    if (currentPokemon === guess) {
        textBar.innerHTML = `Correct: Pokemon Added!`;
        document.getElementById("guessButton").disabled = true
        // add the the pokemon to the correct pokemon list in the DB
        // increase the number guessed correctly for the user by 1
    } else {
        if (attempts === 0) {
            textBar.innerHTML = `Incorrect: This is ${currentPokemon}!`;
            document.getElementById("guessButton").disabled = true
        }
    }

    attemptText.innerHTML = `Guesses left: ${attempts}`
}