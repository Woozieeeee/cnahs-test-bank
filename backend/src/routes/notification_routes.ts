import express from "express";
import { authMiddleware } from "../middleware/auth_middleware";
import {
  getNotificationsController,
  getUnreadCountController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController,
  clearAllNotificationsController,
} from "../controllers/notification_controller";

const router = express.Router();

// All notification routes require authentication
router.use(authMiddleware);

// Get notifications with pagination
router.get("/", getNotificationsController);

// Get unread count
router.get("/unread/count", getUnreadCountController);

// Mark all notifications as read
router.patch("/read-all", markAllNotificationsAsReadController);

// Clear all notifications
router.delete("/clear-all", clearAllNotificationsController);

// Mark single notification as read
router.patch("/:notificationId/read", markNotificationAsReadController);

// Delete notification
router.delete("/:notificationId", deleteNotificationController);

export default router;
