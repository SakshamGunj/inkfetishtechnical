import React from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  stage1Status: 'Live' | 'Completed';
  stage2Status: 'Live' | 'Completed' | 'Inactive';
  showStage2: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ stage1Status, stage2Status, showStage2 }) => {
  const stages = [
    { name: 'Stage 1: Silver Tier', status: stage1Status },
    ...(showStage2 ? [{ name: 'Stage 2: Gold Tier', status: stage2Status }] : []),
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-blue-500';
      case 'Inactive':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-green-400';
      case 'Completed':
        return 'text-blue-400';
      case 'Inactive':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-full mx-auto mb-8">
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2 ${getStatusColor(stage.status)}`}>
                {index + 1}
              </div>
              <h3 className="text-sm font-semibold text-white">{stage.name}</h3>
              <p className={`text-xs font-bold ${getTextColor(stage.status)}`}>{stage.status}</p>
            </motion.div>
            {index < stages.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-1 h-1 bg-gray-600 mx-4"
              ></motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
