module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define("categories",{
        name:{
            type:Sequelize.STRING
        },
        color:{
            type:Sequelize.STRING
        }
    });
    return Category;
}
