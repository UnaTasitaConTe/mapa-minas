import { cardInformativa } from "./Components/CardInformativa.js";
import { Points } from "./Domain/Client/Points.js";
import { GeoJSONDTO } from "./Domain/Models/DTOS/GeoJSONDTO.js";
import { settings } from "./Infrastructure/env.js";

/**
 * Obtiene un parámetro específico de la URL.
 * @param {string} name - El nombre del parámetro que se quiere obtener.
 * @returns {string|null} El valor del parámetro o null si no se encuentra.
 */
const getUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Inicializa un mapa de Mapbox con una ubicación y zoom predeterminados o basados en parámetros de URL.
 * @param {Object} geoJson - Objeto GeoJSON para determinar los límites del mapa.
 * @returns {Object} El objeto del mapa de Mapbox.
 */
const initializeMap = (geoJson) => {
  mapboxgl.accessToken = settings.mapBoxToken;

  const longitude = parseFloat(getUrlParameter("longitud")) || -72.497555;
  const latitude = parseFloat(getUrlParameter("latitud")) || 7.886069;
  const zoom = parseFloat(getUrlParameter("zoom")) || 12;

  return new mapboxgl.Map({
    container: "map",
    center: [longitude, latitude],
    zoom: zoom,
    maxBounds: [
      [-72.792778, 7.745556], // Ampliamos el límite sur
      [-71.4, 8.283889], // Ampliamos el límite norte
    ],
  });
};

/**
 * Añade una capa GeoJSON al mapa. Si la fuente ya existe, actualiza los datos.
 * @param {Object} map - El objeto del mapa de Mapbox.
 * @param {GeoJSONDTO} geoJsonDTO - Objeto DTO que contiene los datos GeoJSON.
 */
const addGeoJsonLayer = (map, geoJsonDTO) => {
  const source = map.getSource("points");
  if (!source) {
    map.addSource("points", {
      type: "geojson",
      data: geoJsonDTO.toJson(),
    });

    map.addLayer({
      id: "points-layer",
      type: "circle",
      source: "points",
      paint: {
        "circle-radius": 6,
        "circle-color": "#ff0000",
      },
    });
  } else {
    source.setData(geoJsonDTO.toJson());
  }
};

/**
 * Crea y añade un popup animado para una característica específica del GeoJSON.
 * @param {Object} map - El objeto del mapa de Mapbox.
 * @param {Object} feature - Objeto GeoJSON que representa una característica (un punto).
 */
const createPopupForFeature = (map, feature) => {
  const { coordinates } = feature.geometry;
  const popupContent = cardInformativa(
    feature.properties.name,
    feature.properties.description,
    feature.properties.image
  );

  const popup = new AnimatedPopup({
    offset: 25,
    openingAnimation: {
      duration: 1000,
      easing: "easeOutExpo",
      transform: "scale",
    },
    closingAnimation: {
      duration: 300,
      easing: "easeOutBack",
      transform: "opacity",
    },
  }).setHTML(
    `<div style="overflow: auto;margin-top: 6%;">${popupContent}</div>`
  );

  // Crear el nombre flotante
  const el = document.createElement("div");
  el.className = "custom-marker";

  // Crear el nombre flotante
  const floatingName = document.createElement("div");
  floatingName.className = "floating-name";
  floatingName.innerText = feature.properties.name;

  el.appendChild(floatingName);
  const typeMapping = {
    Mina: "minas",
    Oficina: "oficina",
  };

  el.id = typeMapping[feature.properties.type] || "patios";

  new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map)
    .getElement()
    .addEventListener("click", () => {
      map.flyTo({
        center: coordinates,
        zoom: 12,
        essential: true,
      });
    });
};

/**
 * Función principal que crea el mapa. Obtiene los datos de puntos, los convierte en GeoJSON, y los muestra en el mapa.
 */
const createMap = async () => {
  try {
    const point = new Points();
    const pointsData = await point.getPoints();

    if (!pointsData) throw new Error("No se obtuvieron datos de puntos.");

    const geoJsonDTO = new GeoJSONDTO(pointsData);

    const zona = getUrlParameter("zona");
    const longitude = parseFloat(getUrlParameter("longitud")) || null;
    const latitude = parseFloat(getUrlParameter("latitud")) || null;

    if (zona) {
      const zonaLower = zona.toLowerCase();
      geoJsonDTO.features = geoJsonDTO.features.filter(
        (x) => x.properties.zona.toLowerCase() == zonaLower
      );
    } else if (longitude && latitude) {
      geoJsonDTO.features = geoJsonDTO.features.filter(
        (x) =>
          x.geometry.coordinates[0] == longitude &&
          x.geometry.coordinates[1] == latitude
      );
    }

    if (geoJsonDTO.type !== "FeatureCollection")
      throw new Error("Datos GeoJSON inválidos.");

    const map = initializeMap(geoJsonDTO);

    map.on("load", () => {
      addGeoJsonLayer(map, geoJsonDTO);
      geoJsonDTO.features.forEach((feature) =>
        createPopupForFeature(map, feature)
      );
    });
  } catch (error) {
    console.error("Error al crear el mapa:", error);
  }
};

// Inicia la creación del mapa.
createMap();
