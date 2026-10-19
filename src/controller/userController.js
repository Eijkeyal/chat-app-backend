import User from "../models/user.js";

// for getting user details
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for update user details
export const updateUser = async (req, res) => {
  try {
    if (req.params.id !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own account" });
    }

    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for delete user
export const deleteUser = async (req, res) => {
  try {
    if (req.params.id !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
