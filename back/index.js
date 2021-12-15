const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8081

const app = express();

//For getting data of any form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(cors());

//const router = require('./routes/router.js')
//app.use('/api', router)
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));