'use strict';
module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define(
        'Answer', {
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    );
    Answer.associate = function (models) {
        // associations can be defined here
        Answer.belongsTo(models.Question, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Answer;
};
