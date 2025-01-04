
import React from 'react';
import DateSelector from '../DateSelector';
import HeroFeatures from '../HeroFeatures';
import ActivityCards from '../ActivityCards';
import DailyQuote from '../DailyQuote';

const OverviewTab = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <DateSelector />
      <HeroFeatures />
      <ActivityCards />
      <DailyQuote />
    </div>
  );
};

export default OverviewTab;
