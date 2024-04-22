import prisma from "../config/db";

export const getEntry = async (userId: number, entryDate: Date) => {
  const entry = await prisma.journalEntry.findFirst({
    where: {
      userId,
      entryDate: entryDate,
    },
  });
  return entry;
};

export const createEntry = async (
  userId: number,
  entryDate: Date,
  entry: string
) => {
  const newEntry = await prisma.journalEntry.create({
    data: {
      userId,
      entryDate,
      entry,
    },
  });
  return newEntry;
};
