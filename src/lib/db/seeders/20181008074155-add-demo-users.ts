"use strict";
import * as faker from "faker";
import { IUser } from "../../user/models/user";

export default {
  up: (queryInterface, Sequelize) => {
    const users: IUser[] = [];

    for (let index = 0; index < 20; index++) {
      users.push(
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          password: faker.internet.password(),
        },
      );

    }

    return queryInterface.bulkInsert("users", users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
