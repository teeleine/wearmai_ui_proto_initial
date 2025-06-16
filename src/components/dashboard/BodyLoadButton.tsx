
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Activity3d from '../icons/Activity3d';

interface BodyLoadButtonProps {
  variant?: 'default' | 'large' | 'mini';
}

const BodyLoadButton: React.FC<BodyLoadButtonProps> = ({ variant = 'default' }) => {
  if (variant === 'mini') {
    return (
      <Button variant="outline" size="sm" className="text-[#42b4f7] border-[#a3d7fb] hover:bg-[#a3d7fb]/20 rounded-full w-full">
        <Activity3d size={16} className="mr-2 text-[#42b4f7]" />
        Body Load
      </Button>
    );
  }
  
  if (variant === 'large') {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-[#a3d7fb]/30 p-6 rounded-xl mb-2">
          <div className="relative w-32 h-48">
            <div className="absolute inset-0 bg-[#42b4f7]/20 opacity-20 rounded-xl animate-pulse-slow"></div>
            <Activity3d size={48} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#42b4f7]" />
          </div>
        </div>
        <Button className="bg-[#42b4f7] hover:bg-[#42b4f7]/80 text-white rounded-full">
          View Body Load Map
        </Button>
      </div>
    );
  }
  
  return (
    <Card className="border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700">Body Load Map</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex flex-col items-center">
        <div className="bg-[#a3d7fb]/30 p-4 rounded-xl mb-3 w-full flex justify-center">
          <div className="relative w-24 h-36">
            <div className="absolute inset-0 bg-[#42b4f7]/20 rounded-xl animate-pulse-slow"></div>
            {/* Placeholder for body load heatmap points */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#9c34c8] bg-opacity-30 rounded-full"></div>
            <div className="absolute top-2/3 right-1/4 transform -translate-x-1/2 w-4 h-4 bg-[#f9ca24] bg-opacity-30 rounded-full"></div>
            <Activity3d size={32} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#42b4f7]" />
          </div>
        </div>
        <Button variant="outline" className="w-full text-[#42b4f7] border-[#a3d7fb] hover:bg-[#a3d7fb]/20 rounded-full">
          <Activity3d size={20} className="mr-2 text-[#42b4f7]" />
          View Body Load Map
        </Button>
      </CardContent>
    </Card>
  );
};

export default BodyLoadButton;
