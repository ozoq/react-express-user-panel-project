const { authorized } = require("./helpers");
const router = require("express").Router();
const { User } = require("./sequelize").models;
const { Op } = require("sequelize");

function userLocatorByIds(rawIds) {
  const ids = rawIds.map((id) => Number(id)).filter((id) => id !== NaN); // Security, I guess
  return {
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  };
}

router.post("/loadUsers", authorized, async (req, res) => {
  const users = await User.findAll({
    order: [["id", "ASC"]],
  });
  res.success(undefined, {
    users: users.map((user) => user.getSafeExtended()),
  });
});

router.post("/deleteUsers", authorized, async (req, res) => {
  await User.destroy(userLocatorByIds(req.body.ids));
  res.success();
});

router.post("/blockUsers", authorized, async (req, res) => {
  await User.update(
    {
      isBlocked: true,
    },
    userLocatorByIds(req.body.ids)
  );
  res.success();
});

router.post("/unblockUsers", authorized, async (req, res) => {
  await User.update(
    {
      isBlocked: false,
    },
    userLocatorByIds(req.body.ids)
  );
  res.success();
});

module.exports = router;
