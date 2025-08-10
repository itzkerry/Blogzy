const BlogCardSkeleton = () => {
  return (
    <div className="max-w-190 mx-auto p-2 overflow-hidden">
      <div className="px-3 sm:px-6 h-full w-full">
        <div className="h-full w-full border-b-2 py-4 overflow-hidden animate-pulse">
          <div className="w-full h-full flex flex-col">

            {/* user profile */}
            <div className="h-5 flex pb-2 items-center justify-start gap-2">
              <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>

            {/* blog */}
            <div className="flex pb-1">
              {/* blog content */}
              <div className="flex flex-col gap-2 w-[70%]">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              </div>

              {/* blog cover image */}
              <div className="w-[30%] flex justify-end items-start">
                <div className="h-16 sm:h-26 aspect-[160/107] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>

            {/* footer */}
            <div className="w-[70%] mb-1 flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-3 w-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
