'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';

export type NotificationType = 'budget_alert' | 'recurring_transaction' | 'goal_achieved' | 'system' | 'reminder';

export interface Notification {
    _id: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedId?: string;
    relatedModel?: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        if (!isAuthenticated()) return;

        try {
            setLoading(true);
            const [listRes, countRes] = await Promise.all([
                api.get('/notifications?limit=20'),
                api.get('/notifications/unread-count')
            ]);

            setNotifications(listRes.data.notifications);
            setUnreadCount(countRes.data.count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => n._id === id ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch('/notifications/mark-all-read');
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n._id !== id));
            // If we deleted an unread notification, update count
            const notification = notifications.find(n => n._id === id);
            if (notification && !notification.isRead) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchNotifications();

        // Poll for new notifications every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            loading,
            fetchNotifications,
            markAsRead,
            markAllAsRead,
            deleteNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
