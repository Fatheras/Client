"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {

    let tasks = [];

    for (let index = 0; index < 20; index++) {
      tasks.push(
        {
          title: faker.name.jobTitle(),
          cost: faker.random.number(),
          status: "done",
          category: faker.random.number({ min: 1, max: 3 }),
          peoples: faker.random.number({ min: 0, max: 6 }),
          time: "10:10:10",
          description: faker.name.jobDescriptor(),
          owner: faker.random.number({ min: 2, max: 3 }),
        },
      );

    }

    return queryInterface.bulkInsert("tasks", tasks, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tasks", null, {});
  },
};
