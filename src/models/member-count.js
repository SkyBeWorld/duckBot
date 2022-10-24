const { model, Schema } = require('mongoose')

module.exports = model("member-count", new Schema({
    Guild: String,
    Channel: String,
    Member: String,
}))