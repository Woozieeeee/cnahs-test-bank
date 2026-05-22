'use client'; // This is required because we are using React hooks
import { redirect } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState(null);
  redirect('/login');
}
