import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  date: String,
});



export default mongoose.model('Appointment', appointmentSchema);
