import { faker } from '@faker-js/faker';

export const generatePets = (numPets) => {
    const pets = [];

    for (let i = 0; i < numPets; i++) {
        const specie = faker.helpers.arrayElement(['dog', 'cat', 'rabbit', 'bird']);

        const name = {
            dog: faker.animal.dog(),
            cat: faker.animal.cat(),
            rabbit: faker.animal.rabbit(),
            bird: faker.animal.bird(),
        }[specie];

        pets.push({
            name,
            specie,
            adopted: false,
            owner: null,
        });
    }

    console.log('Generated pets:', pets);
    return pets;
};
