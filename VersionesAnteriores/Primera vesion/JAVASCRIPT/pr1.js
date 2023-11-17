// Variables para almacenar información del juego
let letters = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let score = 0;
let timerInterval;
let numRows = 4;
let numCols = 4;

/**
 * Inicia el temporizador del juego.
 */

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        const formattedTime = formatTime(timer); // Aquí utilizamos formatTime para obtener el tiempo formateado
        document.getElementById('timer').textContent = `Tiempo : ${formattedTime}`; 
    }, 1000);
}

/**
 * Baraja los elementos del array.
 * @param {Array} array - Array a ser barajado.
 * @returns {Array} - Array barajado.
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Crea una carta y añade un evento de clic para voltearla.
 * @param {string} value - Valor de la carta.
 * @returns {HTMLDivElement} - Elemento de la carta.
 */
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    const image = document.createElement('img');
    image.src = '../OTROS/images.jpeg'; 
    let n = 3
    image.style.width = image.style.height = n+'px'; 
    card.appendChild(image);
    card.addEventListener('click', () => flipCard(card));
    card.dataset.value = value;
    return card;
}

/**
 * Voltea una carta y verifica si hay coincidencia.
 * @param {HTMLDivElement} card - Elemento de la carta.
 */
function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.classList.add('flipping'); 
        card.innerHTML = card.dataset.value;
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

/**
 * Actualiza las cartas seleccionadas en el panel.
 */
function updateSelectedCards() {
    const selectedCardsElement = document.getElementById('selectedCards');
    selectedCardsElement.innerHTML = `Cartas seleccionadas: ${flippedCards.map(card => card.dataset.value).join(', ')}`;
}

/**
 * Verifica si las cartas seleccionadas son iguales.
 */
function checkMatch() {
    const [card1, card2] = flippedCards;
    moves++;

    if (card1.textContent === card2.textContent) {
        setTimeout(() => {
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
        }, 1000);

        matchedCards.push(card1, card2);
        flippedCards = [];

        score += 10;
        document.getElementById('score').textContent = `Puntaje: ${score}`;

        if (matchedCards.length === letters.length) {
            clearInterval(timerInterval);
            const formattedTime = formatTime(timer);
            alert(`¡Has ganado! Movimientos: ${moves} - Tiempo: ${formattedTime}`);
        }

    } else {
        flippedCards.forEach(card => {
            card.textContent = '';
        });
        flippedCards = [];
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * Reorganiza las cartas en el tablero.
 */
function reorganizeCards() {
    const memoryBoard = document.getElementById('memoryBoard');
    const cards = memoryBoard.querySelectorAll('.card');

    cards.forEach(card => {
        if (!matchedCards.includes(card)) {
            card.style.order = Math.floor(Math.random() * cards.length);
        }
    });
}

function resetTimeAndScore() {
    timer = 0;
    score = 0;
    document.getElementById('timer').textContent = `Tiempo: ${timer} segundos`; 
    document.getElementById('score').textContent = `Puntaje: ${score}`;
}

/**
 * Cambia la dificultad del juego y reinicia el tiempo y puntaje.
 * @param {string} level - Nivel de dificultad ('easy', 'medium', 'hard').
 */

/**
 * Inicializa el juego en la dificultad seleccionada.
 * @param {string} level - Nivel de dificultad ('easy', 'medium', 'hard').
 */
function setDifficulty(level) {
    resetTimeAndScore(); // Reinicia el tiempo y el puntaje

    let n;
    switch (level) {
        case 'easy':
            n = 8;
            numRows = numCols = 4;
            break;
        case 'medium':
            n = 18;
            numRows = 6;
            numCols = 6;
            break;
        case 'hard':
            n = 32;
            numRows = 8;
            numCols = 8;
            break;
    }

    letters = generateNumbers(n);

    const memoryBoard = document.getElementById('memoryBoard');
    memoryBoard.innerHTML = ''; 
    memoryBoard.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    memoryBoard.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    initializeGame();
}

/**
 * Genera un array de números duplicados.
 * @param {number} n - Número de cartas.
 * @returns {Array} - Array de números duplicados.
 */
function generateNumbers(n) {
    let numbers = [];

    for (let i = 1; i <= n; i++) {
        numbers.push(i.toString(), i.toString());
    }

    return numbers;
}

/**
 * Reinicia el juego.
 */
function resetGame() {
    clearInterval(timerInterval);
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    timer = 0;
    score = 0;
    initializeGame();
}



/**
 * Inicializa el juego con la dificultad actual.
 */
function initializeGame() {
    const memoryBoard = document.getElementById('memoryBoard');
    memoryBoard.innerHTML = ''; // Limpia el contenido del tablero

    const shuffledLetters = shuffle(letters);
    shuffledLetters.forEach((value, index) => {
        const card = createCard(value);
        card.dataset.value = value;
        memoryBoard.appendChild(card);
    });

    startTimer();
    document.getElementById('timer').textContent = `Tiempo: ${timer} segundos`; 
    document.getElementById('score').textContent = `Puntaje: ${score}`;
}

// Inicializa el juego con dificultad 'easy'
setDifficulty('easy');

// Evento para remover la clase 'flipping' después de la animación de volteamiento
document.addEventListener('transitionend', function(event) {
    if (event.propertyName === 'transform') {
        event.target.classList.remove('flipping');
    }
});


