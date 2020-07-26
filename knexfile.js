require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },

    /*
        connection: {
        host : '127.0.0.1',
        user : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test'
      }

    */
  },
};
