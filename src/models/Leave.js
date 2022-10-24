const { model, Schema } = require('mongoose')

module.exports = model("leave", new Schema({
    Guild: String,
    Channel: String,
    Msg: String,
    Title: String,
}))