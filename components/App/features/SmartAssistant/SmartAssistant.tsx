'use client'
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { Window } from '../../../Windows';
import ChatContainer from './ChatContainer';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatMessage as ChatMessageType } from './types';
import { useInitializeUser } from '@/store/hooks';
import { getInternetIdentityIntroMessages, getDefaultWelcomeMessage } from './utils/messages';
import { aiService } from '@/lib/services';
import styles from './SmartAssistant.module.css';

const SmartAssistant: React.FC = () => {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);
  const [showWindow, setShowWindow] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initialize user hook
  const { getInitializationCase, markIIIntroAsViewed, isConnected, hasViewedIIIntro } = useInitializeUser();

  const ctaMessages = [
    'Tap here for AI assistance!'
  ];

  // Initialize messages based on user state
  useEffect(() => {
    const initCase = getInitializationCase();
    
    // TODO: Remove this once we have a proper AI assistant and FIX BUG
    // eslint-disable-next-line no-constant-condition
    if (initCase === 'SHOW_II_INTRO' && false) {
      // Create multiple messages for II intro
      const introMessages = getInternetIdentityIntroMessages();
      const initialMessages: ChatMessageType[] = introMessages.map((message, index) => ({
        id: `intro-${index + 1}`,
        message: message,
        isUser: false,
        timestamp: ''
      }));
      setMessages(initialMessages);
    } else {
      // Single welcome message for normal assistant
      const initialMessage: ChatMessageType = {
        id: '1',
        message: getDefaultWelcomeMessage(),
        isUser: false,
        timestamp: ''
      };
      setMessages([initialMessage]);
    }
  }, []); // Use actual state values instead of function

  useEffect(() => {
    if (!showWindow && el.current) {
      // Destroy existing instance
      if (typed.current) {
        typed.current.destroy();
      }
      
      // Create new instance when doge is visible
      typed.current = new Typed(el.current, {
        strings: ctaMessages,
        typeSpeed: 80,
        backSpeed: 40,
        showCursor: true,
        cursorChar: '_',
        backDelay: 2000,
        startDelay: 1000
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
        typed.current = null;
      }
    };
  }, [showWindow]);

  const handleDogeClick = () => {
    console.log('Smart Assistant clicked!');
    // TODO: Play sound effect on click
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  const handleSendMessage = async (message: string) => {
    // Mark II intro as viewed if user is engaging with the assistant
    const initCase = getInitializationCase();
    if (initCase === 'SHOW_II_INTRO') {
      markIIIntroAsViewed();
    }

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: ''
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call the AI service
      const response = await aiService.sendMessage(message);
      
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: response,
        isUser: false,
        timestamp: ''
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI service:', error);
      
      // Fallback error message
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        isUser: false,
        timestamp: ''
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!showWindow && (
        <div className={styles.smartAssistantContainer}>
          <div className={`speech-bubble ${styles.speechBubble} px-[10px] py-[10px] text-black w-[188px] text-sm`}>
            <span ref={el}></span>
          </div>
          <img 
            src="/images/doge-glass.png" 
            alt="Smart Assistant" 
            className={styles.smartAssistantDoge} 
            onClick={handleDogeClick}
            onTouchStart={handleDogeClick} // Mobile support
          />
        </div>
      )}

      {/* Windows XP Messenger Style Chat Window */}
      <Window
        show={showWindow}
        header={{
          title: "Windoge Assistant",
          icon: "/images/doge-avatar.png"
        }}
        width={600}
        height={450}
        centered={true}
        fullscreenMobile={true}
        onClose={handleCloseWindow}
        controls={{
          showMinimize: false,
          showMaximize: false,
          showClose: true
        }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ChatContainer>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isUser={msg.isUser}
              />
            ))}
            {isTyping && (
              <ChatMessage
                message="Assistant is typing..."
                isUser={false}
              />
            )}
          </ChatContainer>
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </Window>
    </>
  );
};

export default SmartAssistant;
