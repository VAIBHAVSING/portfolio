import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">404 – Not Found</h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
