import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export function SkeletonBase({ className = "" }: SkeletonProps) {
  return (
    <div 
      className={`relative overflow-hidden bg-neutral-900 border border-neutral-800/60 rounded ${className}`}
    >
      {/* Laser horizontal/diagonal scan pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F27D26]/10 to-transparent w-[200%]"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "linear",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#F27D26]/20 to-transparent" />
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="flex flex-col bg-[#0c0c0c] border border-neutral-800 rounded overflow-hidden relative">
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        
        {/* Header tag and index indicator skeleton */}
        <div className="flex justify-between items-center">
          <SkeletonBase className="h-4 w-20 rounded" />
          <SkeletonBase className="h-3 w-16 rounded" />
        </div>

        {/* Info Text skeleton */}
        <div className="space-y-3">
          <SkeletonBase className="h-5 w-4/5 rounded" />
          <div className="space-y-1.5 pt-1">
            <SkeletonBase className="h-3 w-full rounded" />
            <SkeletonBase className="h-3 w-11/12 rounded" />
            <SkeletonBase className="h-3 w-4/5 rounded" />
          </div>
        </div>

        {/* Visual Technology Chips skeleton */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <SkeletonBase className="h-4.5 w-14 rounded" />
          <SkeletonBase className="h-4.5 w-16 rounded" />
          <SkeletonBase className="h-4.5 w-12 rounded" />
        </div>

        {/* GitHub Stats Row skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-900 mt-2">
          <div className="flex items-center space-x-4">
            <SkeletonBase className="h-3 w-8 rounded" />
            <SkeletonBase className="h-3 w-8 rounded" />
            <SkeletonBase className="h-3 w-8 rounded" />
          </div>
          <SkeletonBase className="h-4 w-14 rounded-sm" />
        </div>

      </div>

      {/* Action trigger footer bar skeleton */}
      <div className="px-6 py-3.5 bg-[#111] border-t border-neutral-900 flex justify-between items-center">
        <SkeletonBase className="h-3.5 w-28 rounded" />
        <SkeletonBase className="h-3.5 w-3.5 rounded-full" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="flex flex-col justify-between bg-[#0c0c0c] border border-neutral-800 rounded overflow-hidden relative">
      <div className="p-6 space-y-4">
        {/* Meta stats skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <SkeletonBase className="h-4.5 w-12 rounded" />
            <SkeletonBase className="h-3.5 w-16 rounded" />
          </div>
          <SkeletonBase className="h-3 w-14 rounded" />
        </div>

        {/* Article Title skeleton */}
        <div className="space-y-2 pt-1">
          <SkeletonBase className="h-4.5 w-full rounded" />
          <SkeletonBase className="h-4.5 w-3/4 rounded" />
        </div>

        {/* Article Excerpt skeleton */}
        <div className="space-y-1.5">
          <SkeletonBase className="h-3 w-full rounded" />
          <SkeletonBase className="h-3 w-11/12 rounded" />
        </div>

        {/* Tags row skeleton */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <SkeletonBase className="h-4 w-12 rounded" />
          <SkeletonBase className="h-4 w-14 rounded" />
          <SkeletonBase className="h-4 w-10 rounded" />
        </div>
      </div>

      {/* Interaction Footer Bar skeleton */}
      <div className="px-6 py-4 bg-[#111] border-t border-neutral-900 flex justify-between items-center">
        <SkeletonBase className="h-4 w-16 rounded" />
        <SkeletonBase className="h-4.5 w-20 rounded" />
      </div>
    </div>
  );
}

export function TerminalSkeleton() {
  return (
    <div className="bg-[#0c0c0c] border border-neutral-800 rounded overflow-hidden">
      {/* Top control header bar */}
      <div className="px-4 py-3 bg-[#111]/80 border-b border-neutral-900 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <SkeletonBase className="w-3.5 h-3.5 rounded-full" />
          <SkeletonBase className="h-3 w-28 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <SkeletonBase className="w-16 h-5 rounded" />
          <SkeletonBase className="w-5 h-5 rounded" />
        </div>
      </div>

      {/* Inner terminal body */}
      <div className="p-4 sm:p-6 space-y-3 font-mono text-xs min-h-[300px]">
        <SkeletonBase className="h-3.5 w-2/5 rounded" />
        <SkeletonBase className="h-3.5 w-3/5 rounded" />
        <SkeletonBase className="h-3.5 w-1/2 rounded" />
        <div className="pt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <SkeletonBase className="h-3.5 w-4 rounded-sm" />
            <SkeletonBase className="h-3.5 w-24 rounded" />
          </div>
          <SkeletonBase className="h-3.5 w-full rounded" />
          <SkeletonBase className="h-3.5 w-11/12 rounded" />
          <SkeletonBase className="h-3.5 w-10/12 rounded" />
        </div>
        <div className="pt-6 flex items-center space-x-2">
          <SkeletonBase className="h-4 w-4 rounded-full" />
          <SkeletonBase className="h-4 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}
