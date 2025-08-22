'use client'
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import styles from './Clippy.module.css';

const Clippy: React.FC = () => {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    typed.current = new Typed(el.current!, {
      strings: [
        'Hey, explorer!',
        'Tap "User" to start.',
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
    <div className="fixed z-10 right-[20px] bottom-[20px] flex items-end gap-3 text-black">
      <div className={`speech-bubble ${styles.speechBubble} px-[10px] py-[10px] text-black w-[140px] text-sm`}>
        <span ref={el}></span>
      </div>
      <img 
        src="/images/clippy.png" 
        alt="astronaut" 
        className="h-auto w-[110px]" 
      />
    </div>
  );
};

export default Clippy;

// Speech bubble styles moved to globals.css for reusability 
