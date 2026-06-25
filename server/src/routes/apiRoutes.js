import { Router } from "express";
import * as controller from "../controllers/catalogController.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  appointmentSchema,
  consultationSchema,
  medicationScheduleSchema,
  messageSchema,
  orderSchema,
  prescriptionSchema,
  reviewSchema,
} from "../validators/resourceValidators.js";

export const apiRoutes = Router();

apiRoutes.get("/doctors", controller.doctors);
apiRoutes.get("/doctors/video", controller.videoDoctors);
apiRoutes.get("/pharmacies", controller.pharmacies);
apiRoutes.get("/reviews", controller.reviews);

apiRoutes.use(protect);

apiRoutes.get("/patients", authorize("doctor", "admin"), controller.patients);
apiRoutes.get("/profile/patient", authorize("patient"), controller.patientProfile);
apiRoutes.patch("/profile/patient", authorize("patient"), controller.updatePatientProfile);

apiRoutes.get("/appointments", controller.appointments);
apiRoutes.post("/appointments", validate(appointmentSchema), controller.createAppointment);
apiRoutes.patch("/appointments/:id", controller.updateAppointment);

apiRoutes.get("/prescriptions", controller.prescriptions);
apiRoutes.post("/prescriptions", authorize("doctor"), validate(prescriptionSchema), controller.createPrescription);

apiRoutes.get("/medication-schedules", controller.medicationSchedules);
apiRoutes.post("/medication-schedules", validate(medicationScheduleSchema), controller.createMedicationSchedule);
apiRoutes.patch("/medication-schedules/:id", controller.updateMedicationSchedule);
apiRoutes.delete("/medication-schedules/:id", controller.deleteMedicationSchedule);

apiRoutes.get("/reminders", controller.reminders);
apiRoutes.patch("/reminders/:id/read", controller.markReminderRead);

apiRoutes.post("/orders", authorize("patient"), validate(orderSchema), controller.createOrder);
apiRoutes.post("/reviews", authorize("patient"), validate(reviewSchema), controller.createReview);
apiRoutes.patch("/reviews/:id/helpful", controller.markReviewHelpful);

apiRoutes.post("/consultations", authorize("patient"), validate(consultationSchema), controller.startConsultation);
apiRoutes.post("/consultations/:id/messages", validate(messageSchema), controller.addConsultationMessage);
apiRoutes.patch("/consultations/:id/end", controller.endConsultation);
