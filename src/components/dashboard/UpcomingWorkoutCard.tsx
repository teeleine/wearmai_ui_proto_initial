
import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UpcomingWorkoutCardProps {
  name: string;
  date: string;
  details: string;
}

const UpcomingWorkoutCard: React.FC<UpcomingWorkoutCardProps> = ({ 
  name, 
  date, 
  details
}) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl bg-white h-full flex flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-700">Next Up: {name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar size={16} className="mr-1" />
          <span>{date}</span>
        </div>
        <p className="text-sm text-gray-700">{details}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 mt-auto">
        <Button variant="outline" size="sm" className="w-full text-[#42b4f7] border-[#e3f7d4] hover:bg-[#e3f7d4] rounded-full">
          View Plan
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingWorkoutCard;
