
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AppState {
  services: Service[];
  messages: ContactMessage[];
  notifications: AppNotification[];
  isAdmin: boolean;
  isLoading: boolean;
}

export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'UPDATE_SERVICE'; payload: Service }
  | { type: 'DELETE_SERVICE'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ContactMessage }
  | { type: 'MARK_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: AppNotification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };
