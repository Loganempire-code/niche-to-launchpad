import { ReactNode, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockContainerProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  step: number;
  onCopy?: () => void;
}

export const BlockContainer = ({
  title,
  description,
  icon,
  children,
  isActive = false,
  isCompleted = false,
  step,
  onCopy
}: BlockContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(isActive || isCompleted);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof onCopy === 'function') {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    // Fallback simulation
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-300 border-border/50 overflow-hidden",
        isActive && "ring-2 ring-primary/50 shadow-glow",
        isCompleted && !isActive && "bg-gradient-card"
      )}
    >
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-accent/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isActive && "bg-primary text-primary-foreground animate-pulse",
              isCompleted && !isActive && "bg-green-500/20 text-green-400",
              !isActive && !isCompleted && "bg-muted text-muted-foreground"
            )}>
              {isCompleted && !isActive ? (
                <Check className="w-5 h-5" />
              ) : isActive ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  {icon}
                </div>
              ) : (
                <span className="text-sm font-semibold">{step}</span>
              )}
            </div>
            
            <div>
              <h3 className={cn(
                "text-lg font-semibold transition-colors",
                isActive && "text-primary"
              )}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(isCompleted || isActive) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="opacity-60 hover:opacity-100"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            )}
            
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "border-t border-border/30 transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-6">
          {children}
        </div>
      </div>
    </Card>
  );
};