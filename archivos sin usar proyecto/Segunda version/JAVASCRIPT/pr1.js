// Define una matriz con pares de números del 1 al 8
let numbers = [];

// Variable para almacenar la dificultad seleccionada
let selectedDifficulty = '';

// Función para barajar aleatoriamente los números en la matriz
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para revelar la tarjeta y verificar si es un par
let selectedCards = [];
function revealCard(card, index) {
    // Evita que se revelen más de 2 cartas al mismo tiempo
    if (selectedCards.length < 2) {
        card.textContent = numbers[index];
        selectedCards.push({ card, number: numbers[index], index });

        // Verifica si se han revelado 2 cartas
        if (selectedCards.length === 2) {
            // Si son iguales, desactívalas, si no, vuelve a ocultarlas después de un segundo
            if (selectedCards[0].number === selectedCards[1].number) {
                setTimeout(() => {
                    selectedCards.forEach(({ card }) => {
                        card.removeEventListener('click', () => revealCard(card, 0));
                        card.classList.add('inactive');
                    });
                    selectedCards = [];

                    // Verifica si se han completado todas las tarjetas
                    if (document.querySelectorAll('.card:not(.inactive)').length === 0) {
                        // Muestra la vista de victoria
                        showVictoryScreen();
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    selectedCards.forEach(({ card }) => {
                        card.textContent = '?';
                        card.addEventListener('click', () => revealCard(card, 0), { once: true });
                    });
                    selectedCards = [];
                }, 1000);
            }
        }
    }
}

// Función para mostrar la pantalla de victoria
function showVictoryScreen() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'block';
}

// Función para comenzar un nuevo juego
function startNewGame() {
    // Baraja la matriz de números
    shuffleArray(numbers);

    // Muestra la vista de selección de niveles
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('levels-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'none';

    // Elimina las tarjetas del juego anterior si las hay
    const gameContainer = document.getElementById('game-container');
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Elimina los botones de vuelta al inicio existentes
    const existingBackButtons = document.querySelectorAll('.back-button');
    existingBackButtons.forEach(button => button.remove());
}

// Función para comenzar el juego con la dificultad seleccionada
function startGame(difficulty) {
    // Almacena la dificultad seleccionada
    selectedDifficulty = difficulty;

    // Muestra la vista del juego con la dificultad seleccionada
    document.getElementById('levels-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    // Configura el juego según la dificultad
    setupGame(selectedDifficulty);
}

// Función para configurar el juego según la dificultad
function setupGame(difficulty) {
    // Determina el número de filas y columnas según la dificultad
    let rows, columns;

    if (difficulty === 'easy') {
        rows = columns = 4;
    } else if (difficulty === 'medium') {
        rows = columns = 5;
    } else if (difficulty === 'hard') {
        rows = columns = 6;
    }

    // Calcula el número total de cartas
    const totalCards = rows * columns;

    // Elimina las tarjetas del juego anterior si las hay
    const gameContainer = document.getElementById('game-container');
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Crea las cartas del nuevo juego en el contenedor
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = '?'; // Inicialmente, muestra el símbolo de interrogación
        card.addEventListener('click', () => revealCard(card, i));
        gameContainer.appendChild(card);
    }

    // Establece el ancho y alto del contenedor del juego para organizar las cartas en un cuadrado
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Agrega el botón para volver al inicio
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Volver al Inicio';
    backButton.addEventListener('click', goBack);
    document.getElementById('game-screen').appendChild(backButton);
}

// Función para mostrar las opciones de dificultad
function showStartScreen() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('levels-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'none';
}

// Función para volver a la pantalla de inicio
function goBack() {
    showStartScreen();
}

// Inicia un nuevo juego al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    numbers = [...Array(8).keys()].flatMap((i) => [i + 1, i + 1]);
    showStartScreen();
});
