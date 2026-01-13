import { Lightbulb, AlertTriangle, Info } from 'lucide-react';
import { ProTipType } from '@/lib/types/content';

interface ProTipProps {
  type: ProTipType;
  children: React.ReactNode;
}

/**
 * Callout box component for tips, warnings, and notes
 */
export default function ProTip({ type, children }: ProTipProps) {
  const config = {
    tip: {
      icon: Lightbulb,
      borderColor: 'border-accent-blue',
      iconColor: 'text-accent-blue',
      bgColor: 'bg-accent-blue/10',
      title: 'Pro Tip',
    },
    warning: {
      icon: AlertTriangle,
      borderColor: 'border-accent-yellow',
      iconColor: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10',
      title: 'Warning',
    },
    note: {
      icon: Info,
      borderColor: 'border-accent-green',
      iconColor: 'text-accent-green',
      bgColor: 'bg-accent-green/10',
      title: 'Note',
    },
  };

  const { icon: Icon, borderColor, iconColor, bgColor, title } = config[type];

  return (
    <div className={`pro-tip ${borderColor} ${bgColor}`}>
      <div className="flex gap-3">
        <div className={`pro-tip-icon ${iconColor} flex-shrink-0 mt-0.5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${iconColor} mb-1`}>{title}</h4>
          <div className="text-sm text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
