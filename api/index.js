require('dotenv').config();
require('./mongo');
const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const app = express();
const PORT = process.env.PORT;

const Note = require('./models/Note');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');

const User = require('./models/User');

const userExtractor = require('./middleware/userExtractor');

Sentry.init({
  dsn: 'https://043b0d7e29c24f439140c1971fbb3f84@o1012758.ingest.sentry.io/5978340',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(cors());
// app.use(morgan('combined'))
app.use(express.json());
app.use(express.static('../app/build'));

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        return response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params;
  const note = request.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  console.log('newNoteInfo', newNoteInfo);

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((noteUpdated) => response.status(200).json(noteUpdated))
    .catch((err) => next(err));
});

app.delete('/api/notes/:id', async (request, response, next) => {
  const { id } = request.params;

  Note.findByIdAndDelete(id)
    .then((noteDeleted) => response.status(204).json(noteDeleted))
    .catch((err) => next(err));
});

app.post('/api/notes', userExtractor, async (request, response) => {
  const { content, important = false } = request.body;

  const { userId } = request;
  const user = await User.findById(userId);

  if (!content) {
    return response.status(400).json({
      error: 'Required content filed is missing',
    });
  }
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id,
  });

  // newNote
  //   .save()
  //   .then((savedNote) => response.json(savedNote))
  //   .catch((err) => console.error(`err`, err));
  try {
    const saveNote = await newNote.save();
    user.notes = user.notes.concat(saveNote._id);
    await user.save();
    response.json(saveNote);
  } catch (e) {
    next(e);
  }
});

app.use('/api/users', userRouter);

app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(notFound);

app.use(Sentry.Handlers.errorHandler());

app.use(handleErrors);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// mongodb+srv://dbUser:<password>@cluster0.rw9jw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
module.exports = { app, server };
