const mongoose = require('mongoose');


const artistAlbumSchema = mongoose.Schema({
    _id: Number,
    Artist: String,
    Album: String,
    Album_Release_Date: String,
    Album_Desc: String,
    collected: Boolean,
})

const dbEntry = mongoose.model('albums', artistAlbumSchema)


module.exports = dbEntry