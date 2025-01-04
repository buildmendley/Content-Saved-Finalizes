import React from 'react';
import { Link } from 'react-router-dom';
import ReviewSection from './ReviewSection';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/29718277/12778107_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/80 to-ocean-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Embark on Your Profound and Transformative Journey to Inner Calm and Healing
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Uncover a Tailored Path to Emotional Well-Being with Mendley's AI-Driven Guidance and Nurturing Community
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-white text-ocean-dark px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition"
              >
                Start Free Trial
              </Link>
              <Link
                to="/science"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition"
              >
                Learn More
              </Link>
            </div>

            <ReviewSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;