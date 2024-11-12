import express from 'express';
import { generatePets } from '../mocks/mockingPets.js';
import { generateUsers } from '../mocks/mockingUsers.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Mascota.js';

const router = express.Router();

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(100);
    res.status(200).json(pets);
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.status(200).json(users);
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ error: 'Tanto la cantidad de users como de mascotas son necesarias en tu body' });
    }

    try {
        const generatedUsers = generateUsers(users);
        const generatedPets = generatePets(pets);
        const insertedUsers = await User.insertMany(generatedUsers);
        const insertedPets = await Pet.insertMany(generatedPets);

        res.json({
            message: 'Datos generados correctamente',
            insertedUsers: insertedUsers.length,
            insertedPets: insertedPets.length,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al generar o subir los datos',
            details: error.message,
        });
    }
});

export default router;
