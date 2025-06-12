declare module 'webstomp-client' {
  import SockJS from 'sockjs-client';

  export interface Message {
    body: string;
  }

  export interface Subscription {
    unsubscribe(): void;
  }

  export interface Client {
    [x: string]: () => void;
    connect(
      headers: { [key: string]: string },
      connectCallback: () => void,
      errorCallback?: (error: any) => void
    ): void;
    disconnect(disconnectCallback?: () => void): void;
    subscribe(destination: string, callback: (message: Message) => void, headers: { [key: string]: string } ): Subscription;
    send(destination: string, body?: string, headers?: { [key: string]: string }): void;
  }

  export function over(socket: SockJS): Client;
}
