const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8081

const app = express();

//For getting data of any form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));