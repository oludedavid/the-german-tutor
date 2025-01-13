import Image from "next/image";
import { ICourse } from "@/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/app/store/_store/useCartStore";
import usePersistStore from "@/helper/usePersistStore";
import Link from "next/link";
interface CourseProps {
  course: ICourse;
}

export default function Course({ course }: CourseProps) {
  const store = usePersistStore(useCartStore, (state) => state);
  const { toast } = useToast();
  const handleAddToCart = () => {
    store?.addItemToCart(course);
    toast({
      title: "Item added to cart",
      description: `${course.courseName} has been added to your cart.`,
      duration: 4000,
    });
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
      <Link href={`/course/${course._id}`}>Read More</Link>
    </div>
  );
}
