import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
      </div>

      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
      </div>
    </div>
  )
}

