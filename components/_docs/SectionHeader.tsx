interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  /** 'compact' = MCP-style (tighter spacing, different line-height) */
  variant?: 'default' | 'compact';
  /** className for the h2, typically a margin e.g. 'mb-16' or 'my-4' */
  titleClassName?: string;
  /** className for the subtitle p, typically a margin e.g. 'mb-16' */
  subtitleClassName?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  variant = 'default',
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const isCompact = variant === 'compact';

  const labelClass = isCompact
    ? 'text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase'
    : 'text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[11px] tracking-[1px] uppercase';

  const titleClass = isCompact
    ? `text-[40px] font-[900] text-[#0A2540] text-center leading-[0.98] tracking-normal ${titleClassName ?? 'mb-2'}`
    : `text-[40px] font-black text-center leading-[39px] ${titleClassName ?? 'mb-4'}`;

  const subtitleClass = isCompact
    ? `text-[16px] font-normal text-[#0A2540]/70 text-center leading-[1.75] ${subtitleClassName ?? 'mb-10'}`
    : `text-[#111827]/70 text-base text-center leading-[28px] ${subtitleClassName ?? 'mb-16'}`;

  return (
    <>
      <p className={labelClass}>{label}</p>
      <h2 className={titleClass}>{title}</h2>
      {subtitle && <p className={subtitleClass}>{subtitle}</p>}
    </>
  );
}
