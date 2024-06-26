const BASE_URL = process.env.REACT_APP_URL_API;

export const CUSTOMER_API = {
  UPDATE_PROFILE: `${BASE_URL}/Customer/UpdateProfile`,
  SIGN_UP: `${BASE_URL}/Customer/Register`,
  MASTER: `${BASE_URL}/Customer`,
  GET_DETAILS: (userId) => `${BASE_URL}/Customer/user/${userId}`,
  SINGLE: (customerId) => `${BASE_URL}/Customer/${customerId}`,
};

export const PET_API = {
  MASTER: `${BASE_URL}/pet`,
  SINGLE: (petId) => `${BASE_URL}/pet/${petId}`,
};

export const AUTH_API = {
  LOGIN: `${BASE_URL}/Authentication/login`,
  SIGN_UP: `${BASE_URL}/Customer/Register`,
};

export const SCHEDULE_API = {
  MASTER: `${BASE_URL}/Schedules`,
};

export const BOOKING_API = {
  MASTER: `${BASE_URL}/booking`,
  CREATE_BOOKING_SERVICE: `${BASE_URL}/Booking/create-booking-service`,
};

export const DOCTOR_API = {
  MASTER: `${BASE_URL}/doctor`,
  GET_DETAILS: (userId) => `${BASE_URL}/Doctor/user/${userId}`,
};

export const STAFF_API = {
  MASTER: `${BASE_URL}/Staff`,
  GET_DETAILS: (userId) => `${BASE_URL}/Staff/user/${userId}`,
};

export const SERVICE_API = {
  MASTER: `${BASE_URL}/Service`,
};

export const SLOT_API = {
  MASTER: `${BASE_URL}/SlotBookings`,
};
