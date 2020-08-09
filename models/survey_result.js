'use strict';
module.exports = (sequelize, DataTypes) => {
    const SurveyResult = sequelize.define(
        'SurveyResult', {
        survey_result: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }
    );
    SurveyResult.associate = function (models) {
        // associations can be defined here
        SurveyResult.belongsTo(models.SurveyQuestion, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return SurveyResult;
};
