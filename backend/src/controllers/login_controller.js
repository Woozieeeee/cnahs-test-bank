import prisma from "../lib/prisma";
import { comparePassword } from "../utils/comparePassword";
import { generateToken } from "../utils/generateToken";
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        // =========================
        // VALIDATION
        // =========================
        if (!login || !password) {
            return res.status(400).json({
                message: "Login and password required",
            });
        }
        // =========================
        // FIND USER
        // =========================
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: login,
                    },
                    {
                        studentId: login,
                    },
                ],
            },
        });
        // =========================
        // USER NOT FOUND
        // =========================
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // =========================
        // ACCOUNT STATUS
        // =========================
        if (user.role === "STUDENT") {
            if (user.status === "PENDING") {
                return res.status(403).json({
                    message: "Your account is still waiting for administrator approval. Please try again later.",
                });
            }
            if (user.status === "REJECTED") {
                return res.status(403).json({
                    message: "Your registration request was rejected. Please contact the administrator.",
                });
            }
        }
        // =========================
        // PASSWORD CHECK
        // =========================
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // =========================
        // GENERATE TOKEN
        // =========================
        const token = generateToken(user.id);
        // =========================
        // COOKIE
        // =========================
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 *
                24 *
                60 *
                60 *
                1000,
        });
        // =========================
        // SAFE RESPONSE
        // =========================
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                role: user.role,
                status: user.status,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
