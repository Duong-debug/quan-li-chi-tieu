'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface AvatarUploadProps {
    currentAvatar?: string;
    userName: string;
    onAvatarUpdate: (avatarUrl: string) => void;
}

export function AvatarUpload({ currentAvatar, userName, onAvatarUpdate }: AvatarUploadProps) {
    const { t } = useLanguage();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentAvatar);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error(t('File too large. Max 2MB'));
            return;
        }

        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            toast.error(t('Invalid file type. Use JPG or PNG'));
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await api.post('/upload/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const avatarUrl = response.data.avatar;
            setPreview(avatarUrl);
            onAvatarUpdate(avatarUrl);
            toast.success(t('Avatar uploaded successfully'));
        } catch (error: any) {
            console.error('Error uploading avatar:', error);
            toast.error(error.response?.data?.message || 'Failed to upload avatar');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
                <AvatarImage src={preview ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${preview}` : undefined} alt={userName} />
                <AvatarFallback className="text-2xl">{getInitials(userName)}</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    {t('JPG or PNG. Max 2MB')}
                </p>
                <div>
                    <input
                        type="file"
                        id="avatar-upload-input"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                    <label
                        htmlFor="avatar-upload-input"
                        className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t('Uploading...')}
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                {currentAvatar ? t('Change Avatar') : t('Upload Avatar')}
                            </>
                        )}
                    </label>
                </div>
            </div>
        </div>
    );
}
