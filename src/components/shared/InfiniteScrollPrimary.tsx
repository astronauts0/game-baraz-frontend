import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

interface InfiniteScrollPrimaryProps {
  /** Total number of items currently loaded */
  dataLength: number;
  /** Function to fetch more data */
  next: () => void;
  /** Whether there is more data to load */
  hasMore: boolean;
  /** Custom loader component */
  loader?: React.ReactNode;
  /** Custom end message component */
  endMessage?: React.ReactNode;
  /** Children to render */
  children: React.ReactNode;
  /** Optional scroll threshold (0 to 1 or pixel value) */
  scrollThreshold?: number | string;
  /** Optional className for the scroll container */
  className?: string;
  /** Optional ID or element for nested scrolling */
  scrollableTarget?: string | React.ReactNode;
}

/**
 * A highly optimized and reusable infinite scroll component.
 * Built on top of react-infinite-scroll-component with premium styling.
 */
const InfiniteScrollPrimary: React.FC<InfiniteScrollPrimaryProps> = ({
  dataLength,
  next,
  hasMore,
  loader,
  endMessage,
  children,
  scrollThreshold = 0.9,
  className,
  scrollableTarget,
}) => {
  // Premium default loader
  const defaultLoader = (
    <div className="flex flex-col items-center justify-center py-10 gap-3 animate-in fade-in duration-500">
      <Spinner />
      <p className="text-sm font-medium text-muted-foreground tracking-wide">
        Fetching more items...
      </p>
    </div>
  );

  // Premium default end message
  const defaultEndMessage = (
    <div className="flex flex-col items-center justify-center py-12 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent mb-2" />
      <p className="text-sm font-medium text-muted-foreground/60 italic">
        You've reached the end of the list
      </p>
    </div>
  );

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={loader || defaultLoader}
      endMessage={endMessage || defaultEndMessage}
      scrollThreshold={scrollThreshold}
      scrollableTarget={scrollableTarget}
      className={cn("w-full overflow-hidden!", className)}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollPrimary;
