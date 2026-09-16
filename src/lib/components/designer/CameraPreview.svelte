<script lang="ts">
  import { onMount } from 'svelte'
  import Button from '$lib/components/ui/Button.svelte'

  type CameraState = 'idle' | 'asking' | 'live' | 'blocked' | 'unavailable'

  type Props = {
    class?: string
  }

  let { class: className = '' }: Props = $props()

  let videoElement: HTMLVideoElement | undefined
  let cameraStream: MediaStream | null = $state(null)
  let cameraState: CameraState = $state('idle')

  const stopCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop())
    cameraStream = null

    if (videoElement) {
      videoElement.srcObject = null
    }

    cameraState = 'idle'
  }

  const startCamera = async () => {
    if (cameraState === 'live') return

    if (!navigator.mediaDevices?.getUserMedia) {
      cameraState = 'unavailable'
      return
    }

    cameraState = 'asking'

    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })

      if (videoElement) {
        videoElement.srcObject = cameraStream
        await videoElement.play()
        cameraState = 'live'
      }
    } catch {
      cameraState = 'blocked'
    }
  }

  const cameraMessage = () => {
    if (cameraState === 'asking') return 'Opening camera...'
    if (cameraState === 'blocked') return 'Camera access is blocked'
    if (cameraState === 'unavailable') return 'Camera is unavailable'
    return 'Camera preview'
  }

  onMount(() => {
    startCamera()
    return () => stopCamera()
  })
</script>

<section
  class={`relative min-h-55 flex-1 overflow-hidden rounded-lg border border-line bg-pine-800 shadow-[var(--shadow)] backdrop-blur-[18px] ${className}`}
  aria-label="Camera preview"
>
  <video bind:this={videoElement} autoplay muted playsinline class="block h-full w-full object-cover -scale-x-100"></video>

  {#if cameraState !== 'live'}
    <div class="camera-state-bg absolute inset-0 grid content-center place-items-center gap-4 p-6 text-center text-cream">
      <span
        class="relative h-13.5 w-18.5 rounded-lg border-3 border-cream/82
          before:absolute before:left-5.5 before:top-3 before:h-6 before:w-6 before:rounded-full before:border-3 before:border-cream/82
          after:absolute after:left-2.25 after:-top-3 after:h-2.5 after:w-5 after:rounded-t-md after:bg-cream/82"
        aria-hidden="true"
      ></span>
      <p class="mt-0 mb-0 font-extrabold">{cameraMessage()}</p>
      {#if cameraState !== 'asking'}
        <Button variant="secondary" onclick={startCamera}>Start camera</Button>
      {/if}
    </div>
  {/if}
</section>