const { TeamMember } = require("../models");

exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll();
    if (teamMembers.length > 0) {
      res.json(teamMembers);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveTeamMember = async (req, res) => {
  console.log("Method Called");
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
        name,
        role,
        image: image,
      });

      res
        .status(200)
        .json({ message: "Team member added successfully", teamMember });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
