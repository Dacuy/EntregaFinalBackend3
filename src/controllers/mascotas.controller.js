import PetDTO from "../dto/Mascota.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
    const pets = await petsService.getAll();
    res.send({ status: "success", payload: pets });
};

const createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const newPet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const createdPet = await petsService.create(newPet);
    res.send({ status: "success", payload: createdPet });
};

const updatePet = async (req, res) => {
    const updatedPet = await petsService.update(req.params.pid, req.body);
    res.send({ status: "success", message: "Pet updated" });
};

const deletePet = async (req, res) => {
    await petsService.delete(req.params.pid);
    res.send({ status: "success", message: "Pet deleted" });
};

const createPetWithImage = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const imagePath = `${__dirname}/../public/img/${req.file.filename}`;
    const newPetWithImage = PetDTO.getPetInputFrom({ name, specie, birthDate, image: imagePath });
    const createdPet = await petsService.create(newPetWithImage);
    res.send({ status: "success", payload: createdPet });
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
};
