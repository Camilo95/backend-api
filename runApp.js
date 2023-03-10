const baseUrl = 'http://localhost:3000';

const request = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const calculateCoordenadas = () => {
  const position = [-1, 1];
  const num = position[Math.floor(Math.random() * position.length)];
  return {
    latitude: ((Math.floor(Math.random() * 1000000) / 10000) * num).toString(),
    longitude: ((Math.floor(Math.random() * 1000000) / 10000) * num).toString(),
  };
};

// Create service
const createService = async () => {
  const coordenadas = calculateCoordenadas();
  const body = { ...coordenadas };
  const options = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(
    `Creating service with coordinates: (latitud: ${coordenadas.latitude}, longitud: ${coordenadas.longitude})`,
  );
  const response = await request(`${baseUrl}/travel/start`, options);
  return response.id;
};

const finishService = async (id) => {
  const coordenadas = calculateCoordenadas();
  const body = {
    id,
    ...coordenadas,
  };
  const options = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(
    `Finalizing service with coordinates: (latitude: ${coordenadas.latitude}, longitude: ${coordenadas.longitude})`,
  );
  const response = await request(`${baseUrl}/travel/finish`, options);
  return response.message;
};

(async () => {
  for (const i of Array.from({ length: 5 })) {
    const id = await createService();
    const message = await finishService(id);
    console.log(`${message}\n`);
  }
  /*for (let i = 0; i < 30; i++) {
    const id = await createService();
    const message = await finishService(id);
    console.log(message);
  }*/
})();
