
import React from 'react';
import { LucideProps } from 'lucide-react';

export const Activity3d = (props: LucideProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="stroke-current"
    >
      <path d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3z" />
      <path d="M12 12L4 7.5" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
};

export default Activity3d;
