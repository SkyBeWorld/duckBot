const { model, Schema } = require('mongoose')

module.exports = model("ReactionRoles", new Schema({
    GuildID: String,
    roles: Array,
}))