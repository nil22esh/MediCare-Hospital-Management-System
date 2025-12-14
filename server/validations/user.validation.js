import validator from "validator";

export const validateRegister = (req, res, next) => {
  const data = req.body;
  const errors = {};
  if (!data.name || validator.isEmpty(data.name.trim())) {
    errors.name = "Name is required";
  } else if (!validator.isLength(data.name, { min: 3 })) {
    errors.name = "Name must be at least 3 characters long";
  }
  if (!data.email || validator.isEmpty(data.email.trim())) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!data.phone || validator.isEmpty(data.phone.trim())) {
    errors.phone = "Phone number is required";
  } else if (!validator.isMobilePhone(data.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!data.password || validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (
    !validator.isStrongPassword(data.password, {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
  ) {
    errors.password =
      "Password must include 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character";
  }
  // If errors exist stop request here
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const errors = {};
  const data = req.body;
  // Email validation
  if (!data.email || validator.isEmpty(data.email.trim())) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email format";
  }
  // Password validation
  if (!data.password || validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  // If errors exist stop request here
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};

export const validateBookAppointment = async (req, res, next) => {
  const errors = {};
  const { docId, slotDate, slotTime } = req.body;
  // docId required & valid MongoDB ObjectId
  if (!docId || !validator.isMongoId(docId)) {
    return res.status(400).json({
      success: false,
      message: "Valid doctor ID is required",
    });
  }
  // slotDate required & should be valid date (YYYY-MM-DD)
  if (!slotDate || !validator.isDate(slotDate)) {
    return res.status(400).json({
      success: false,
      message: "Valid slot date (YYYY-MM-DD) is required",
    });
  }
  // slotTime required (Format: 09:30 AM / 14:00)
  if (!slotTime || validator.isEmpty(slotTime)) {
    return res.status(400).json({
      success: false,
      message: "Slot time is required",
    });
  }
  // If errors exist stop request here
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};
