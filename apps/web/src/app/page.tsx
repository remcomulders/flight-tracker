import { Suspense } from 'react';
import { FlightsTable } from './_components/flights-table';
import { InputForm } from './_components/input-form';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { getApi } from '../api/get-api';

type SearchParams = Promise<{ destination: string | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const api = getApi();
  const response = api.get('/flights', {
    destination: searchParams?.destination ?? '',
  });
  return (
    <main className="container flex min-h-screen max-w-screen-md flex-col items-center justify-center gap-8">
      <InputForm />
      <Suspense fallback={<Skeleton className="h-[26rem] w-full" />}>
        <FlightsTable flightsPromise={response} />
      </Suspense>
    </main>
  );
}
