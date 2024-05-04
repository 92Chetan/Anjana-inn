import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn('w-full h-full px-8', className)}>{children}</div>;
};

export default Container;
