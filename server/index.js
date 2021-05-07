const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(cors())

// mongoose.connect("mongodb://mongo:27017/vinylhunt", { useNewUrlParser: true })
// .then(() => console.log('connected to database'))	
// .catch((err) => console.log(err))


const port = 3000
app.listen(port, () => console.log(`App is now running and listening at http://localhost:${port}`));