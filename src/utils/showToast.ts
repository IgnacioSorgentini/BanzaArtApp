import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastOptions {
  text1: string;
  text2?: string;
  visibilityTime?: number;
  bottomOffset?: number;
}

export const showToast = (type: ToastType, { text1, text2, visibilityTime = 1500, bottomOffset = 100 }: ShowToastOptions) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime,
    bottomOffset,
    position: 'bottom',
    autoHide: true,
  });
};