

export type ContactFromData ={
    names: string;
    email: string;
    phone: string;
    message: string;
}

// types/User.ts (or directly in the same file)
export interface User {
  name: string;
  email: string;
  avatar: string;
  role: "super_admin" | "doctor" | "assistant"; // Extend as needed
}
