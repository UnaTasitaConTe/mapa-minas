/**
 * Clase que representa un objeto GeoJSON Data Transfer Object (DTO).
 * Proporciona métodos para crear y manipular objetos GeoJSON.
 */
export class GeoJSONDTO {
  /**
   * Crea una nueva instancia de GeoJSONDTO.
   * @param {Object} geoJson - El objeto GeoJSON con el que inicializar la instancia.
   * @param {string} geoJson._id - El identificador único del objeto GeoJSON.
   * @param {string} geoJson.type - El tipo de objeto GeoJSON, normalmente "FeatureCollection".
   * @param {Array} geoJson.features - La lista de características (features) del objeto GeoJSON.
   */
  constructor(geoJson) {
    this._id = geoJson._id;
    this.type = geoJson.type;
    this.features = geoJson.features;
  }

  /**
   * Crea un nuevo objeto Feature para ser usado en un objeto GeoJSON.
   * @param {string} type - El tipo de feature, generalmente "Feature".
   * @param {Object} geometry - La geometría de la feature, que incluye el tipo y las coordenadas.
   * @param {Object} properties - Las propiedades asociadas con la feature.
   * @returns {Object} Un objeto que representa una feature en el formato GeoJSON.
   */
  static createFeature(type, geometry, properties) {
    return {
      type: type,
      geometry: geometry,
      properties: properties,
    };
  }

  /**
   * Crea un nuevo objeto Geometry para ser usado en un objeto GeoJSON.
   * @param {string} type - El tipo de geometría, por ejemplo, "Point", "LineString", "Polygon", etc.
   * @param {Array} coordinates - Las coordenadas que definen la geometría.
   * @returns {Object} Un objeto que representa una geometría en el formato GeoJSON.
   */
  static createGeometry(type, coordinates) {
    return {
      type: type,
      coordinates: coordinates,
    };
  }

  /**
   * Convierte la instancia de GeoJSONDTO a un objeto JSON.
   * @returns {Object} Un objeto JSON que representa el GeoJSON.
   */
  toJson() {
    return {
      _id: this._id,
      type: this.type,
      features: this.features,
    };
  }
}
