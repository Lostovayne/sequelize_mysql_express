import { Sequelize, DataTypes, Model } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const { database, user, password, host, dialect, port } = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
};

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    port,
});

//Top lvl await

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

class Product extends Model {}

Product.init(
    {
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        product_price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },

        is_stock: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: "Product",
    }
);

export default Product;
