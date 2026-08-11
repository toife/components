export function createFullscreen() {
  const listeners = new Set<(isFullscreen: boolean) => void>()

  const isFullscreen = () => {
      return !!document.fullscreenElement
  }

  const enter = async (element: HTMLElement) => {
      if (!document.fullscreenElement) {
          await element.requestFullscreen()
      }
  }

  const exit = async () => {
      if (document.fullscreenElement) {
          await document.exitFullscreen()
      }
  }

  const toggle = async (element: HTMLElement) => {
      if (document.fullscreenElement) {
          await exit()
      } else {
          await enter(element)
      }
  }

  const notify = () => {
      const state = isFullscreen()

      listeners.forEach(listener => {
          listener(state)
      })
  }

  const subscribe = (
      listener: (isFullscreen: boolean) => void,
  ) => {
      listeners.add(listener)

      document.addEventListener(
          'fullscreenchange',
          notify,
      )

      return () => {
          listeners.delete(listener)

          if (listeners.size === 0) {
              document.removeEventListener(
                  'fullscreenchange',
                  notify,
              )
          }
      }
  }

  return {
      isFullscreen,
      enter,
      exit,
      toggle,
      subscribe,
  }
};
