import { Router } from "express";
import { createSection } from "../../controllers/admin/academic/sections/create_section_controller";
import { getSections } from "../../controllers/admin/academic/sections/get_sections_controller";

const router = Router();

router.post("/sections", createSection);
router.get("/sections", getSections);

export default router;
