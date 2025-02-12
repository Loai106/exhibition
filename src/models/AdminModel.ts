import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import bcrypt from "bcrypt";
import { UUIDV4 } from "sequelize";
export const Admin = sequelize.define("admin", {
  admin_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    async set(password: string) {
      console.log(password);
      const hashedPassword = bcrypt.hashSync(password, 10);
      this.setDataValue("password", hashedPassword);
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
