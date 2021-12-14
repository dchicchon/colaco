const { Sequelize, DataTypes } = require('sequelize')

const createStore = () => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './storage.sqlite'
    })

    const Soda = db.define('Soda', {
        label: DataTypes.STRING,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER
    })

    db.authenticate();
    return db;
}


const createTestStore = () => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './teststorage.sqlite'
    })

    const soda = db.define('soda', {
        label: DataTypes.STRING,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER
    })

    db.authenticate();
    db.sync();
    return db;
}

module.exports = createStore
