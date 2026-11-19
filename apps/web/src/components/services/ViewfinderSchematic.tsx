import React from 'react';

interface ViewfinderSchematicProps {
  readonly steps: readonly [string, string, string];
  readonly accentTop?: boolean;
}

export function ViewfinderSchematic({
  steps,
  accentTop = false,
}: ViewfinderSchematicProps): React.ReactElement {
  return (
    <div
      className={`relative p-5 sm:p-8 bg-[#FAFBFD] border border-[#E2E2E8] bg-[linear-gradient(to_right,#E2E2E8_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E8_1px,transparent_1px)] bg-[size:20px_20px] ${
        accentTop ? 'border-t-2 border-t-[#C83E1B]' : ''
      }`}
    >
      {/* Four Crisp Corner Viewfinder Brackets */}
      <span
        className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />

      {/* 3 Horizontal Boxes Connected by Arrows */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-3.5">
        {/* Step 1 */}
        <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] px-3 sm:px-4 py-4 sm:py-5 flex items-center justify-center text-center shadow-2xs">
          <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider text-[#0A0A0C] leading-snug">
            {steps[0]}
          </span>
        </div>

        {/* Arrow 1 -> 2 */}
        <div className="shrink-0 flex justify-center text-[#3F414A]" aria-hidden="true">
          <svg
            className="w-4 h-4 transform sm:rotate-0 rotate-90"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] px-3 sm:px-4 py-4 sm:py-5 flex items-center justify-center text-center shadow-2xs">
          <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider text-[#0A0A0C] leading-snug">
            {steps[1]}
          </span>
        </div>

        {/* Arrow 2 -> 3 */}
        <div className="shrink-0 flex justify-center text-[#3F414A]" aria-hidden="true">
          <svg
            className="w-4 h-4 transform sm:rotate-0 rotate-90"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] px-3 sm:px-4 py-4 sm:py-5 flex items-center justify-center text-center shadow-2xs">
          <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider text-[#0A0A0C] leading-snug">
            {steps[2]}
          </span>
        </div>
      </div>
    </div>
  );
}
