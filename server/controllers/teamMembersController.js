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
