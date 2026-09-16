<script lang="ts">
  import { onMount } from 'svelte'
  import Dock from '$lib/components/svelte-bits/Dock.svelte'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = {
    onGoHome: () => void
    onGoGarden: () => void
  }

  let { onGoHome, onGoGarden }: Props = $props()

  type CameraState = 'idle' | 'asking' | 'live' | 'blocked' | 'unavailable'

  let videoElement: HTMLVideoElement | undefined
  let cameraStream: MediaStream | null = $state(null)
  let cameraState: CameraState = $state('idle')

  let petalHue = $state(338)
  let bloomScale = $state(1)
  let stemHeight = $state(172)

  const petals = Array.from({ length: 12 }, (_, index) => ({
    angle: `${index * 30}deg`,
    depth: `${index % 2 === 0 ? 18 : 6}px`,
  }))

  const flowerStyle = $derived(
    `--petal-hue: ${petalHue}; --bloom-scale: ${bloomScale}; --stem-height: ${stemHeight}px;`,
  )

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
  class="page-backdrop relative flex min-h-[100svh] w-full flex-col gap-6 overflow-hidden px-7 pb-40 pt-7"
  aria-labelledby="designer-title"
>
  <div class="relative z-20 grid min-h-0 flex-1 grid-cols-[minmax(320px,0.94fr)_minmax(360px,1.06fr)] gap-5 max-lg:grid-cols-1">
    <div class="flex min-h-0 flex-col gap-5">
      <section
        class="relative min-h-[220px] flex-1 overflow-hidden rounded-lg border border-[rgba(38,66,56,0.16)] bg-[#13211d] shadow-[var(--shadow)] backdrop-blur-[18px]"
        aria-label="Camera preview"
      >
        <video bind:this={videoElement} autoplay muted playsinline class="block h-full w-full object-cover [transform:scaleX(-1)]"></video>

        {#if cameraState !== 'live'}
          <div class="camera-state-bg absolute inset-0 grid content-center place-items-center gap-4 p-6 text-center text-[#f7f1e6]">
            <span
              class="relative h-[54px] w-[74px] rounded-lg border-[3px] border-[rgba(255,250,242,0.82)]
                before:absolute before:left-[22px] before:top-[12px] before:h-6 before:w-6 before:rounded-full before:border-[3px] before:border-[rgba(255,250,242,0.82)]
                after:absolute after:left-[9px] after:top-[-12px] after:h-[10px] after:w-5 after:rounded-t-md after:bg-[rgba(255,250,242,0.82)]"
              aria-hidden="true"
            ></span>
            <p class="mt-0 mb-0 font-extrabold">{cameraMessage()}</p>
            {#if cameraState !== 'asking'}
              <Button variant="secondary" onclick={startCamera}>Start camera</Button>
            {/if}
          </div>
        {/if}
      </section>

      <section
        class="shrink-0 rounded-lg border border-[rgba(38,66,56,0.16)] bg-[rgba(255,250,242,0.78)] p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
        aria-label="Flower controls"
      >
        <div class="grid grid-cols-3 gap-3.5 max-sm:grid-cols-1">
          <label class="grid gap-2 text-[13px] font-extrabold text-[#24302d]">
            <span>Petals</span>
            <input type="range" min="0" max="360" bind:value={petalHue} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
          </label>
          <label class="grid gap-2 text-[13px] font-extrabold text-[#24302d]">
            <span>Bloom</span>
            <input type="range" min="0.78" max="1.28" step="0.01" bind:value={bloomScale} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
          </label>
          <label class="grid gap-2 text-[13px] font-extrabold text-[#24302d]">
            <span>Stem</span>
            <input type="range" min="138" max="216" step="1" bind:value={stemHeight} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
          </label>
        </div>
      </section>

      <section
        class="shrink-0 rounded-lg border border-[rgba(38,66,56,0.16)] bg-[rgba(255,250,242,0.78)] p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
        aria-label="Tips"
      >
        <h2 class="mt-0 mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-[#24302d]">Tips</h2>
        <ul class="m-0 grid list-none gap-2.5 p-0">
          <li class="flex items-center gap-2.5 text-[13px] leading-snug text-[#24302d]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-[hsl(var(--petal-hue)_78%_54%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 11V7a2 2 0 114 0v1m0-1a2 2 0 114 0v2m0-2a2 2 0 114 0v4m-4 8h-3a5 5 0 01-5-5v-2a5 5 0 015-5h3" />
            </svg>
            <span>Spread your hands apart to make the flower bigger.</span>
          </li>
          <li class="flex items-center gap-2.5 text-[13px] leading-snug text-[#24302d]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-[hsl(var(--petal-hue)_78%_54%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8V6m0 12v-2m4-6h2m-12 0h2m8.5-3.5l-1.5 1.5m-5 5L8.5 16.5m11 0l-1.5-1.5m-5-5L8.5 6.5M12 2a4 4 0 014 4v3c0 1.1-.4 2.1-1 2.9V15a3 3 0 01-6 0v-3.1a4 4 0 01-1-2.9V6a4 4 0 014-4z" />
            </svg>
            <span>Open the other hand wider to grow the petals.</span>
          </li>
        </ul>
      </section>
    </div>

    <section
      class="flex min-h-[560px] flex-col overflow-hidden rounded-lg border border-[rgba(38,66,56,0.16)] bg-[rgba(255,250,242,0.78)] shadow-[var(--shadow)] backdrop-blur-[18px]"
      aria-label="Flower preview"
    >
      <div
        class="preview-stage-bg relative grid min-h-[420px] flex-1 place-items-center overflow-hidden perspective-[1000px]"
      >
        <div class="sky-bg absolute inset-0" aria-hidden="true"></div>
        <div class="mound-bg absolute origin-bottom rounded-[50%] [transform:rotateX(58deg)] -inset-x-[12%] -bottom-[26%] h-[54%]" aria-hidden="true"></div>

        <div
          class="absolute bottom-[12%] left-1/2 z-[2] h-[350px] w-[220px] [transform:translateX(-50%)_rotateX(4deg)] [transform-style:preserve-3d]"
          style={flowerStyle}
          role="img"
          aria-label="Flower preview"
        >
          <span class="absolute bottom-[12px] left-[30px] h-[42px] w-[158px] rounded-[50%] bg-[rgba(24,44,34,0.24)] blur-[2px] [transform:rotateX(64deg)]" aria-hidden="true"></span>
          <span class="stem-bg absolute bottom-[42px] w-[18px] origin-bottom rounded-full shadow-[inset_-4px_0_5px_rgba(20,70,45,0.3),7px_14px_18px_rgba(23,59,42,0.18)] left-[calc(50%-9px)] h-[var(--stem-height)] [transition:height_180ms_ease-out]" aria-hidden="true"></span>
          <span class="leaf-bg absolute left-[26px] h-9 w-[82px] shadow-[0_10px_18px_rgba(23,59,42,0.2)] bottom-[calc(var(--stem-height)-78px)] rounded-[100%_0_100%_0] [transform:rotateZ(-20deg)_rotateX(18deg)]" aria-hidden="true"></span>
          <span class="leaf-bg absolute right-[24px] h-9 w-[82px] shadow-[0_10px_18px_rgba(23,59,42,0.2)] bottom-[calc(var(--stem-height)-78px)] rounded-[0_100%_0_100%] [transform:rotateZ(18deg)_rotateX(18deg)]" aria-hidden="true"></span>
          <span class="absolute left-1/2 origin-center animate-preview-float [transform-style:preserve-3d] bottom-[calc(var(--stem-height)+28px)] h-[136px] w-[136px] [transform:translateX(-50%)_scale(var(--bloom-scale))_rotateX(10deg)]" aria-hidden="true">
            {#each petals as petal}
              <span
                class="petal-bg absolute left-1/2 top-1/2 h-[88px] w-[52px] origin-[50%_92%] rounded-[55%_55%_48%_48%] shadow-[inset_-9px_-16px_16px_rgba(83,36,30,0.16),0_10px_18px_rgba(45,39,31,0.16)] -ml-[26px] -mt-[82px] [transform:rotate(var(--petal-angle))_rotateX(58deg)_translateZ(var(--petal-depth))]"
                style={`--petal-angle: ${petal.angle}; --petal-depth: ${petal.depth};`}
              ></span>
            {/each}
            <span class="core-bg absolute left-1/2 top-1/2 h-[46px] w-[46px] rounded-full shadow-[inset_-6px_-8px_10px_rgba(96,64,34,0.24),0_10px_16px_rgba(45,39,31,0.18)] [transform:translate(-50%,-50%)_translateZ(34px)]"></span>
          </span>
        </div>
      </div>
    </section>
  </div>

  <div class="absolute inset-x-0 bottom-6 z-30 flex justify-center">
    <Dock
      items={[
        { label: 'Welcome', icon: homeIcon, onClick: onGoHome },
        { label: 'Garden', icon: gardenIcon, onClick: onGoGarden },
        { label: 'Designer', icon: designerIcon, onClick: () => {} },
      ]}
    />
  </div>
</section>

{#snippet homeIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
  </svg>
{/snippet}

{#snippet gardenIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 118-9M12 21a9 9 0 01-1-18m1 18a9 9 0 001-18 9 9 0 01-1 0m2-11a3 3 0 11-6 0m2 8h.01" />
  </svg>
{/snippet}

{#snippet designerIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
{/snippet}