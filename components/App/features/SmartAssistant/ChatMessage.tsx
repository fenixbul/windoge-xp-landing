import React from 'react';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  timestamp 
}) => {
  const avatarSrc = isUser 
    ? '/images/astronaut-image.webp' 
    : '/images/doge-avatar.png';
  
  const avatarAlt = isUser ? 'User Avatar' : 'Assistant Avatar';

  return (
    <div className={`${styles.chatMessage} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.messageAvatar}>
        <img src={avatarSrc} alt={avatarAlt} />
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageBubble}>
          {message}
        </div>
        {timestamp && (
          <div className={styles.messageTimestamp}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
