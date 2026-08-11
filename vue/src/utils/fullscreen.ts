import { ref, onMounted, onUnmounted } from 'vue'
import { createFullscreen } from '../../../core/utils';

export function useFullscreen() {
    const isFullscreen = ref(false)

    let fullscreen: ReturnType<typeof createFullscreen>
    let unsubscribe: (() => void) | undefined

    onMounted(() => {
        fullscreen = createFullscreen()

        unsubscribe = fullscreen.subscribe(
            value => {
                isFullscreen.value = value
            },
        )
    })

    onUnmounted(() => {
        unsubscribe?.()
    })

    return {
        isFullscreen,
        enter: (element: HTMLElement) =>
            fullscreen.enter(element),
        exit: () =>
            fullscreen.exit(),
        toggle: (element: HTMLElement) =>
            fullscreen.toggle(element),
    }
};
