const mongoose = require('mongoose');
const password = require('./password');
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI;

//conexion a mongodb
console.log(`connectionString`, connectionString);
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then((connection) => {
    console.log(`Database connected host: ${connection.connections[0].host}
				db: ${connection.connections[0].name}`);
  })
  .catch((err) => console.error(err));
