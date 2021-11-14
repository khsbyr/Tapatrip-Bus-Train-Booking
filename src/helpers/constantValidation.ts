export const PATTERN_PHONE = /^[\d]{8}$/;
export const PATTERN_COMPANY_REGISTER = /^[\d]{7}$/;

export const validateMessages = {
  required: '${name} хоосон байна!',
  types: {
    email: '${label} Формат буруу байна!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
