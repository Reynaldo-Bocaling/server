import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import argon2  from "argon2";

class Student {
  static async createStudentAccount(name) {
    try {
      return prisma.student.create({
        data: {
          name: name,
          time: {
            createMany: {
              data: generateTimeData(),
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  

  static async findStudentTime () {
    try {
        return prisma.student.findMany({
          include: {
        time: {
          orderBy: { date: 'asc' },
        },
      },
        });
    } catch (error) {
        throw new Error(error.message)
    }
  }
}

const generateTimeData = () => {
  const startDate = new Date('2023-07-01');
  const endDate = new Date('2023-11-30');
  const timeData = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      timeData.push({
        timeIn: 0,
        timeOut: 0,
        totalHours: 0,
        date: currentDate.toISOString(),
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timeData;
};

export default Student;
