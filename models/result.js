'use strict';
module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define(
        'Result', {
        result_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    );
    Result.associate = function (models) {
        // associations can be defined here
        Result.belongsTo(models.Question, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Result;
};
