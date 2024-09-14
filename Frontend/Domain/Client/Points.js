import { settings } from "../../Infrastructure/env.js";
import { HttpClient } from "../../Infrastructure/httpClient.js";

/**
 * Clase para manejar la obtención de puntos desde un servidor.
 */
export class Points {

  /**
   * Crea una nueva instancia de Points.
   * Inicializa un cliente HTTP con la URL de conexión definida en las configuraciones.
   */
  constructor() {
    /**
     * El cliente HTTP utilizado para realizar solicitudes a la API.
     * @type {HttpClient}
     */
    this.apiClient = new HttpClient(settings.urlConnection);
  }

  /**
   * Obtiene puntos desde el servidor.
   * Realiza una solicitud GET al endpoint "/get/points" y devuelve el primer punto en la respuesta.
   * @returns {Promise<Object>} El primer punto obtenido de la respuesta.
   * @throws {Error} Lanzará un error si la solicitud falla.
   */
  async getPoints() {
    try {
      const data = await this.apiClient.get("/get/points");
      return data[0];
    } catch (error) {
      console.error("Error fetching points:", error);
      throw error;
    }
  }
}
