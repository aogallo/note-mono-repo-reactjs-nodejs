const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')

const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})
  // parallel
  // const notesObjects = initialNotes.map((note) => new Note(note));
  // const promises = notesObjects.map((note) => note.save());
  // await Promise.all(promises);

  // sequential
  for (const note of initialNotes) {
    const notesObject = new Note(note)
    await notesObject.save()
  }
})

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
  })

  test('the first note contain fullstack', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((note) => note.content)
    expect(contents).toContain('Sigueme en youtube')
  })
})

describe('POST note', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'Proximamente async/await',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    const content = response.body.map((note) => note.content)

    expect(content).toContain(newNote.content)
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api.post('/api/notes').send(newNote).expect(400)

    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE note', () => {
  test('a note can be deleted', async () => {
    let response = await api.get('/api/notes')
    const noteToDelete = response.body[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
