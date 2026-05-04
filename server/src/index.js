require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { autoSeed } = require('./seed');

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  // Auto-seed templates if DB is empty
  await autoSeed();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  });
});
