const express = require("express");
const mainRouter= require('./routers/index')
const cors= require('cors')
const app= express();
const {PORT}= require('./config')
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});