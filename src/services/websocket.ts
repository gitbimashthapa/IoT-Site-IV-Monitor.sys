import { IVData } from '../types';

export class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private listeners: Set<(data: IVData) => void> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private url: string = '';

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(url: string): Promise<void> {
    this.url = url;
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
          this.handleDisconnect();
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.handleDisconnect();
          reject(error);
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const enrichedData: IVData = {
              ...data,
              timestamp: data.timestamp || new Date().toISOString(),
              isConnected: true,
            };
            this.notifyListeners(enrichedData);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

      } catch (error) {
        console.error('Connection error:', error);
        reject(error);
      }
    });
  }

  private handleDisconnect() {
    const disconnectedData: IVData = {
      volumeInMl: 0,
      percentage: 0,
      timestamp: new Date().toISOString(),
      isConnected: false,
      hx711Connected: false,
    };
    this.notifyListeners(disconnectedData);

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect(this.url);
      }, 5000);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  public subscribe(callback: (data: IVData) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(data: IVData): void {
    this.listeners.forEach(listener => listener(data));
  }

  public isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}