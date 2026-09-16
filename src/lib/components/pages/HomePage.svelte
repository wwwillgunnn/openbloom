<script lang="ts">
  import pinkRoseBg from '../../../assets/pink-rose_bg.mp4'
  import SplitText from '$lib/components/svelte-bits/SplitText.svelte'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = {
    onOpenGarden: () => void
    onOpenDesigner: () => void
  }

  let { onOpenGarden, onOpenDesigner }: Props = $props()
</script>

<section
  class="relative grid min-h-svh w-full place-items-center overflow-hidden py-16"
  aria-labelledby="welcome-title"
>
  <video
    class="absolute inset-0 z-0 h-full w-full object-cover"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    aria-hidden="true"
    src={pinkRoseBg}
  ></video>
  <div class="hero-overlay-bg absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>

  <div class="relative z-20 flex flex-col items-center px-6 text-center perspective-[800px]">
    <SplitText
      text="OPENBLOOM"
      tag="h1"
      splitType="chars"
      delay={70}
      duration={1.2}
      from={{ opacity: 0, y: 70, rotateX: -24 }}
      to={{ opacity: 1, y: 0, rotateX: 0 }}
      class="text-white text-[clamp(3.2rem,15vw,12rem)] leading-none font-black tracking-tight m-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.22),0_10px_32px_rgba(0,0,0,0.18)]"
    />

    <div class="mt-14 flex flex-wrap items-center justify-center gap-4">
      <Button onclick={onOpenGarden}>View Garden</Button>
      <Button variant="secondary" onclick={onOpenDesigner}>Make Flower</Button>
    </div>
  </div>
</section>