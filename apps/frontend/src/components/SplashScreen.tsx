"use client";

import React from 'react';

const heartPaths = [
  { fill: '#90f1d1', d: 'M50,40 C30,20 0,40 25,70 L50,100 L75,70 C100,40 70,20 50,40 Z', transform: 'translate(0,0)' },
  { fill: '#3c4fe0', d: 'M150,40 C130,20 100,40 125,70 L150,100 L175,70 C200,40 170,20 150,40 Z', transform: 'translate(0,0)' },
  { fill: '#c18aff', d: 'M50,140 C30,120 0,140 25,170 L50,200 L75,170 C100,140 70,120 50,140 Z', transform: 'translate(0,0)' },
  { fill: '#f7c948', d: 'M150,140 C130,120 100,140 125,170 L150,200 L175,170 C200,140 170,120 150,140 Z', transform: 'translate(0,0)' },
  { fill: '#ffffff', d: 'M100,90 C85,70 60,90 80,115 L100,140 L120,115 C140,90 115,70 100,90 Z' },
];

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-48 animate-spin-slow"
      >
        {heartPaths.map((heart, index) => (
          <path
            key={index}
            d={heart.d}
            fill={heart.fill}
            transform={heart.transform}
          />
        ))}
      </svg>
    </div>
  );
}
