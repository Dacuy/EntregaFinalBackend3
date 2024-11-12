import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
    const adoptions = await adoptionsService.getAll();
    res.send({ status: "success", payload: adoptions });
};

const getAdoption = async (req, res) => {
    const adoption = await adoptionsService.getBy({ _id: req.params.aid });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
    res.send({ status: "success", payload: adoption });
};

const createAdoption = async (req, res) => {
    const user = await usersService.getUserById(req.params.uid);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });
    
    const pet = await petsService.getBy({ _id: req.params.pid });
    if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
    if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });
    await adoptionsService.create({ owner: user._id, pet: pet._id });
    
    res.send({ status: "success", message: "Pet adopted" });
};

export default {
    getAllAdoptions,
    getAdoption,
    createAdoption
};
