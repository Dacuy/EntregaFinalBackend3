import Users from "../dao/User.js";
import Pet from "../dao/Mascota.js";
import Adoption from "../dao/Adopcion.js";

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdopcionRepository.js";

export const usersService = new UserRepository(new Users());
export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());