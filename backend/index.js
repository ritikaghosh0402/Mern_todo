const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

sequelize.sync().then(() => {
  console.log('DB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
