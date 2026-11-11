
"use client";

import {
  Pencil,
  Trash2,
  Users,
  Mail,
  Phone,
  GraduationCap,
  Loader2,
} from "lucide-react";

import type { Student } from "./StudentForm";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentTable = ({
  students,
  loading,
  onEdit,
  onDelete,
}: StudentTableProps) => {
  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white">
        <div className="text-center">
          <Loader2
            size={32}
            className="mx-auto animate-spin text-violet-600"
          />
          <p className="mt-3 text-sm text-gray-500">
            Loading students...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            All Students
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your student records here.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
          <Users size={17} />
          {students.length} Students
        </div>
      </div>

      {/* Empty State */}
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
            <GraduationCap
              size={32}
              className="text-violet-600"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            No Students Found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            You haven&apos;t added any students yet.
            Add your first student to get started.
          </p>
        </div>
      ) : (
        /* Students Table */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Department
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="transition hover:bg-violet-50/30"
                >
                  {/* Student Name */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {student._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Information */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {student.email}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        {student.phone}
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
                      {student.department}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        title="Edit student"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(student._id, student.name)
                        }
                        title="Delete student"
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
