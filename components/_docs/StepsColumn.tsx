export interface Step {
  n: number;
  title: string;
  desc: string;
}

interface StepsColumnProps {
  steps: Step[];
  /** className for the outer wrapper div, typically controls width e.g. 'w-full md:w-[366px]' */
  className?: string;
  /** 'compact' = MCP-style tighter item padding; 'cards' = each step as a feature card */
  variant?: 'default' | 'compact' | 'cards';
  /** Padding for card items when variant='cards'. Defaults to 'p-4' */
  cardPadding?: string;
}

export default function StepsColumn({ steps, className = '', variant = 'default', cardPadding = 'p-4' }: StepsColumnProps) {
  const isCompact = variant === 'compact';
  const isCards = variant === 'cards';

  if (isCards) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {steps.map((step) => (
          <div key={step.n} className={`border border-[#dee0ea] rounded-lg ${cardPadding} hover:border-[#FF0000]/30 hover:[box-shadow:8px_8px_13px_0_rgba(33,52,71,0.07)] transition`}>
            <div className="flex gap-2.5 mb-2">
              <span className="flex-shrink-0 w-7.5 h-7.5 rounded-lg bg-[#fff0f0] text-[#FF0000] text-[13px] font-bold flex items-center justify-center">
                {step.n}
              </span>
              <h3 className="text-[18px] font-bold text-[#111827] leading-[1.56]">
                {step.title}
              </h3>
            </div>
            <p className="ml-10 text-[#111827]/70 leading-[1.75]">{step.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-0 ${className}`}>
      {steps.map((step) => (
        <div key={step.n} className={`${isCompact ? 'py-7' : 'py-7.5'} border-b border-[#dee0ea]`}>
          <div className={`flex gap-2.5 ${isCompact ? '' : 'mb-2'}`}>
            <span className="flex-shrink-0 w-7.5 h-7.5 rounded-lg bg-[#fff0f0] text-[#FF0000] text-[13px] font-bold flex items-center justify-center">
              {step.n}
            </span>
            <h3 className={`text-[18px] font-bold text-[#111827] leading-[1.56] ${isCompact ? 'mb-1' : ''}`}>
              {step.title}
            </h3>
          </div>
          <p className="ml-10 text-[#111827]/70 leading-[1.75]">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
