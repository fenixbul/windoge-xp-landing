/**
 * Pre-defined messages for the Smart Assistant
 */

export const getInternetIdentityIntroMessages = (): string[] => {
  return [
    "You're logged in as a guest right now, which is fine, but it limits personalization.",
    "If you want, you can use Internet Identity—think of it like \"Login with Google,\" but built for the Internet Computer.",
    "Next time, try it if you want to keep your session secure and personalized on-chain.",
    "So I'm your assistant—ask me anything, from the early web to today's Web3 world!"
  ];
};

export const getDefaultWelcomeMessage = (): string => {
  return "Hello, I'm your assistant! ask me anything, from the early web to today's Web3 world!";
};
