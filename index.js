const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());

const connect = require('./db_connect/connection')
connect();

const port = 5000

app.get('/', (req, res) => {
    const name = "Gautam Bhagat";
  res.status(200).json({name});
});

app.use('/api/user' ,require('./routes/users'));

app.use('/api/admin' ,require('./routes/admin'));

app.use('/api/team' ,require('./routes/team'));

app.use('/api/event' ,require('./routes/events'));

app.use('/api/image' ,require('./routes/images'));



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})