"use client";

import { useEffect, useState } from "react";
import Course from "@/components/custom-components/course";
import Cookies from "universal-cookie";
import { QueryDatabase } from "@/helper/queryDatabase";
import { ICourse } from "@/types";

export default function CoursePage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

    const queryDatabase = new QueryDatabase(
      `${API_URL}/course`,
      "",
      "",
      {},
      token
    );
    queryDatabase
      .getAllData()
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          setCourses(response.data || []);
        }
      })
      .catch((err) => {
        setError("Failed to fetch courses. Please try again later.");
        console.error("Error fetching courses:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
