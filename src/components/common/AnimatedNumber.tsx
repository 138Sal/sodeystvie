import { useEffect, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export const AnimatedNumber = ({ value, className }: AnimatedNumberProps) => {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 160, damping: 26, mass: 0.6 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!reduce) {
      spring.set(value);
    }
  }, [value, spring, reduce]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  const text = (reduce ? value : displayValue).toLocaleString('ru-RU');
  return <span className={className}>{text}</span>;
};
