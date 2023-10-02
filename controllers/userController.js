const { User, Thought } = require('../models');

module.exports = {
  // Gets All Users.
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts')
      .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a User by ID.
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a User.
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Updates a User.
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Deletes a User.
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a Friend.
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, 
        { $push: { friends: req.params.friendId } }, 
        { new: true });

      if (!dbUserData) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes a Friend.
  async deleteFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, 
        { $pull: { friends: req.params.friendId } }, 
        { new: true });

      if (!dbUserData) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
