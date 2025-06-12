import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Hole den User serverseitig. Die Middleware hat sichergestellt,
  // dass die Session aktuell ist.
  const { data: { user } } = await supabase.auth.getUser();

  // Wenn aus irgendeinem Grund kein User da ist, wird er zum Login geschickt.
  // Das macht diese Seite geschützt.
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-green-400">
        Login Erfolgreich!
      </h1>
      <p className="mt-4">
        Du bist auf dem geschützten Dashboard.
      </p>
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <p>Deine User ID: {user.id}</p>
        <p>Deine Email: {user.email}</p>
      </div>
    </div>
  );
} 