const { TeamMember, ClientInfo } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const nodemailer = require("nodemailer");

const sendEmail = async (client) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // You can use any other email service
      auth: {
        user: "cinelabmail@gmail.com", // Your email address
        pass: "hzgqpwcixywurike", // Your email password or app-specific password
      },
      debug: true,
    });

    // Setup email data
    let mailOptions = {
      from: `"Website-${client.id}" cinelabmail@gmail.com`,
      to: "info.cinelab05@gmail.com", // List of recipients (this is where you put the email you want to send to)
      subject: "New Client Details Submitted", // Subject line
      text: `Client Details:
      Name: ${client.name}
      Email: ${client.email}
      Message: ${client.message}`, // Plain text body
      html: `<p><b>Client Details:</b></p>
      <p><b>Name:</b> ${client.name}</p>
      <p><b>Email:</b> ${client.email}</p>
      <p><b>Message:</b> ${client.message}</p>`, // HTML body
    };

    // Send mail
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

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

exports.saveClientDetails = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    // Save the client details to the database
    const client = await ClientInfo.create({
      name,
      email,
      message,
    });

    await sendEmail(client);

    // Send success response
    res.status(201).json({
      message: "Client details saved successfully",
      client,
    });
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error("Error saving client details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving client details." });
  }
};
