// Message types for the chat interface
export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
}
