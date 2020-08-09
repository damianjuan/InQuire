'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveyQuestion = sequelize.define(
    'SurveyQuestion',
    {
      // survey_id: DataTypes.INTERGER,
      survey_question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      survey_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          len: [1]
        }
      }
    }
  );
  SurveyQuestion.associate = function (models) {
    // associations can be defined here
    SurveyQuestion.belongsTo(models.SurveyTitle, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
    SurveyQuestion.hasMany(models.SurveyResult, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return SurveyQuestion;
};
