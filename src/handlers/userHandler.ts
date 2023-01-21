import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

import userStore, { UserDetail, User } from "../models/user";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
  const createDetails: UserDetail = {
    username: req.body.username as unknown as string,
    password: req.body.password as unknown as string,
    firstName: req.body.firstName as unknown as string,
    lastName: req.body.lastName as unknown as string,
  };

  for (let key in createDetails) {
    //@ts-ignore
    if (!createDetails[key]) {
      return res.status(400).json({ error: `Please provide ${key}` });
    }
  }

  //Hash password
  bcrypt.hash(
    createDetails.password,
    Number(process.env.SALT_ROUNDS as unknown as number),
    async function async(err, hash) {
      if (err) {
        console.log(err);

        return res.status(400).json({ error: "unable to create user hash" });
      }

      createDetails.password = hash;

      //send details to db

      try {
        let result = await userStore.create(createDetails);

        jwt.sign(
          JSON.stringify({ userid: result.id }),
          process.env.JWT_PRIVATE_KEY as unknown as string,
          async (err, token) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ error: "unable to create user" });
            }

            return res.status(201).json({ ...result, token });
          }
        );
      } catch {
        return res.status(400).json({ error: "Unable to create this user" });
      }

      // generate token
    }
  );
}

export async function getUsers(req: Request, res: Response) {
  //console.log(req.headers);
  const allUsers = await userStore.index();
  res.json(allUsers);
}

export async function getUser(req: Request, res: Response) {
  const userId: string = req.params.userId;
  const result = await userStore.read(userId);

  if (result) {
    return res.json(result);
  }

  res.status(404).json({ error: "User not found" });
}
