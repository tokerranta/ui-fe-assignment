import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Device Management App
      </h1>
      <p className="mt-4 text-lg">
        Navigate to{' '}
        <Link href="/devices" className="text-blue-500">
          Devices
        </Link>{' '}
        to view all devices.
      </p>
    </main>
  );
}
