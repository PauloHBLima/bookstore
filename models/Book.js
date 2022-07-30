module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
       
          title: {
            type: DataTypes.STRING(200),
            allowNull: false
          },
       
          total_pages: {
           type: DataTypes.INTEGER,
           allowNull: false
         },
       
         author: {
           type: DataTypes.STRING(200),
           allowNull: false
         },
       
         release_year: {
           type: DataTypes.STRING(200),
           allowNull: false
         },
       
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        }, 
        {
          tablename: "books",     //ele vai pluralizar o nome da Model..por padrão é bom falar pro sequelize pra ele buscar esse nome
          timestamps: true
    })

    return Book;
}