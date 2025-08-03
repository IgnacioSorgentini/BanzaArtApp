import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastOptions {
  text1: string;
  text2?: string;
  visibilityTime?: number;
  topOffset?: number;
}

export const showToast = (type: ToastType, { text1, text2, visibilityTime = 1500, topOffset = 10 }: ShowToastOptions) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime,
    topOffset,
    position: 'top',
    autoHide: true,
  });
};