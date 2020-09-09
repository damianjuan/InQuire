'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Users",
            "rank", {
                type: Sequelize.STRING,
                defaultValue: "user",
                allowNull: false
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            "Users",
            "rank"
        );
    }
};
