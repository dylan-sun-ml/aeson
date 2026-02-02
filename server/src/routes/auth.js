import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const cookieName = "aeson_session";
const tokenTtlSeconds = 60 * 60 * 24 * 7; // 7 days

const isValidEmail = (email) =>
  typeof email === "string" && /\S+@\S+\.\S+/.test(email);

const isValidPassword = (password) =>
  typeof password === "string" && password.length >= 8;

const signToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET.");
  }
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: tokenTtlSeconds,
  });
};

const setAuthCookie = (res, token) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenTtlSeconds * 1000,
  });
};

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({
        error: "Provide a valid email and a password with 8+ characters.",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email: email.toLowerCase(), passwordHash });

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    return res.json({
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  const token = req.cookies[cookieName];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Missing JWT secret." });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("email");
    if (!user) {
      return res.status(401).json({ error: "Not authenticated." });
    }
    return res.json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(401).json({ error: "Not authenticated." });
  }
});

export default router;
