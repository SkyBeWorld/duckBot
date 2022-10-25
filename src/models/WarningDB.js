const { model, Schema } = require("mongoose")

module.exports = model("WarningDB", new Schema({
    GuildID: String,
    UserID: String,
    ModeratorID: String,
    Reason: String,
    Timestamp: String,
}))