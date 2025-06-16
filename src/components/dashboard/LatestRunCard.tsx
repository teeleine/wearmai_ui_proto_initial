
import React from 'react';
import { ArrowRight, Timer, Map, Activity } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LatestRunCardProps {
  date: string;
  distance: number;
  pace: string;
  cadence: number;
  loadLevel: 'High' | 'Medium' | 'Low';
}

const LatestRunCard: React.FC<LatestRunCardProps> = ({ 
  date, 
  distance, 
  pace, 
  cadence, 
  loadLevel 
}) => {
  const loadColors = {
    High: 'bg-[#6131ca]',
    Medium: 'bg-[#f9ca24]',
    Low: 'bg-[#b8e986]',
  };

  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white h-full flex flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700">Last Run: {date}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#42b4f7] text-[#ffffff] mb-1">
              <Map size={18} />
            </div>
            <div className="text-sm font-semibold text-gray-800">{distance} km</div>
            <div className="text-xs text-gray-500">Distance</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#42b4f7] text-[#ffffff] mb-1">
              <Timer size={18} />
            </div>
            <div className="text-sm font-semibold text-gray-800">{pace}</div>
            <div className="text-xs text-gray-500">Pace</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#42b4f7] text-[#ffffff] mb-1">
              <Activity size={18} />
            </div>
            <div className="text-sm font-semibold text-gray-800">{cadence}</div>
            <div className="text-xs text-gray-500">SPM</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm mb-1 flex justify-between">
            <span className="text-gray-700">Overall Load</span>
            <span className={`text-xs font-medium ${loadLevel === 'High' ? 'text-[#6131ca]' : loadLevel === 'Medium' ? 'text-[#f9ca24]' : 'text-[#42b4f7]'}`}>{loadLevel}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${loadColors[loadLevel]}`} 
              style={{ width: loadLevel === 'High' ? '80%' : loadLevel === 'Medium' ? '50%' : '25%' }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 mt-auto">
        <Button variant="outline" size="sm" className="w-full text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full">
          View Full Report
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LatestRunCard;
