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
            currentPokemon = {name: data.name, sprite: data.sprites.front_default};
            image.src = data.sprites.front_default;
        })
        .catch(error => console.log(error));
}

function checkGuess() {
    const guess = document.getElementById("guess").value.toLowerCase();
    const attemptText = document.getElementById("attempts");
    const textBar = document.getElementById("textBar");
    attempts -= 1;

    if (currentPokemon.name === guess) {
        textBar.innerHTML = `Correct: Pokemon Added!`;
        document.getElementById("guessButton").disabled = true
        // SEND A POST REQUEST
        // add the the pokemon to the correct pokemon list in the DB
        // increase the number guessed correctly for the user by 1
        fetch("/addPokemon", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentPokemon)
        });
    } else {
        if (attempts === 0) {
            textBar.innerHTML = `Incorrect: This is ${currentPokemon.name}!`;
            document.getElementById("guessButton").disabled = true
        }
    }

    attemptText.innerHTML = `Guesses left: ${attempts}`
}