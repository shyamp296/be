const path = require("path");
const User = require("../model/user_modal");
const { createObjectCsvWriter } = require("csv-writer");

exports.addUser = async (req, res) => {
  console.log(req.body);

  const { firstname, lastname, email, phone, gender, status, location } =
    req.body;
  const profile = req.file ? req.file.filename : "";

  const users = await User.findOne({ email });

  if (!users) {
    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      gender,
      status,
      location,
      profile,
    });
    user
      .save()
      .then((savedUser) => {
        console.log("data added sucessfully");
        res.status(201).json({ data: "data added sucessfully" });
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  } else {
    console.log("user found sucessfully");
    res.status(201).json({
      message: "User with email already have an account",
    });
  }
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  const users = await User.findById(id);
  console.log(users);
  res.json({ data: users });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, gender, status, location } =
    req.body;
  const profile = req.file ? req.file.filename : "";

  User.findByIdAndUpdate(
    id,
    { firstname, lastname, email, phone, gender, status, location, profile },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("updated user", updatedUser);
      res.json(updatedUser);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.deleteUser = async (req, res) => {
  const userDelete = await User.findByIdAndDelete(req.params.id);
  if (userDelete) {
    res.status(200).json({
      success: true,
      message: "User Delete",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not deleted",
    });
  }
};

exports.getUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;

  const offset = (page - 1) * limit;

  const users = await User.find();
  const filteredUsers = search
    ? users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const paginatedUsers = filteredUsers.slice(offset, offset + limit);

  res.json({
    data: paginatedUsers,
    page,
    limit,
    total: users.length,
  });
};

exports.exportCsv = async (req, res) => {
  const data = await User.find();
  const csvWriter = createObjectCsvWriter({
    path: "export.csv",
    header: [
      { id: "firstname", title: "First Name" },
      { id: "lastname", title: "Last Name" },
      { id: "email", title: "Email" },
      { id: "phone", title: "phone" },
      { id: "gender", title: "gender" },
      { id: "location", title: "location" },
      { id: "status", title: "Status" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log("CSV file created successfully");
      res.download("export.csv"); // Download the CSV file
    })
    .catch((error) => {
      console.error("Error creating CSV file:", error);
      res.status(500).send("Error exporting data to CSV");
    });
};
