"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
exports.default = {
    up: (queryInterface, Sequelize) => {
        const tasks = [];
        for (let index = 0; index < 20; index++) {
            tasks.push({
                title: faker.name.jobTitle(),
                cost: faker.random.number(),
                status: "done",
                category: faker.name.title(),
                countOfUsers: faker.random.number({ min: 0, max: 6 }),
                time: "10:10:10",
                description: faker.name.jobDescriptor(),
                owner: faker.random.number({ min: 1, max: 3 }),
            });
        }
        return queryInterface.bulkInsert("tasks", tasks, {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tasks", null, {});
    },
};
