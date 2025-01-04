import React from 'react';
import EmoTrack from './EmoTrack';
import WeeklyReport from './WeeklyReport';

interface HeaderProps {
  onEmoTrackClick: () => void;
}

const Header = ({ onEmoTrackClick }: HeaderProps) => {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
      <div className="space-y-6">
        <div onClick={onEmoTrackClick} className="cursor-pointer">
          <EmoTrack />
        </div>
        <WeeklyReport />
        {/* Add more cards here if needed */}
      </div>
    </div>
  );
};

export default Header;