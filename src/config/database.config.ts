export const dbConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  database: {
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bwpku.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  },
});
