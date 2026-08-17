// Corrección puntual: al marcar ✓ o ✕, la siguiente tarjeta debe aparecer
// directamente por su cara de pregunta, sin enseñar brevemente la respuesta.
(function () {
  if (typeof render !== 'function' || !E || !E.card) return;

  render = function () {
    if (queue.length === 0) {
      finishRound();
      return;
    }

    const inner = E.card.querySelector('.inner');

    // Quita el giro SIN animación antes de cambiar el contenido.
    // Así el navegador nunca pinta la respuesta de la tarjeta siguiente.
    inner.style.transition = 'none';
    E.card.classList.remove('flipped');
    flipped = false;

    const c = queue[0];
    const esFirst = direction === 'es-en';
    E.frontWord.textContent = esFirst ? c.es : c.en;
    E.backWord.textContent = esFirst ? c.en : c.es;
    E.catFront.textContent = c.cat;
    E.catBack.textContent = c.cat;
    updateDirectionUI();
    E.right.disabled = true;
    E.wrong.disabled = true;
    updateStats();
    save();

    // Fuerza el estado frontal y recupera la animación solo para el próximo toque.
    void inner.offsetWidth;
    requestAnimationFrame(() => {
      inner.style.transition = '';
    });
  };
})();
