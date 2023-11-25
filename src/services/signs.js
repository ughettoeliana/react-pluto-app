async function getSign(formData) {
  const birthdate = formData.birthdate;
  const latitude = formData.latitude;
  const longitude = formData.longitude;
  console.log("llegue a get Sign", formData);

  try {
    const url = `http://localhost:4000/signs?birthdate=${encodeURIComponent(
      birthdate
    )}&longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(
      latitude
    )}`;

    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    const planetsArray = Array.isArray(data) ? data : [data];

    console.log("data", data);
    console.log("signs del js", planetsArray);
    return planetsArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default getSign;
