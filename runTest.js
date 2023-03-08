const baseUrl = 'http://localhost:3000';

const request = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const calculateCoordenadas = () => {
  return {
    latitude: Math.floor(Math.random() * 100000).toString(),
    longitude: Math.floor(Math.random() * 100000).toString(),
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
  console.log(options);
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
  console.log(options);
  const response = await request(`${baseUrl}/travel/finish`, options);
  return response.id;
};

(async () => {
  for (let i = 0; i < 1; i++) {
    const id = await createService();
    const message = await finishService(id);
    console.log(message);
  }
})();
