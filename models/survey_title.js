'use strict';
module.exports = (sequelize, DataTypes) => {
    const SurveyTitle = sequelize.define(
        'SurveyTitle',
        {
            // user_id: DataTypes.INTEGER,
            survey_title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            survey_uuid: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );
    SurveyTitle.associate = function (models) {
        // associations can be defined here
        SurveyTitle.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        SurveyTitle.hasMany(models.SurveyQuestion, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return SurveyTitle;
};
