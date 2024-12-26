import Image from "next/image";
import { ICourse } from "@/app/courses/page";
import { Button } from "@/components/ui/button";

interface CourseProps {
  course: ICourse;
}

export default function Course({ course }: CourseProps) {
  return (
    <div>
      <h2>{course.courseName}</h2>
      <p>{course.description}</p>
      <p>Category: {course.category}</p>
      <p>Price: ${course.price}</p>
      <p>Duration: {course.duration}</p>
      <p>Available: {course.available ? "Yes" : "No"}</p>
      <p>
        Enrolled: {course.numberOfEnrolledStudents} /{" "}
        {course.maxNumberOfStudents}
      </p>
      <Image
        src={course.imageUrl}
        alt={course.courseName}
        width={200}
        height={150}
      />
      <Button>Add to Cart</Button>
    </div>
  );
}
