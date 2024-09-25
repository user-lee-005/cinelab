const { TeamMember } = require("../models");
const formidable = require("formidable");
const fs = require("fs");

exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll();
    const membersWithImages = await Promise.all(
      teamMembers.map(async (member) => {
        const imageBuffer = member.image;
        const base64Image = imageBuffer.toString("base64"); // Convert BLOB to Base64
        return {
          ...member.dataValues,
          image: `data:image/jpg;base64,${base64Image}`, // Prepend Base64 data with proper header
        };
      })
    );
    if (membersWithImages.length > 0) {
      res.json(membersWithImages);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveTeamMember = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const { name, role } = fields;
    const file = files.file[0];

    try {
      const image = fs.readFileSync(file.filepath);

      const teamMember = await TeamMember.create({
        name: name[0],
        role: role[0],
        image,
      });

      res
        .status(200)
        .json({ message: "Team member added successfully", teamMember });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const { name, role } = fields;
    const file = files.file && files.file[0];

    try {
      // Find the team member by ID
      const teamMember = await TeamMember.findByPk(id);

      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }

      // If a new image is provided, read the image file
      let updatedImage = teamMember.image;
      if (file) {
        updatedImage = fs.readFileSync(file.filepath);
      }

      // Update team member fields
      teamMember.name = name ? name[0] : teamMember.name;
      teamMember.role = role ? role[0] : teamMember.role;
      teamMember.image = updatedImage;

      // Save updated team member
      await teamMember.save();

      res.status(200).json({
        message: "Team member updated successfully",
        teamMember,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.deleteTeamMember = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    // Find the team member by ID
    const teamMember = await TeamMember.findByPk(id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // Delete the team member from the database
    await teamMember.destroy();

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
