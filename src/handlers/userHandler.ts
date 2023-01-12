import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

import userStore from "../models/user";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
  const unHashedPassword = req.body.password;
  const jwtPayload = {
    username: req.body.username as unknown as string,
  };
  console.log(process.env.SALT_ROUNDS);

  //Hash password
  bcrypt.hash(
    unHashedPassword,
    Number(process.env.SALT_ROUNDS as unknown as number),
    function (err, hash) {
      if (err) {
        console.log(err);

        return res.status(400).json({ error: "unable to create user hash" });
      }

      const hashedPassword = hash;
      // generate token
      jwt.sign(
        JSON.stringify(jwtPayload),
        process.env.JWT_PRIVATE_KEY as unknown as string,
        async (err, token) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ error: "unable to create user" });
          }

          const createDetails = {
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          };

          //send details to db
          let result = await userStore.create(createDetails);
          console.log(result);

          if (result.error) {
            return res
              .status(400)
              .json({ error: "Unable to create this user" });
          }

          return res.status(201).json({
            username: createDetails.username,
            token: token,
            firstName: createDetails.firstName,
            lastName: createDetails.lastName || null,
          });
        }
      );
    }
  );
}
