import { CartType } from "@/app/cart/page";

export interface Course {
  courseOfferedId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartProps {
  cart: CartType;
}

export default function Cart({ cart }: CartProps) {
  return (
    <div>
      {/* Cart Owner Details */}
      <h1>Cart for {cart.owner?.fullName}</h1>
      <h2>Email: {cart.owner?.email}</h2>
      <h2>Role: {cart.owner?.role}</h2>
      <h2>Verified: {cart.owner?.isVerified ? "Yes" : "No"}</h2>

      {/* List of Courses in the Cart */}
      <section aria-labelledby="courses-heading">
        <h2 id="courses-heading">Courses in your cart:</h2>
        <ul>
          {cart.courses.map((course) => (
            <li key={course.courseOfferedId}>
              <strong>{course.name}</strong> (x{course.quantity}) - $
              {course.price * course.quantity}
            </li>
          ))}
        </ul>
      </section>

      {/* Total Price Section */}
      <section aria-labelledby="total-price-heading">
        <h3 id="total-price-heading">Total Price: </h3>
        <p>${cart.totalPrice}</p>
      </section>
    </div>
  );
}
