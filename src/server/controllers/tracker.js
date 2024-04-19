
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const getAllTrackers = async (req, res) => {
  const trackers = await prisma.tracker.findMany({
    include: {
        user: true,
      },
  });

  res.json({ data: trackers });
};

const createTracker = async (req, res) => {
  const { userId,weight, bloodPressure, fetalMovements, feelings, lastAppointment, nextAppointment } = req.body;

  try { console.log("this isthe body:",req.body)
    const createdTracker = await prisma.tracker.create({
      data: {
        weight,
        bloodPressure,
        fetalMovements,
        feelings,
        lastAppointment,
        nextAppointment,
        user: {
          connect: { id: userId }
        }
      },
     
    });
    console.log("this is the :",lastAppointment)
    console.log("after: this is created data:", createdTracker)
    return res.json({ data: createdTracker });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
export { getAllTrackers, createTracker };


