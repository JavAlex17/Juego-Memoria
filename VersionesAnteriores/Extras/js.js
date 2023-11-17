function showLevels() {
    // Oculta la pantalla de inicio y muestra la pantalla de niveles
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('levels-screen').style.display = 'block';
}

function startGame(difficulty) {
    // Lógica para iniciar el juego con la dificultad seleccionada
    console.log(`Iniciando juego con dificultad: ${difficulty}`);
}

function goBack() {
    // Lógica para volver al inicio
    // En este caso, simplemente volvemos a mostrar la pantalla de inicio y ocultamos la de niveles
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('levels-screen').style.display = 'none';
}
