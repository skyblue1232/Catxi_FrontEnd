export interface ChatMessageItem {
    messageId: number;
    roomId: number;
    senderId: number;
    senderName: string;
    content: string;
    sentAt: string;  
};

export interface GetChatMessagesResponse {
    success: boolean;
    code: string;
    message: string;
    data: ChatMessageItem[];
};