'use strict';
module.exports = (sequelize, DataTypes) => {
    const FreeResponse = sequelize.define(
        'FreeResponse', {
        response: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    FreeResponse.associate = function (models) {
        // associations can be defined here
        FreeResponse.belongsTo(models.Answer, {
            onDelete: 'cascade',
            foreignKdy: {
                allowNull: false
            }
        });
    }
    return FreeResponse;
}