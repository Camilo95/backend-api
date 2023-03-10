const { user } = require("pg/lib/defaults");

const baseUrl = 'http://localhost:3000';
const users = [
  {
    firstName: 'Camilo',
    lastName: 'Cabrera',
    email: 'camilo@gmail.com',
    type: 'DRIVER',
  },
  {
    firstName: 'Natali',
    lastName: 'Rengifo',
    email: 'natali@gmail.com',
    type: 'RIDER',
  },
  {
    firstName: 'Sonia',
    lastName: 'Obando',
    email: 'sonia@gmail.com',
    type: 'RIDER',
  },
  {
    firstName: 'Matías',
    lastName: 'Cabrera',
    email: 'matias@gmail.com',
    type: 'RIDER',
  },
  {
    firstName: 'Mauricio',
    lastName: 'Cabrera',
    email: 'mauricio@gmail.com',
    type: 'RIDER',
  },
];

const request = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const insertUsers = async () => {
  const options = {
    body: JSON.stringify(users),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('Insert users ...');
  const response = await request(`${baseUrl}/populate/users`, options);
  return response;
};

(async () => {
  const response = await insertUsers();
  console.log(response.message);
})();
