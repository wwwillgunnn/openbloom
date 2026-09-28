<script lang="ts">
  import { onMount } from 'svelte'
  import {
    detectHands,
    emptyHandsState,
    type HandsState,
  } from '$lib/hand/handTracker'

  type Props = {
    video: HTMLVideoElement | undefined
    onChange?: (hands: HandsState) => void
  }

  let {
    video,
    onChange,
  }: Props = $props()

  let running = false
  let animationFrame = 0

  let hands = $state<HandsState>(
    emptyHandsState(),
  )

  async function detect() {
    if (!running || !video) return

    if (video.readyState < 2) {
      animationFrame = requestAnimationFrame(detect)
      return
    }

    try {
      const result = await detectHands(
        video,
        performance.now(),
      )

      hands = result

      onChange?.(result)
    } catch (error) {
      console.error(
        'Hand detection failed:',
        error,
      )
    }

    animationFrame = requestAnimationFrame(detect)
  }

  onMount(() => {
    running = true

    animationFrame = requestAnimationFrame(detect)

    return () => {
      running = false
      cancelAnimationFrame(animationFrame)
    }
  })
</script>