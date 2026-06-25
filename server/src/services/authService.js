import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { DoctorProfile } from "../models/DoctorProfile.js";
import { PatientProfile } from "../models/PatientProfile.js";
import { AppError } from "../utils/AppError.js";
import { signAccessToken } from "./tokenService.js";

function publicUser(user) {
  const object = user.toObject ? user.toObject() : user;
  delete object.passwordHash;
  return object;
}

export async function registerUser(payload) {
  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    passwordHash,
  });

  if (payload.role === "doctor") {
    await DoctorProfile.create({
      user: user._id,
      specialty: payload.specialty,
      experience: payload.experience || 0,
      address: payload.address,
      clinic: payload.clinic || payload.address,
      workHours: payload.workHours,
      fee: payload.fee || 0,
      availableSlots: payload.availableSlots || ["09:00", "10:00", "11:00", "14:00", "15:00"],
      consultationType: payload.consultationType || "clinic",
      isAvailableForVideo: payload.consultationType === "video" || payload.consultationType === "both",
    });
  } else {
    await PatientProfile.create({
      user: user._id,
      birthDate: payload.birthDate,
      gender: payload.gender,
      address: payload.address,
      status: "healthy",
    });
  }

  return {
    user: publicUser(user),
    token: signAccessToken(user),
  };
}

export async function loginUser(payload) {
  const filter = payload.email ? { email: payload.email.toLowerCase() } : { phone: payload.phone };
  const user = await User.findOne(filter).select("+passwordHash");

  if (!user || user.role !== payload.role) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(payload.password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return {
    user: publicUser(user),
    token: signAccessToken(user),
  };
}

export async function getCurrentUser(userId) {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) throw new AppError("User not found", 404);

  const profile =
    user.role === "doctor"
      ? await DoctorProfile.findOne({ user: user._id })
      : await PatientProfile.findOne({ user: user._id });

  return { user, profile };
}
