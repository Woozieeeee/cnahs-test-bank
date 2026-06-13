"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth_middleware");
const notification_controller_1 = require("../controllers/notification_controller");
const router = express_1.default.Router();
// All notification routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Get notifications with pagination
router.get("/", notification_controller_1.getNotificationsController);
// Get unread count
router.get("/unread/count", notification_controller_1.getUnreadCountController);
// Mark all notifications as read
router.patch("/read-all", notification_controller_1.markAllNotificationsAsReadController);
// Clear all notifications
router.delete("/clear-all", notification_controller_1.clearAllNotificationsController);
// Mark single notification as read
router.patch("/:notificationId/read", notification_controller_1.markNotificationAsReadController);
// Delete notification
router.delete("/:notificationId", notification_controller_1.deleteNotificationController);
exports.default = router;
