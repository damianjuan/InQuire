'use strict';
module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define(
        'Answer', {
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Answer.associate = function (models) {
        // associations can be defined here
        Answer.belongsTo(models.Question, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });

        Answer.hasMany(models.FreeResponse, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Answer;
};
