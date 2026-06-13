require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const API = process.env.API_URL || "http://localhost:5000/api";

function makeToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

async function api(path, userId, options = {}) {
  const token = makeToken(userId);
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }

  return { status: res.status, body };
}

async function seedNotifications(userId, role) {
  await prisma.notification.deleteMany({ where: { userId } });

  await prisma.notification.createMany({
    data: [
      {
        userId,
        type: role === "STUDENT" ? "EXAM_SCHEDULED" : role === "FACULTY" ? "EXAM_CREATED" : "SYSTEM_ALERT",
        title: `${role} test notification (unread)`,
        message: `Test unread notification for ${role}`,
        read: false,
        metadata: { priority: "HIGH", actionUrl: `/${role.toLowerCase()}/dashboard` },
      },
      {
        userId,
        type: role === "STUDENT" ? "EXAM_RESULT_PUBLISHED" : role === "FACULTY" ? "VIOLATION_DETECTED" : "USER_APPROVAL_REQUIRED",
        title: `${role} test notification (read)`,
        message: `Test read notification for ${role}`,
        read: true,
        metadata: { priority: "MEDIUM" },
      },
    ],
  });
}

async function testRole(user) {
  console.log(`\n========== ${user.role}: ${user.name} (id=${user.id}) ==========`);

  await seedNotifications(user.id, user.role);

  const list = await api("/notifications?limit=20&offset=0", user.id);
  console.log("GET /notifications:", list.status, {
    count: list.body?.notifications?.length,
    unread: list.body?.unread,
  });

  const unread = await api("/notifications/unread/count", user.id);
  console.log("GET /notifications/unread/count:", unread.status, unread.body);

  const firstUnread = list.body?.notifications?.find((n) => !n.read);
  if (firstUnread) {
    const markRead = await api(`/notifications/${firstUnread.id}/read`, user.id, {
      method: "PATCH",
    });
    console.log("PATCH /notifications/:id/read:", markRead.status);

    const unreadAfter = await api("/notifications/unread/count", user.id);
    console.log("Unread after mark read:", unreadAfter.body);
  }

  const markAll = await api("/notifications/read-all", user.id, { method: "PATCH" });
  console.log("PATCH /notifications/read-all:", markAll.status, markAll.body);

  const unreadAfterAll = await api("/notifications/unread/count", user.id);
  console.log("Unread after mark all:", unreadAfterAll.body);

  const toDelete = list.body?.notifications?.[0];
  if (toDelete) {
    const del = await api(`/notifications/${toDelete.id}`, user.id, {
      method: "DELETE",
    });
    console.log("DELETE /notifications/:id:", del.status, del.body);

    const listAfterDelete = await api("/notifications?limit=20&offset=0", user.id);
    console.log("Count after delete:", listAfterDelete.body?.notifications?.length);
  }

  const clearAll = await api("/notifications/clear-all", user.id, {
    method: "DELETE",
  });
  console.log("DELETE /notifications/clear-all:", clearAll.status, clearAll.body);
}

async function main() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing from environment");
  }

  const users = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "FACULTY", "STUDENT"] } },
    orderBy: { id: "asc" },
  });

  const rolesSeen = new Set();
  for (const user of users) {
    if (rolesSeen.has(user.role)) continue;
    rolesSeen.add(user.role);
    await testRole(user);
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
