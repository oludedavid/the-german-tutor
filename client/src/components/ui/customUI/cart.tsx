import { CartType } from "@/app/cart/page";

interface CartProps {
  cart: CartType;
}

export default function Cart({ cart }: CartProps) {
  return (
    <div className="w-full p-6">
      {/* Cart Owner Details */}
      <section aria-labelledby="owner-details">
        <h2 id="owner-details" className="text-2xl font-semibold">
          Cart for {cart.owner?.fullName}
        </h2>
        <p>Email: {cart.owner?.email}</p>
        <p>Role: {cart.owner?.role || "N/A"}</p>
        <p>Verified: {cart.owner?.isVerified ? "Yes" : "No"}</p>
      </section>

      {/* List of Courses in the Cart */}
      <section aria-labelledby="courses-list" className="mt-4">
        <h3 id="courses-list" className="text-xl font-semibold">
          Courses in your cart:
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {cart.courses.map((course) => (
            <li key={course.courseOfferedId} className="flex justify-between">
              <span>
                {course.name} (x{course.quantity})
              </span>
              <span>${course.price * course.quantity}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Total Price Section */}
      <section aria-labelledby="total-price" className="mt-6">
        <h3 id="total-price" className="text-lg font-bold">
          Total Price:
        </h3>
        <p>
          $
          {cart.courses.reduce(
            (acc, course) => acc + course.price * course.quantity,
            0
          )}
        </p>
      </section>
    </div>
  );
}
