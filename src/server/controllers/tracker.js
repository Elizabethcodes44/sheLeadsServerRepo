
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
  const { weight, bloodPressure, fetalMovements, feelings, lastAppointment, nextAppointment } = req.body;
  const userId = req.session.userId

  try { console.log("this isthe body:",req.body)
    const createdTracker = await prisma.tracker.create({
      data: {
        weight,
        bloodPressure,
        fetalMovements,
        feelings,
        lastAppointment,
        nextAppointment,
        userId,
      },
     
    });
   
    return res.json({ data: createdTracker });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
export { getAllTrackers, createTracker };


