import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="hidden md:block">
        <div className="flex gap-2">
          <div className="h-full w-[380px]">
            <div className="flex flex-col p-4 space-y-12">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="w-full h-8" />
              ))}
            </div>
          </div>
          {/* 2 for loops outer loop running twice and inner loop running thrice */}
          <div className="flex p-4 flex-col justify-between items-center space-y-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex w-full gap-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-64 h-64 p-4" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-4 items-center">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-64 h-64" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
