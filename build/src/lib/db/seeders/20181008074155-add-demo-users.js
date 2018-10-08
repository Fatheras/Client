"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
exports.default = {
    up: (queryInterface, Sequelize) => {
        const users = [];
        for (let index = 0; index < 20; index++) {
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
            });
        }
        return queryInterface.bulkInsert("users", users, {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    },
};
