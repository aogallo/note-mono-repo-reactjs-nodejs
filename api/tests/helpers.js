const supertest = require('supertest');

const { app } = require('../index');

const api = supertest(app);

const initialNotes = [
  {
    content: 'Aprendiendo fullstack',
    important: true,
    date: new Date(),
  },
  {
    content: 'Sigueme en youtube',
    important: false,
    date: new Date(),
  },
];

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes');
  const content = response.body.map((note) => note.content);
  return {
    content,
    response,
  };
};

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes,
};
