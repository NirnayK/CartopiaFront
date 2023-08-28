import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex gap-5 place-content-center p-8">
      <Skeleton className="w-1/4 h-4/5" />
      <Skeleton className="w-3/5 h-4/5" />
    </div>
  );
};

export default loading;
