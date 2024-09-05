import { showMessage } from 'react-native-flash-message';

export const showErrorMsg = (msgStr, options = {}) =>
    showMessage({
        message: msgStr,
        type: 'danger',
        ...options,
    });

export const showSuccessMsg = (msgStr, options = {}) =>
    showMessage({
        message: msgStr,
        type: 'success',
        ...options
    });

export const showWarningMsg = (msgStr, options = {}) =>
    showMessage({
        message: msgStr,
        type: 'warning',
        ...options
    });
