import Image from "next/image";
import { ICourse } from "@/types";
import { Button } from "@/components/ui/button";
//import CartServices from "@/services/cartService";
import { useCartStore } from "@/app/store/_store/useCartStore";

interface CourseProps {
  course: ICourse;
}

export default function Course({ course }: CourseProps) {
  //const cartServices = new CartServices();
  const { addItemToCart } = useCartStore((state) => state);

  const handleAddToCart = () => {
    addItemToCart(course);
    alert("Item was added to cart");
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <p>
        <span className="font-semibold">Category:</span> {course.category}
      </p>
      <p>
        <span className="font-semibold">Price:</span> ${course.price}
      </p>
      <p>
        <span className="font-semibold">Duration:</span> {course.duration}
      </p>
      <p>
        <span className="font-semibold">Available:</span>{" "}
        {course.available ? "Yes" : "No"}
      </p>
      <p>
        <span className="font-semibold">Enrolled:</span>{" "}
        {course.numberOfEnrolledStudents} / {course.maxNumberOfStudents}
      </p>
      <Image
        src={course.imageUrl}
        alt={course.courseName}
        width={200}
        height={150}
        className="mb-4"
      />
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}
