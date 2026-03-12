export {}

/**
 * windowオブジェクトの型定義（TypeScript用）
 */
declare global {
    interface Window {
        electronAPI: {
            sendReady: () => void
        };
    }
}