import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const generateUsers = (numUsers) => {
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
        });
    }

    return users;
};
