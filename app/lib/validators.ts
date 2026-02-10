// app/lib/validators.ts

export const validateEmail = (email: string): string => {
    if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};
export const validateName=(name: string): string =>{
      if (!name.trim()) {
    return "Name is required";
  }
    const nameRegex= /^[A-Za-z ]{2,50}$/;
    if(!nameRegex.test(name))
    {
        return "Please enter a valid name";
    }
    return "";
};
export const validatePassword=(password:string):string=>{
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return "";

}
export const validatePhone = (phone: string): string => {
  const value = phone.replace(/\D/g, "");

    if (!value.trim()) {
    return "Phone is required";
  }

  if (!/^[6-9]/.test(value)) {
    return "Invalid phone number.";
  }

  if (value.length < 10) {
    return "Phone number must have 10 digits";
  }

  if (value.length > 10) {
    return "Phone number must have exactly 10 digits";
  }

  if (/^(\d)\1{9}$/.test(value)) {
    return "Invalid phone number";
  }

  return "";
};
