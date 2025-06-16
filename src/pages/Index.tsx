
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-4 text-wearmai-primary">WearM.AI Prototype</h1>
        <p className="text-xl text-gray-600 mb-8">
          A low-fidelity prototype for testing user journey with LLM-translated biomechanical feedback
        </p>
        <Button 
          className="bg-wearmai-primary hover:bg-wearmai-secondary text-lg px-6 py-6"
          onClick={() => navigate('/')}
        >
          Start Exploring
        </Button>
      </div>
    </div>
  );
};

export default Index;
