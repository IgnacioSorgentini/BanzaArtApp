import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ backgroundColor: '#4CAF50' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#ffffff'
            }}
        />
    ),
    info: (props: any) => (
        <BaseToast
            {...props}
            style={{ backgroundColor: '#2196F3' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#ffffff'
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ backgroundColor: '#F44336' }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#ffffff'
            }}
            text2Style={{
                fontSize: 14
            }}
        />
    )
};