import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4CAF50', backgroundColor: '#FFF9C4' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4CAF50'
            }}
        />
    ),
    info: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#2196F3', backgroundColor: '#FFF9C4' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2196F3'
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold'
            }}
            text2Style={{
                fontSize: 14
            }}
        />
    )
};