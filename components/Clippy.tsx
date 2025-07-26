'use client'
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Clippy: React.FC = () => {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    typed.current = new Typed(el.current!, {
      strings: [
        'Welcome to WindogeXP!',
        'Login to start your journey',
        // 'Such experience!',
        // 'Very blockchain!'
      ],
      typeSpeed: 100,
      backSpeed: 30,
      loop: false,
      showCursor: true,
      cursorChar: '_'
    });

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <div className="fixed z-10 right-[24px] bottom-[24px] flex items-end gap-3 text-black">
      <div className="speech-bubble px-[10px] py-[10px] text-black w-[200px] text-sm">
        <span ref={el}></span>
      </div>
      <img 
        src="/images/clippy.png" 
        alt="astronaut" 
        className="h-auto w-[130px]" 
      />
    </div>
  );
};

export default Clippy;

// Add styles to the component
const styles = `

.speech-bubble {
	position: absolute;
    bottom: 100%;
    right: 10px;
    margin-bottom: 20px;
	background: #e6e6ce;
	border-radius: .4em;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 68%;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top-color: #e6e6ce;
	border-bottom: 0;
	margin-left: -10px;
	margin-bottom: -10px;
}

.typed-cursor {
  color: black;
  font-weight: normal;
}
`;

// Create style element
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
} 