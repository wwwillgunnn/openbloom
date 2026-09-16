<script lang="ts">
  import AppDock from '$lib/components/AppDock.svelte'
  import CameraPreview from '$lib/components/designer/CameraPreview.svelte'
  import FlowerPreview from '$lib/components/designer/FlowerPreview.svelte'
  import FlowerControls from '$lib/components/designer/FlowerControls.svelte'

  type Props = {
    onGoHome: () => void
    onGoGarden: () => void
  }

  let { onGoHome, onGoGarden }: Props = $props()

  let petalHue = $state(338)
  let bloomScale = $state(1)
  let stemHeight = $state(172)
</script>

<section
  class="greenhouse page-backdrop relative flex min-h-svh w-full flex-col gap-6 overflow-hidden px-7 pb-28 pt-7"
  aria-labelledby="designer-title"
>
  <div class="relative z-20 grid min-h-0 flex-1 grid-cols-[minmax(320px,0.94fr)_minmax(360px,1.06fr)] gap-5 max-lg:grid-cols-1">
    <div class="flex min-h-0 flex-col gap-5">
      <CameraPreview />

      <FlowerControls bind:petalHue bind:bloomScale bind:stemHeight />
    </div>

    <FlowerPreview petalHue={petalHue} bloomScale={bloomScale} stemHeight={stemHeight} />
  </div>

  <AppDock onGoHome={onGoHome} onGoGarden={onGoGarden} />
</section>