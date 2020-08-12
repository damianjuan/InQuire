'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      // survey_id: DataTypes.INTERGER,
      question_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      question_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          len: [1]
        }
      },
      choices: {
        type: DataTypes.STRING,
        allowNull: true,
        validation: {
          len: [1]
        }
      }
    }
  );
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.Survey, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
    Question.hasMany(models.Answer, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Question;
};
