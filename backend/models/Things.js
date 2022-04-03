const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
    url: { type: String, required: true },
    modele: { type: String, required: true },
    prix: { type: Number, required: true },
    unite: { type: String, required: true },
})

module.exports = mongoose.model('Thing', thingSchema);