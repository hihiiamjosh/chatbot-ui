import { EventEmitter } from 'events';

class ChatService {
  private eventName = 'agentpush';
  private emitter = new EventEmitter();

  pushMessage(message: { content: string }) {
    this.emitter.emit(this.eventName, message);
  }
  subscribe(handler: (event: MessageEvent<{ content: string }>) => void) {
    this.emitter.removeAllListeners();
    this.emitter.on(this.eventName, handler);
  }
}

const globalThis = global as unknown as { chatService: ChatService };
let chatService: ChatService;
// to ensure this service is singleton in runtimne
if (process.env.NODE_ENV === 'production') {
  chatService = new ChatService();
}
if (!globalThis.chatService) {
  globalThis.chatService = new ChatService();
}
chatService = globalThis.chatService;

export default chatService;
