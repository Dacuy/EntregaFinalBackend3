import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:3000');
describe('Adoptame API Tests', () => {
    describe('Adoptions Endpoints', () => {
        it('Traer todas las adopciones', async () => {
            const response = await requester.get('/api/adoptions');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.be.an('array');
        });

        it('Obtener adopción por ID', async () => {
            const adoptionId = '673096f40f50baab1e0e3b7c'; // Cambiar id por uno valido para que pase el test
            const response = await requester.get(`/api/adoptions/${adoptionId}`);
            if (response.status === 404) {
                expect(response.body).to.have.property('error', 'Adoption not found');
            } else {
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', adoptionId);
            }
        });
    });

    describe('Pets Endpoints', () => {
        it('Traer todas las mascotas', async () => {
            const response = await requester.get('/api/pets');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.be.an('array');
        });

        it('Crear una mascota', async () => {
            const newPet = { name: 'Firulais', specie: 'Dog', birthDate: '2020-01-01' };
            const response = await requester.post('/api/pets').send(newPet);
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property('_id');
        });

        it('Actualizar mascota', async () => {
            const petId = '66feb5805cb2b9be9779b97f'; // Cambiar id por uno valido para que pase el test
            const updateData = { name: 'Firulais Actualizado' };
            const response = await requester.put(`/api/pets/${petId}`).send(updateData);
            expect(response.status).to.equal(200);
        });

        it('Eliminar una mascota', async () => {
            const petId = '66feb5a5a3053e04fa146f99'; // Cambiar id por uno valido para que pase el test
            const response = await requester.delete(`/api/pets/${petId}`);
            expect(response.status).to.equal(200);
        });
    });

    describe('Users Endpoints', () => {
        it('Traer todos los usuarios', async () => {
            const response = await requester.get('/api/users');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.be.an('array');
        });

        it('Obtener usuario por ID', async () => {
            const userId = '66fd5e6f760839f44ce5d564'; // Cambiar id por uno valido para que pase el test
            const response = await requester.get(`/api/users/${userId}`);
            if (response.status === 404) {
                expect(response.body).to.have.property('error', 'User not found');
            } else {
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', userId);
            }
        });

        it('Actualizar usuario', async () => {
            const userId = '66fd5e6f760839f44ce5d573'; // Cambiar id por uno valido para que pase el test
            const updateData = { firstName: 'Isabel' };
            const response = await requester.put(`/api/users/${userId}`).send(updateData);
            expect(response.status).to.equal(200);
        });
    });

    describe('Sessions Endpoints', () => {
        it('Iniciar sesión', async () => {
            const loginData = { email: 'john@example.com', password: '123456' };
            const response = await requester.post('/api/sessions/login').send(loginData);
            expect(response.status).to.equal(200);
        });
    });

    describe('Mocking Data Endpoints', () => {
        it('Traer mascotas de prueba', async () => {
            const response = await requester.get('/api/mocks/mockingpets');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it('Generar datos de prueba', async () => {
            const mockData = { users: 5, pets: 10 };
            const response = await requester.post('/api/mocks/generateData').send(mockData);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Data generated successfully');
        });
    });
});
