const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')
const port = 3000


app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(cors())



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));