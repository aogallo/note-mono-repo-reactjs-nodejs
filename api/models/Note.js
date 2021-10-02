const { model, Schema } = require('mongoose')

const noteSchema = new Schema(
  {
    content: String,
    date: Date,
    important: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 10000
    }
  }
)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
// const note = new Note({
// 	content: 'Mongodb',
// 	date: new Date(),
// 	important: false,
// });

// note
// 	.save()
// 	.then((result) => {
// 		console.log(result);
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.error(err));
