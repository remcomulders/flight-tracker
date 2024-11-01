import { Button } from '@repo/ui/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <main className="max-w-screen-xs container flex min-h-screen flex-col items-center justify-center gap-8">
      <h2 className="mx-auto w-fit bg-gradient-purple bg-clip-text text-5xl font-bold leading-tight text-transparent">
        We could not find this page
      </h2>
      <p>The page you requested does not exist. Try finding it another way.</p>
      <Link href="/">
        <Button className="flex gap-2">
          <Home size={16} /> Return home
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
