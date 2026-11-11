
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

// GET: Get all students
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find();

    return NextResponse.json(
      {
        success: true,
        data: students,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students",
      },
      { status: 500 }
    );
  }
}

// POST: Create a new student
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, department } = body;

    if (!name || !email || !phone || !department) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const student = await Student.create({
      name,
      email,
      phone,
      department,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully",
        data: student,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create student",
      },
      { status: 500 }
    );
  }
}
