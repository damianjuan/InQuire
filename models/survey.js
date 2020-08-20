'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define(
        'Survey',
        {
            survey_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );
    Survey.associate = function (models) {
        // associations can be defined here
        Survey.belongsTo(models.User, {});
        
        Survey.hasMany(models.Question, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Survey;
};
