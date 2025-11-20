'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useRole } from '@/app/context/role-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Shield, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function UsersPage() {
    const { t } = useLanguage();
    const { isAdmin } = useRole();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            toast.error(t('Failed to load users'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await api.patch(`/users/${userId}/role`, { role: newRole });
            toast.success(t('Role updated successfully'));
            fetchUsers();
        } catch (error: any) {
            console.error('Error updating role:', error);
            toast.error(t('Failed to update role'));
        }
    };

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (!confirm(t('Are you sure you want to delete user') + ` "${userName}"?`)) {
            return;
        }

        try {
            await api.delete(`/users/${userId}`);
            toast.success(t('User deleted successfully'));
            fetchUsers();
        } catch (error: any) {
            console.error('Error deleting user:', error);
            toast.error(t('Failed to delete user'));
        }
    };

    const getRoleBadgeClass = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-500/10 text-red-600 border border-red-500/20';
            case 'manager':
                return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 border border-gray-500/20';
        }
    };

    return (
        <RoleGuard requiredRole="manager">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gradient flex items-center gap-2">
                            <Users className="h-8 w-8" />
                            {t('User Management')}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {isAdmin()
                                ? t('Manage user roles and permissions')
                                : t('View all users in the system')
                            }
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            {t('All Users')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('Name')}</TableHead>
                                    <TableHead>{t('Email')}</TableHead>
                                    <TableHead>{t('Role')}</TableHead>
                                    <TableHead>{t('Joined Date')}</TableHead>
                                    {isAdmin() && <TableHead className="text-right">{t('Actions')}</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={isAdmin() ? 5 : 4} className="h-24 text-center">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                        </TableCell>
                                    </TableRow>
                                ) : users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isAdmin() ? 5 : 4} className="h-24 text-center text-muted-foreground">
                                            {t('No users found')}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell className="font-medium">{user.fullName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={getRoleBadgeClass(user.role)}>
                                                    {t(user.role.charAt(0).toUpperCase() + user.role.slice(1))}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            {isAdmin() && (
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Select
                                                            value={user.role}
                                                            onValueChange={(newRole) => handleRoleChange(user._id, newRole)}
                                                        >
                                                            <SelectTrigger className="w-[120px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="user">{t('User')}</SelectItem>
                                                                <SelectItem value="manager">{t('Manager')}</SelectItem>
                                                                <SelectItem value="admin">{t('Admin')}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteUser(user._id, user.fullName)}
                                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </RoleGuard>
    );
}
