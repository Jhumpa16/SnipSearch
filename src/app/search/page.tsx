import React, { Suspense } from 'react';
import SearchClient from './searchclient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
