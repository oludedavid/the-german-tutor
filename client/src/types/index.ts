import { JwtPayload } from "jwt-decode";

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface ICartItem {
  courseOfferedId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ICart {
  owner: string;
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

export interface IOrder {
  ownerId: string;
  cartId: string;
  totalAmount: number;
  orderStatus: "pending" | "success" | "canceled";
  paymentMethod?: "paypal" | "paystack";
  paymentStatus?: "pending" | "completed" | "failed";
}
