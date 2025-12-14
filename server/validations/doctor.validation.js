import validator from "validator";

export const addDoctorValidations = (req, res, next) => {
  const {
    name,
    email,
    speciality,
    password,
    degree,
    experience,
    about,
    available,
    fees,
    address,
    date,
    slots_booked,
  } = req.body;

  const imageFile = req.file;

  let errors = [];

  if (!name || validator.isEmpty(name.trim())) {
    errors.push("Name is required.");
  }
  if (!email || !validator.isEmail(email)) {
    errors.push("Valid email is required.");
  }
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!speciality || validator.isEmpty(speciality.trim())) {
    errors.push("Speciality is required.");
  }
  if (!degree || validator.isEmpty(degree.trim())) {
    errors.push("Degree is required.");
  }
  if (!experience) {
    errors.push("Experience is required.");
  }
  if (!about || validator.isEmpty(about.trim())) {
    errors.push("About section is required.");
  }
  if (!fees || !validator.isInt(fees.toString(), { min: 0 })) {
    errors.push("Fees must be a valid positive number.");
  }
  if (!address || validator.isEmpty(address.trim())) {
    errors.push("Address is required.");
  }
  if (!imageFile) {
    errors.push("Doctor image is required.");
  }
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
};

export const loginValidations = (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push("Valid email is required.");
  }
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};
