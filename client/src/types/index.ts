import { JwtPayload } from "jwt-decode";

export interface ICartItem {
  courseOfferedId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ICartOwner {
  _id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  role: string;
}

export interface ICart {
  _id: string;
  owner: ICartOwner;
  courses: ICartItem[];
}

export interface ICourse {
  _id: string;
  courseName: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
  duration: string;
  tutors: string[];
  students: string[];
  available: boolean;
  maxNumberOfStudents: number;
  numberOfEnrolledStudents: number;
}

export interface ICustomJwtPayload extends JwtPayload {
  username?: string | null;
  email?: string | null;
  role?: string | null;
}
