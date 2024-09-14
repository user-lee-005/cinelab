const express = require("express");
const router = express.Router();
const teamMembersController = require("../controllers/teamMembersController");

router.get("/getAllTeamMembers", teamMembersController.getAllTeamMembers);
router.post("/saveTeamMember", teamMembersController.saveTeamMember);

module.exports = router;
