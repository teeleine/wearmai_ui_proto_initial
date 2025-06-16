
import React from 'react';
import { AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InsightAlertCardProps {
  type: 'warning' | 'insight';
  title: string;
  summary: string;
}

const InsightAlertCard: React.FC<InsightAlertCardProps> = ({
  type,
  title,
  summary
}) => {
  const isWarning = type === 'warning';
  
  return (
    <Card className={`shadow-sm rounded-xl h-full ${
        isWarning ? "bg-[#fff4e8] border-[#ffd8a8]" : "bg-[#c3adef]/20 border-[#c3adef]"
      }`}>
      <CardHeader className="pb-2 pt-4 flex flex-row items-center space-x-2">
        <div className={`p-2 rounded-full ${isWarning ? 'bg-[#f9ca24] text-white' : 'bg-[#6131ca] text-white'}`}>
          {isWarning ? <AlertTriangle size={16} /> : <Lightbulb size={16} />}
        </div>
        <div className="font-medium text-gray-800">{title}</div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 ml-10">{summary}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 mt-auto">
        <Button variant="outline" size="sm" className={`w-full rounded-full ${isWarning ? 'text-[#f9ca24] border-[#ffd8a8] hover:bg-[#ffecd1]' : 'text-[#6131ca] border-[#c3adef] hover:bg-[#c3adef]/20'}`}>
          Learn More
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightAlertCard;
