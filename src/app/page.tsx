
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  UserPlus,
  BookOpen,
  RefreshCw,
} from "lucide-react";

import StudentForm, { type Student } from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

const HomePage = () => {
  // Store all students
  const [students, setStudents] = useState<Student[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

const fetchStudents = useCallback(async () => {
  try {
    const response = await fetch("/api/students");
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch students");
    }

    setStudents(result.data || []);
    setError("");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    setError(message);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  let ignore = false;

  const loadStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch students");
      }

      if (!ignore) {
        setStudents(result.data || []);
        setError("");
      }
    } catch (error) {
      if (!ignore) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  };

  loadStudents();

  return () => {
    ignore = true;
  };
}, []);

  // Open form for adding a student
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  // Open form for editing a student
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  // Close the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedStudent(null);
  };

  // Delete a student
  const handleDeleteStudent = async (id: string) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete student");
      }

      // Refresh the student list
      await fetchStudents();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete student";

      setError(message);
    }
  };

  // Count unique departments
  const departmentCount = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-600">
              <GraduationCap size={20} />
              Student Management System
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Student Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage student information from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchStudents}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleAddStudent}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Students */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {students.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Departments
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {departmentCount}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <BookOpen size={24} />
              </div>
            </div>
          </div>

          {/* Management Status */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  System Status
                </p>

                <h2 className="mt-2 text-xl font-bold text-green-600">
                  Active
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <GraduationCap size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <StudentTable
          students={students}
          loading={loading}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />

        {/* Add / Edit Student Modal */}
        {isFormOpen && (
          <StudentForm
            onClose={handleCloseForm}
            onSuccess={fetchStudents}
            student={selectedStudent}
          />
        )}

      </div>
    </main>
  );
};

export default HomePage;
