'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Surveys",
            "publicity", {
                type: Sequelize.STRING,
                defaultValue: "Private",
                allowNull: false
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            "Surveys",
            "publicity"
        );
    }
};
