import type { ReactNode } from 'react';

interface FeatureCardProps {
  tag: string;
  title: string;
  description: ReactNode;
  /** 'compact' = MCP-style (different border color, badge leading, title/desc sizing) */
  variant?: 'default' | 'compact';
}

export default function FeatureCard({ tag, title, description, variant = 'default' }: FeatureCardProps) {
  const isCompact = variant === 'compact';

  const cardClass = isCompact
    ? 'border border-[#dee0ea] rounded-lg p-[25px] hover:border-[#FF0000]/30 hover:[box-shadow:8px_8px_13px_0_rgba(33,52,71,0.07)] transition group'
    : 'border bg-[#fff] border-[#E5E7EB] rounded-lg p-[25px] hover:border-[#FF0000]/30 hover:shadow-[8px_8px_13px_0_rgba(33,52,71,0.07)] transition group';

  const badgeClass = isCompact
    ? 'inline-block px-[9px] text-[12px] font-semibold rounded-[8px] bg-[#fff0f0] leading-[2.17] text-[#FF0000] mb-[19px] uppercase'
    : 'inline-block px-[9px] text-[12px] font-semibold rounded-[8px] bg-[#fff0f0] leading-[26px] text-[#FF0000] mb-[18px] uppercase';

  const titleClass = isCompact
    ? 'text-[18px] font-semibold text-[#0A2540] mb-2'
    : 'font-semibold text-[18px]';

  const descClass = isCompact
    ? 'text-[16px] font-normal text-[#0A2540]/70 leading-[1.63]'
    : 'text-base mt-2 leading-[26px] text-[#0A2540]/70';

  return (
    <div className={cardClass}>
      <span className={badgeClass}>{tag}</span>
      <h3 className={titleClass}>{title}</h3>
      <p className={descClass}>{description}</p>
    </div>
  );
}
