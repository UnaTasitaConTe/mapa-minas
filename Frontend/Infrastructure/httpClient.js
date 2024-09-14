/**
 * Clase para manejar solicitudes HTTP.
 * Proporciona métodos convenientes para realizar solicitudes GET, POST, PUT y DELETE.
 */
export class HttpClient {
  /**
   * Crea una nueva instancia de HttpClient.
   * @param {string} [baseURL=""] - La URL base para todas las solicitudes.
   */
  constructor(baseURL = "") {
    /**
     * La URL base para las solicitudes HTTP.
     * @type {string}
     */
    this.baseURL = baseURL;

    /**
     * Encabezados predeterminados para todas las solicitudes.
     * @type {Object}
     */
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Establece encabezados predeterminados.
   * @param {Object} headers - Los encabezados que se agregarán a los predeterminados.
   */
  setDefaultHeaders(headers) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Método para manejar las solicitudes HTTP.
   * @param {string} url - El endpoint de la solicitud.
   * @param {Object} [options={}] - Opciones para la solicitud.
   * @param {string} [options.method="GET"] - El método HTTP (GET, POST, etc.).
   * @param {Object} [options.headers={}] - Encabezados personalizados para la solicitud.
   * @param {Object|null} [options.body=null] - El cuerpo de la solicitud, si es aplicable.
   * @returns {Promise<Object>} La respuesta en formato JSON.
   * @throws {Error} Lanzará un error si la solicitud no es exitosa.
   */
  async request(
    url,
    { method = "GET", headers = {}, body = null, ...options } = {}
  ) {
    const mergedHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : null,
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error("HTTP error");
        error.status = response.status;
        error.statusText = response.statusText;
        error.data = errorData;
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  /**
   * Realiza una solicitud GET.
   * @param {string} url - El endpoint de la solicitud.
   * @param {Object} [options={}] - Opciones adicionales para la solicitud.
   * @returns {Promise<Object>} La respuesta en formato JSON.
   */
  get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  /**
   * Realiza una solicitud POST.
   * @param {string} url - El endpoint de la solicitud.
   * @param {Object} data - El cuerpo de la solicitud.
   * @param {Object} [options={}] - Opciones adicionales para la solicitud.
   * @returns {Promise<Object>} La respuesta en formato JSON.
   */
  post(url, data, options = {}) {
    return this.request(url, { ...options, method: "POST", body: data });
  }

  /**
   * Realiza una solicitud PUT.
   * @param {string} url - El endpoint de la solicitud.
   * @param {Object} data - El cuerpo de la solicitud.
   * @param {Object} [options={}] - Opciones adicionales para la solicitud.
   * @returns {Promise<Object>} La respuesta en formato JSON.
   */
  put(url, data, options = {}) {
    return this.request(url, { ...options, method: "PUT", body: data });
  }

  /**
   * Realiza una solicitud DELETE.
   * @param {string} url - El endpoint de la solicitud.
   * @param {Object} [options={}] - Opciones adicionales para la solicitud.
   * @returns {Promise<Object>} La respuesta en formato JSON.
   */
  delete(url, options = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
}
