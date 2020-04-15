const { PORT, NODE_ENV, DATABASE_URL, TEST_DATABASE_URL, API_TOKEN, JWT_SECRET } = process.env;

module.exports = {
  PORT: PORT || 8000,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  API_TOKEN,
  JWT_SECRET
};