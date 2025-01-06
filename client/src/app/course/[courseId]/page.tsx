"use client";

import { useEffect, useState } from "react";
import { ICourse } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/app/store/_store/useCartStore";
import Cookies from "universal-cookie";
import { Button } from "@/components/ui/button";
import { QueryDatabase } from "@/helper/queryDatabase";
import Image from "next/image";
import Link from "next/link";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const store = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const courseId = (await params).courseId;

      setLoading(true);
      const cookies = new Cookies();
      const token = cookies.get("TOKEN");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const queryDatabase = new QueryDatabase(
        `${API_URL}/course/${courseId}`,
        "",
        "",
        {},
        token
      );

      try {
        const response = await queryDatabase.getAllData();
        if (response.error) {
          setError(response.message);
        } else {
          setCourse(response.data);
        }
      } catch (err) {
        setError("Failed to fetch course details. Please try again later.");
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleAddToCart = () => {
    if (course) {
      store.addItemToCart(course);
      toast({
        title: "Item added to cart",
        description: `${course.courseName} has been added to your cart.`,
        duration: 4000,
      });
    }
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full px-20 py-8">
      {course && (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
              <Image
                src={course.imageUrl}
                alt={course.courseName}
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="lg:w-1/2 w-full pl-4">
              <h1 className="text-3xl font-bold mb-4">{course.courseName}</h1>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {course.category}
              </p>
              <p>
                <span className="font-semibold">Instructor:</span> Kayode
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${course.price}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {course.duration}
              </p>
              <p>
                <span className="font-semibold">Available:</span>{" "}
                {course.available ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Enrolled:</span>{" "}
                {course.numberOfEnrolledStudents} / {course.maxNumberOfStudents}
              </p>
              <div className="mt-4">
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link className="text-blue-600 hover:underline" href={`/course`}>
              Back to Course List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
