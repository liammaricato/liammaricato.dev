export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-12 w-48 bg-foreground/10 rounded animate-pulse mb-8" />
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-foreground/10 rounded-lg shadow-md"
          >
            <div className="h-8 w-3/4 bg- rounded animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-foreground/10 rounded animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-foreground/10 rounded animate-pulse w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 