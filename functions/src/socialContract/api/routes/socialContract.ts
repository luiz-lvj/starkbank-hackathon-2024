import { Router } from "express";
import socialController from "../controller/socialController";

const SocialContractRoutes = Router();

SocialContractRoutes.post('/extract', socialController.extractSocialContractInformation);

export default SocialContractRoutes;