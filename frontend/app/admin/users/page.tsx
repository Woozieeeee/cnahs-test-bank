"use client";

import { useEffect, useState } from "react";

import { getUsers } from "@/services/admin_service";

import UsersTable from "@/components/admin/users/usersTable";

import UsersLoader from "@/components/admin/users/usersLoader";

interface User {
  id: number;

  name: string;

  studentId: string;

  username?: string;

  role: string;

  status: string;

  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <UsersLoader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          User Management
        </h1>

        <p className="mt-2 text-gray-500">
          Manage student and faculty accounts.
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
