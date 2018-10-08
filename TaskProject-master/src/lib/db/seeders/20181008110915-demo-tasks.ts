"use strict";
import * as faker from "faker";
import { ITask } from "../../tasks/models/task";

export default {
  up: (queryInterface, Sequelize) => {
    const tasks: ITask[] = [];

    for (let index = 0; index < 20; index++) {
      tasks.push(
        {
          name: faker.name.jobTitle(),
          cost: faker.random.number(),
          status: "done",
          category: faker.name.title(),
          countOfUsers: faker.random.number({ min: 0, max: 6 }),
          time: "10:10:10",
          description: faker.name.jobDescriptor(),
          owner: faker.random.number({ min: 1, max: 3 }),
        },
      );

    }

    return queryInterface.bulkInsert("tasks", tasks, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tasks", null, {});
  },
};
