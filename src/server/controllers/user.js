import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Load our .env file
import dotenv from 'dotenv';
dotenv.config();

// Use process.env to access JWT secret
const jwtSecret = process.env.JWT_SECRET;



const signUp = async (req, res) => {
  try {
    const { firstName,lastName,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ data: createdUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid email or password." });
  } else {
    const payload = { email: email, sub: foundUser.id };

    const createToken = (payload, jwtSecret) => {
      const token = jwt.sign(payload, jwtSecret);
      return token;
    };

    const token = createToken(payload, jwtSecret);
    res.json({ data: token });

    console.log(token);
  }
};

export { signUp, logIn };
