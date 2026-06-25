import { asyncHandler } from "../utils/asyncHandler.js";
import { getCurrentUser, loginUser, registerUser } from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({ success: true, data: result });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  res.json({ success: true, data: result });
});

export const me = asyncHandler(async (req, res) => {
  const result = await getCurrentUser(req.user._id);
  res.json({ success: true, data: result });
});
