const express = require("express");
const fs = require("fs");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json(), cors());

app.post("/user", (request, response) => {
  const body = request.body;
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    const savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    const newUser = {
      id: Date.now().toString(),
      username: body.username,
      age: body.age,
    };

    savedData.push(newUser);

    fs.writeFile(
      "./data/user.json",
      JSON.stringify(savedData),
      (writeError) => {
        if (writeError) {
          response.json({
            status: "error",
          });
        } else {
          response.json({ status: "success", data: savedData });
        }
      }
    );
  });
});
app.delete("/users/del", (req, res) => {
  const body = req.body;
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    const savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    const deletedData = savedData.filter((user) => user.id !== body.id);
    // console.log(user.id)
    fs.writeFile(
      "./data/user.json",
      JSON.stringify(deletedData),
      (writeError) => {
        if (writeError) {
          response.json({
            status: "error",
          });
        }
        res.json({
          status: "success",
          data: deletedData,
        });
      }
    );
  });
});

app.put("/user/update", (req, res) => {
  const body = req.body;
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    const savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    const updatedData = savedData.map((user) => {
      if (user.id === body.id) {
        return {
          ...user,
          ...body,
        };
      }
      return user;
    });
    // console.log(user.id)
    fs.writeFile(
      "./data/user.json",
      JSON.stringify(updatedData),
      (writeError) => {
        if (writeError) {
          response.json({
            status: "error",
          });
        }
        res.json({
          status: "success",
          data: updatedData,
        });
      }
    );
  });
});
app.get("/users", (req, res) => {
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    const savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    res.json({ status: "succes", data: savedData });
  });
});
app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
