/**
 * Genera una tarjeta HTML con información proporcionada.
 *
 * @param {string} name - El nombre que se mostrará como el título de la tarjeta.
 * @param {string} description - La descripción que se mostrará en la tarjeta.
 * @param {string|null} [image=null] - La URL de la imagen que se mostrará en la tarjeta. Si no se proporciona, no se mostrará ninguna imagen.
 * @returns {string} Una cadena de texto que contiene el HTML de la tarjeta informativa.
 *
 * @example
 * // Ejemplo de uso
 * const cardHtml = cardInformativa("Nombre del Lugar", "Descripción del Lugar", "https://ejemplo.com/imagen.jpg");
 * document.getElementById("tarjeta").innerHTML = cardHtml.
 */
export const cardInformativa = (name, description, image = null) => {
  return `
    <div class="card-container">
      <img class="card-img" src="${image}" alt="${name}">
    </div>
    <div class="card-body" style="margin-top:10px">
      <h2 class="card-title">${name}</h2>
      <p class="card-text">${description}</p>
    </div>
  `;
};
