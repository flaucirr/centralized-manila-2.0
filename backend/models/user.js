// models/user.js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("clientdatabase", "root", "lagaras123", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { sequelize, User };
