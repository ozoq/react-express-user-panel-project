const { DataTypes, Model, ValidationError } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  /**
   * Called by api to register a user
   */
  static async register({ email, password, name }, { onSuccess, onError }) {
    try {
      onSuccess(
        await User.create({
          email: email.toString(),
          password: password.toString(),
          name: name.toString(),
          seenAt: new Date(),
          isBlocked: false,
        })
      );
    } catch (error) {
      onError(error instanceof ValidationError && error.errors[0].message);
    }
  }

  /**
   * Encapsulare password verification
   */
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  /**
   *  This updater should be called every time use loads his session (passport.deserialize()).
   */
  async updateSeenAt() {
    await this.update({ seenAt: new Date() });
  }

  /**
   *  Get a safe version of the user. Safe in context of sending it to the client.
   */
  getSafe() {
    return (({ name, email }) => ({
      name,
      email,
    }))(this);
  }

  /**
   * Similar to getSafe. Plus data that admin wants to see.
   */
  getSafeExtended() {
    return (({ id, name, email, seenAt, createdAt, isBlocked }) => ({
      id,
      name,
      email,
      seenAt,
      createdAt,
      isBlocked,
    }))(this);
  }
}

module.exports = (sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Provided email is already taken",
        },
        validate: {
          isEmail: {
            msg: "Provided email is not of the correct email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      seenAt: DataTypes.DATE,
      isBlocked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      updatedAt: false,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 4); // Be easy on Heroku with a low rounds value :)
        },
      },
    }
  );
