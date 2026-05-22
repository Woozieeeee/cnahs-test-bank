'use client'; // This is required because we are using React hooks

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Get the URL from the environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // 2. Fetch the data from your Render backend
    fetch(`${apiUrl}/your-endpoint-here`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">My Test Bank</h1>
      {/* 3. Display the data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}