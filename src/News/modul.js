module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        cat_id:{
            type:Sequelize.INTEGER
        },
        title:{
            type:Sequelize.STRING
        },
        text:{
            type:Sequelize.STRING
        },
        author:{
            type:Sequelize.STRING
        },
        date:{
            type:Sequelize.STRING
        },
        image:{
            type:Sequelize.STRING
        }
    });
    return News;
};