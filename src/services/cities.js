// services/cities.js

const getCities = async (query) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query
      )}&key=5defbe14934349baa8cc1a4dddb50324`
    );

    const data = await response.json();

    if (data.results) {
      const locations = data.results.map((result) => ({
        name: result.formatted,
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
      }));
      
      return locations;
    } else {
      console.error("No se encontraron resultados.");
      return [];
    }
  } catch (error) {
    console.error("Error al buscar ciudades:", error);
    return [];
  }
};

export default getCities;
