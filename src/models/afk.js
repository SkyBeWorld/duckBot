const { model, Schema } = require("mongoose")

module.exports = model("afk", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String,
}))