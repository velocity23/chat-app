import { useCallback, useEffect, useState } from 'react';

export default function useFocus() {
    const [isInFocus, setIsInFocus] = useState(true);

    const onFocus = useCallback(() => setIsInFocus(true), []);
    const onBlur = useCallback(() => setIsInFocus(false), []);

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    });

    return isInFocus;
}
