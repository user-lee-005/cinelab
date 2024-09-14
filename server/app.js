const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models"); // Import the sequelize instance
const teamMembersRoutes = require("./routes/teamMembers");
const corsConfig = require("./config/corsConfig");

const app = express();
const port = process.env.PORT || 3001;

// app.use(corsConfig);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://cinelab.vercel.app",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());
app.use("/api", teamMembersRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync({ force: false });
  })
  .then(() => console.log("Database synchronized"))
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit process with error
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
