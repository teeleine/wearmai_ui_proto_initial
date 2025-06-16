
import React from 'react';

interface FeedItemProps {
  timestamp: string;
  type: 'alert' | 'run' | 'workout' | 'insight' | 'sustainability' | 'bodyLoad' | 'recommendation' | 'biomechanics';
  children: React.ReactNode;
}

export const FeedItem: any = ({ 
  timestamp, 
  type,
  children 
}) => {
  const getTypeIndicatorColor = () => {
    switch(type) {
      case 'alert':
        return 'bg-[#f9ca24]';
      case 'insight':
        return 'bg-[#c3adef]';
      case 'biomechanics':
        return 'bg-[#c3adef]';
      case 'run':
        return 'bg-[#42b4f7]';
      case 'workout':
        return 'bg-[#42b4f7]';
      case 'sustainability':
        return 'bg-[#42b4f7]';
      case 'bodyLoad':
        return 'bg-[#9c34c8]';
      case 'recommendation':
        return 'bg-[#2c56e4]';
      default:
        return 'bg-gray-300';
    }
  };
  
  return (
    <div className="feed-item">
      <div className="mb-2 flex items-center">
        <div className={`${getTypeIndicatorColor()} w-2 h-2 rounded-full mr-2`}></div>
        <div className="text-xs text-gray-500 font-medium">{timestamp}</div>
      </div>
      <div className="feed-item-content ml-4">
        {children}
      </div>
    </div>
  );
};
