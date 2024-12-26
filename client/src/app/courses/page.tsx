"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Course from "@/components/ui/customUI/course";
import Cookies from "universal-cookie";

export interface ICourse {
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

export default function CoursePage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/course`);
        setCourses(response.data);
      } catch (error) {
        setError("Failed to fetch courses. Please try again later.");
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [API_URL, token]);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Course Page</h1>
      <div className="flex flex-col lg:flex-row flex-wrap justify-center ">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Course key={course.courseName} course={course} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}
