async function getSign(formData) {
  const birthdate = formData.birthdate;
  const latitude = formData.latitude;
  const longitude = formData.longitude;

  try {
    const url = `http://localhost:4000/signs?birthdate=${encodeURIComponent(
      birthdate
    )}&longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(
      latitude
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    const planetsArray = Array.isArray(data) ? data : [data];

    return planetsArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default getSign;
