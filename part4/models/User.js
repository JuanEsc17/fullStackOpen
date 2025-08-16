const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    name: String,
    passwordHash: String,
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

const User = model('User', userSchema)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id

    delete returnedObject.passwordHash
  }
})

module.exports = User