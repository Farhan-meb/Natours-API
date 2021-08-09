const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  //console.log(users);
  res.status(200).json({
    status: "Success!!",
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  const newId = users.length;
  //console.log(newId);

  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newUser,
        },
      });
    }
  );
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;

  if (id > users.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID!",
    });
  }

  const user = users.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "Error!!",
    message: "This route is not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error!!",
    message: "This route is not yet defined",
  });
};
