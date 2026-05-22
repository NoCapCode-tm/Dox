// Shared validation helpers used across onboarding steps
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const e164PhoneRegex = /^\+?[1-9]\d{7,14}$/; // basic E.164-ish validation (8-15 digits, optional leading +)
export const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[^\s]*)?$/i;

export const isValidEmail = (value) => {
    if (!value) return false;
    return emailRegex.test(String(value).trim());
};

export const isValidPhone = (value) => {
    if (!value) return false;
    const normalized = String(value).replace(/[ \-()]/g, '');
    return e164PhoneRegex.test(normalized);
};

export const isValidUrl = (value) => {
    if (!value) return false;
    return urlRegex.test(String(value).trim());
};

export default {
    isValidEmail,
    isValidPhone,
    isValidUrl,
};
