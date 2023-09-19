export function isValidName(name: string) {
  const regex = /^[^0-9]+$/;
  return name.length >= 2 && regex.test(name);
}

export function isValidSiret(siret: string) {
  const regex = /^\d{9,14}$/;
  return regex.test(siret);
}

export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isValidPhone(phone: string) {
  const regex = /^\d+$/;
  return phone.length > 5 && regex.test(phone);
}

export function isValidPassword(password: string) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  return password.length >= 8 && regex.test(password);
}
