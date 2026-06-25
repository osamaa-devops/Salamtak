import { DoctorProfile } from "../models/DoctorProfile.js";
import { PatientProfile } from "../models/PatientProfile.js";
import { Appointment } from "../models/Appointment.js";
import { Prescription } from "../models/Prescription.js";
import { MedicationSchedule } from "../models/MedicationSchedule.js";
import { Reminder } from "../models/Reminder.js";
import { Pharmacy } from "../models/Pharmacy.js";
import { Order } from "../models/Order.js";
import { Review } from "../models/Review.js";
import { Consultation } from "../models/Consultation.js";
import { AppError } from "../utils/AppError.js";

const userSelect = "name email phone role avatarUrl";

export async function listDoctors(query = {}) {
  const filter = {};
  if (query.specialty) filter.specialty = query.specialty;
  return DoctorProfile.find(filter).populate("user", userSelect).sort({ rating: -1, experience: -1 });
}

export async function listPatients(query = {}) {
  const filter = {};
  if (query.status) filter.status = query.status;
  const patients = await PatientProfile.find(filter).populate("user", userSelect).sort({ updatedAt: -1 });

  if (!query.search) return patients;
  const search = query.search.toLowerCase();
  return patients.filter((patient) => {
    const name = patient.user?.name?.toLowerCase() || "";
    const condition = patient.condition?.toLowerCase() || "";
    return name.includes(search) || condition.includes(search);
  });
}

export async function getPatientProfile(userId) {
  const profile = await PatientProfile.findOne({ user: userId }).populate("user", userSelect);
  if (!profile) throw new AppError("Patient profile not found", 404);
  return profile;
}

export async function updatePatientProfile(userId, data) {
  const profile = await PatientProfile.findOneAndUpdate({ user: userId }, data, {
    returnDocument: "after",
    runValidators: true,
  }).populate("user", userSelect);
  if (!profile) throw new AppError("Patient profile not found", 404);
  return profile;
}

export async function listAppointments(user, query = {}) {
  const filter = {};
  if (user.role === "patient") filter.patient = user._id;
  if (user.role === "doctor") filter.doctor = user._id;
  if (query.status) filter.status = query.status;
  const appointments = await Appointment.find(filter)
    .populate("patient", userSelect)
    .populate("doctor", userSelect)
    .sort({ date: 1, time: 1 });

  const doctorIds = appointments.map((appointment) => appointment.doctor?._id).filter(Boolean);
  const patientIds = appointments.map((appointment) => appointment.patient?._id).filter(Boolean);
  const [doctorProfiles, patientProfiles] = await Promise.all([
    DoctorProfile.find({ user: { $in: doctorIds } }),
    PatientProfile.find({ user: { $in: patientIds } }),
  ]);
  const doctorProfileMap = new Map(doctorProfiles.map((profile) => [String(profile.user), profile.toObject()]));
  const patientProfileMap = new Map(patientProfiles.map((profile) => [String(profile.user), profile.toObject()]));

  return appointments.map((appointment) => {
    const object = appointment.toObject();
    object.doctorProfile = doctorProfileMap.get(String(appointment.doctor?._id));
    object.patientProfile = patientProfileMap.get(String(appointment.patient?._id));
    return object;
  });
}

export async function createAppointment(user, data) {
  if (user.role !== "patient") throw new AppError("Only patients can book appointments", 403);
  return Appointment.create({ ...data, patient: user._id });
}

export async function updateAppointment(id, data, user) {
  const existing = await Appointment.findById(id);
  if (!existing) throw new AppError("Appointment not found", 404);

  const isOwnerPatient = user.role === "patient" && String(existing.patient) === String(user._id);
  const isOwnerDoctor = user.role === "doctor" && String(existing.doctor) === String(user._id);
  const isAdmin = user.role === "admin";

  if (!isOwnerPatient && !isOwnerDoctor && !isAdmin) {
    throw new AppError("You are not allowed to update this appointment", 403);
  }

  if (isOwnerPatient) {
    const allowedPatientFields = ["date", "time", "type", "symptoms", "status"];
    Object.keys(data).forEach((key) => {
      if (!allowedPatientFields.includes(key)) delete data[key];
    });
  }

  const appointment = await Appointment.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
  if (!appointment) throw new AppError("Appointment not found", 404);
  return appointment;
}

export async function listPrescriptions(user) {
  const filter = user.role === "doctor" ? { doctor: user._id } : { patient: user._id };
  return Prescription.find(filter)
    .populate("patient", userSelect)
    .populate("doctor", userSelect)
    .sort({ createdAt: -1 });
}

export async function createPrescription(user, data) {
  if (user.role !== "doctor") throw new AppError("Only doctors can create prescriptions", 403);
  return Prescription.create({ ...data, doctor: user._id });
}

export async function listMedicationSchedules(user) {
  const filter = user.role === "patient" ? { patient: user._id } : {};
  return MedicationSchedule.find(filter).sort({ nextDose: 1 });
}

export async function createMedicationSchedule(user, data) {
  const patient = data.patient || user._id;
  return MedicationSchedule.create({ ...data, patient });
}

export async function updateMedicationSchedule(id, data) {
  const schedule = await MedicationSchedule.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
  if (!schedule) throw new AppError("Medication schedule not found", 404);
  return schedule;
}

export async function deleteMedicationSchedule(id) {
  const schedule = await MedicationSchedule.findByIdAndDelete(id);
  if (!schedule) throw new AppError("Medication schedule not found", 404);
  return schedule;
}

export async function listReminders(user) {
  return Reminder.find({ user: user._id }).sort({ time: -1 });
}

export async function markReminderRead(id, user) {
  const reminder = await Reminder.findOneAndUpdate({ _id: id, user: user._id }, { isRead: true }, { returnDocument: "after" });
  if (!reminder) throw new AppError("Reminder not found", 404);
  return reminder;
}

export async function listPharmacies(query = {}) {
  const pharmacies = await Pharmacy.find().sort({ rating: -1 });
  if (!query.search) return pharmacies;
  const search = query.search.toLowerCase();
  return pharmacies
    .map((pharmacy) => {
      const object = pharmacy.toObject();
      object.medications = object.medications.filter((med) => med.name.toLowerCase().includes(search));
      return object;
    })
    .filter((pharmacy) => pharmacy.name.toLowerCase().includes(search) || pharmacy.medications.length > 0);
}

export async function createOrder(user, data) {
  if (user.role !== "patient") throw new AppError("Only patients can place pharmacy orders", 403);
  const pharmacy = await Pharmacy.findById(data.pharmacy);
  if (!pharmacy) throw new AppError("Pharmacy not found", 404);

  const items = data.items.map((item) => {
    const medication = pharmacy.medications.id(item.medication);
    if (!medication) throw new AppError(`Medication not found: ${item.medication}`, 404);
    if (!medication.inStock) throw new AppError(`${medication.name} is out of stock`, 400);
    return {
      medication: medication._id,
      name: medication.name,
      dosage: medication.dosage,
      price: medication.price,
      quantity: item.quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + pharmacy.deliveryFee;
  return Order.create({
    patient: user._id,
    pharmacy: pharmacy._id,
    items,
    deliveryAddress: data.deliveryAddress,
    paymentMethod: data.paymentMethod,
    subtotal,
    deliveryFee: pharmacy.deliveryFee,
    total,
  });
}

export async function listReviews(query = {}) {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.rating) filter.rating = Number(query.rating);
  return Review.find(filter).sort({ createdAt: -1 });
}

export async function createReview(user, data) {
  if (user.role !== "patient") throw new AppError("Only patients can add reviews", 403);
  return Review.create({ ...data, patient: user._id, patientName: user.name });
}

export async function markReviewHelpful(id) {
  const review = await Review.findByIdAndUpdate(id, { $inc: { helpful: 1 } }, { returnDocument: "after", runValidators: true });
  if (!review) throw new AppError("Review not found", 404);
  return review;
}

export async function getReviewStats(category = "doctor") {
  const reviews = await Review.find({ category });
  const totalReviews = reviews.length;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const categoryTotals = { quality: 0, waiting: 0, staff: 0, cleanliness: 0, value: 0 };

  reviews.forEach((review) => {
    distribution[review.rating] += 1;
    Object.keys(categoryTotals).forEach((key) => {
      categoryTotals[key] += review.categories?.[key] || 0;
    });
  });

  const overall = totalReviews
    ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1))
    : 0;

  return {
    overall,
    totalReviews,
    distribution,
    categories: Object.fromEntries(
      Object.entries(categoryTotals).map(([key, value]) => [key, totalReviews ? Number((value / totalReviews).toFixed(1)) : 0]),
    ),
  };
}

export async function listVideoDoctors() {
  return DoctorProfile.find({ consultationType: { $in: ["video", "both"] } }).populate("user", userSelect).sort({ rating: -1 });
}

export async function startConsultation(user, data) {
  if (user.role !== "patient") throw new AppError("Only patients can start consultations", 403);
  return Consultation.create({
    patient: user._id,
    doctor: data.doctor,
    symptoms: data.symptoms,
    price: data.price || 0,
    messages: data.initialMessage ? [{ sender: "patient", message: data.initialMessage }] : [],
  });
}

export async function addConsultationMessage(user, consultationId, data) {
  const consultation = await Consultation.findById(consultationId);
  if (!consultation) throw new AppError("Consultation not found", 404);
  consultation.messages.push({ sender: user.role, message: data.message });
  await consultation.save();
  return consultation;
}

export async function endConsultation(user, consultationId) {
  const consultation = await Consultation.findById(consultationId);
  if (!consultation) throw new AppError("Consultation not found", 404);
  consultation.status = "completed";
  consultation.endedAt = new Date();
  await consultation.save();
  return consultation;
}
