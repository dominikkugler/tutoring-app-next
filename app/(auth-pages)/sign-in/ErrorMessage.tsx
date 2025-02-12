"use client";  // Mark this as a client-side component

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Extract error from query params
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(error);
    }
  }, [searchParams]);  // Re-run when searchParams changes

  if (!errorMessage) return null; // Don't render if no error message

  return (
    <div className="text-red-500 mt-2">
        <p className="font-bold">Error:</p>
        <p>{errorMessage}</p> {/* Display the error */}
    </div>
  );
}