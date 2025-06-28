export const ErrorMessage = ({ error }: { error: unknown }) => (
  <div className="border-2 p-8 border-red-500 rounded bg-red-100 text-red-700 mx-auto max-w-4xl mt-8">
    <p>
      Error loading devices:{' '}
      {error instanceof Error ? error.message : 'Unknown error'}
    </p>
  </div>
);
