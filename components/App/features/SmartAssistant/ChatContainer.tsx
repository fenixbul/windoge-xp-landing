import React, { useEffect, useRef } from 'react';
import styles from './ChatContainer.module.css';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [children]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {children}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
