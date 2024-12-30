import { ICourse } from "@/types";
//import CartServices from "@/services/cartService";
import { useCartStore } from "@/app/store/_store/useCartStore";

interface CartItemProps {
  course: ICourse;
}

export default function CartItem({ course }: CartItemProps) {
  //const cartServices = new CartServices();
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);

  const handleRemove = () => {
    removeItemFromCart(course);
    alert(`${course.courseName} has been removed from the cart.`);
  };

  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <p className="font-medium">{course.courseName}</p>
        <p className="text-gray-600">Quantity: {course.quantity || 1}</p>
        <p className="text-gray-600">Price: ${course.price}</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-gray-800 font-medium">
          ${(course.price * (course.quantity || 1)).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
