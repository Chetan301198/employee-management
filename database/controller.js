import { Schema, model, models } from "mongoose";

/* USER SCHEMA */

const empSchema = new Schema(
  {
    name: String,
    email: String,
    salary: Number,
    status: String,
  },
  { timestamps: true }
);

const Users = models.employee || model("employee", empSchema);

/* CONTROLLERS */

export async function getUsers(req, res) {
  try {
    const user = await Users.find({});
    if (!user) {
      return res.status(404).json({ error: "data not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: "error while fetching data" });
  }
}
export async function getUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function postUsers(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "data not provided" });
    }
    Users.create(formData, function (err, data) {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "user not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating data" });
  }
}

export async function deleteUsers(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    } else {
      res.status(404).json({ error: "user not selected" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
}
