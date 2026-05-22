import prisma from "../lib/prisma";
export const getMe = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const { password, ...safeUser } = user;
    res.json(safeUser);
};
