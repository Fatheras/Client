"use strict";
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let tasks = [];

    for (let index = 0; index < 20; index++) {
      tasks.push(
        {
          title: faker.name.jobTitle(),
          cost: faker.random.number(),
          status: faker.random.number({ min: 1, max: 5 }),
          category: faker.random.number({ min: 1, max: 2 }),
          peoples: faker.random.number({ min: 1, max: 6 }),
          time: faker.date.future(1),
          description: faker.name.jobDescriptor(),
          owner: faker.random.number({ min: 55, max: 62 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      );

    }

    return queryInterface.bulkInsert("tasks", tasks, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tasks", null, {});
  },
};
