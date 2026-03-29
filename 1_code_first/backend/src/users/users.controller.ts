import { usersTable } from "../db/schema";
import errors from "../shared/constants/errors";
import type { Context, Next } from "hono";
import { generatePassword } from "../shared/helper";
import * as argon2 from "argon2";
import * as UsersModel from "./users.model";

class UsersController {
  getUsers = async (context: Context, _next: Next) => {
    try {
      const users = await UsersModel.findUsers();

      if (context.req.query("email")) {
        let email = context.req.query("email") || "";

        const returnedUsers = await UsersModel.findUserByEmail(email);

        if (!returnedUsers.length) {
          return context.json(
            {
              error: errors.UserNotFound,
              data: null,
              success: false,
            },
            404
          );
        }

        const { password, ...returnedUserWithNoPassword } = returnedUsers[0];

        return context.json(
          {
            error: null,
            data: returnedUserWithNoPassword,
            success: true,
          },
          200
        );
      }

      const safeUsers = users.map(({ password, ...dataWithoutPassword }) => {
        return dataWithoutPassword;
      });

      return context.json(
        {
          error: null,
          data: safeUsers,
          success: true,
        },
        200
      );
    } catch (error) {
      console.log(error);
      return context.json(
        {
          error: errors.ServerError,
          data: null,
          success: false,
        },
        500
      );
    }
  };

  createNewUser = async (context: Context, _next: Next) => {
    try {
      const requiredFields = [
        "username",
        "first_name",
        "last_name",
        "email",
        "password",
      ];
      let isValid = true;
      const body = await context.req.parseBody();

      for (const field of requiredFields) {
        if (!(field in body) || !body[field]) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        return context.json(
          {
            error: errors.ValidationError,
            data: null,
            success: false,
          },
          400
        );
      }

      const hashedPassword = await argon2.hash(generatePassword());

      const newUser: typeof usersTable.$inferInsert = {
        username: body["username"] as string,
        first_name: body["first_name"] as string,
        last_name: body["last_name"] as string,
        email: body["email"] as string,
        password: hashedPassword,
      };

      const [doesEmailExist, doesUserNameExist] = await Promise.all([
        UsersModel.findUserByEmail(newUser.email),
        UsersModel.findUserByUsername(newUser.username),
      ]);

      if (doesEmailExist.length || doesUserNameExist.length) {
        let existenceError = errors.EmailAlreadyInUse;

        if (doesUserNameExist.length) {
          existenceError = errors.UsernameAlreadyTaken;
        }

        return context.json(
          {
            error: existenceError,
            data: null,
            success: false,
          },
          409
        );
      }

      const result = await UsersModel.createUser(newUser);

      const [{ password, ...userDataWithoutPassword }] = result;

      return context.json(
        {
          error: null,
          data: userDataWithoutPassword,
          success: true,
        },
        201
      );
    } catch (error) {
      console.log(error);
      return context.json(
        {
          error: errors.ServerError,
          data: null,
          success: false,
        },
        500
      );
    }
  };

  editUser = async (context: Context, _next: Next) => {
    try {
      let data = await context.req.parseBody();

      let userId: number = Number(await context.req.param().userId);

      const doesUserIdExist = await UsersModel.findUserById(userId);

      if (!doesUserIdExist.length) {
        return context.json(
          {
            error: errors.UserNotFound,
            data: null,
            success: false,
          },
          404
        );
      }

      const [doesEmailExist, doesUserNameExist] = await Promise.all([
        "email" in data
          ? UsersModel.findUserByEmail(data["email"] as string)
          : [],
        "username" in data
          ? UsersModel.findUserByUsername(data["username"] as string)
          : [],
      ]);

      if (doesEmailExist.length || doesUserNameExist.length) {
        let existenceError = errors.EmailAlreadyInUse;

        if (doesUserNameExist.length) {
          existenceError = errors.UsernameAlreadyTaken;
        }

        return context.json(
          {
            error: existenceError,
            data: null,
            success: false,
          },
          409
        );
      }

      if ("password" in data) {
        data = {
          ...data,
          password: await argon2.hash(data["password"] as string),
        };
      }

      const [{ password, ...updatedUserWithoutPassword }] =
        await UsersModel.updateUserById(userId, data);

      return context.json(
        {
          error: null,
          data: updatedUserWithoutPassword,
          success: true,
        },
        201
      );
    } catch (error) {
      console.log(error);
      return context.json(
        {
          error: errors.ServerError,
          data: null,
          success: false,
        },
        500
      );
    }
  };
}

export default UsersController;
