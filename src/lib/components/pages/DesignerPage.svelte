<script lang="ts">
  import Hand from '@lucide/svelte/icons/hand'
  import HandMetal from '@lucide/svelte/icons/hand-metal'
  import AppDock from '$lib/components/AppDock.svelte'
  import CameraPreview from '$lib/components/designer/CameraPreview.svelte'
  import FlowerPreview from '$lib/components/designer/FlowerPreview.svelte'
  import FlowerControls from '$lib/components/designer/FlowerControls.svelte'
  import Flower2 from '@lucide/svelte/icons/flower-2'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = {
    onGoHome: () => void
    onGoGarden: () => void
    onPlantFlower: (bloom: { hue: number; scale: number }) => void
  }

  let { onGoHome, onGoGarden, onPlantFlower }: Props = $props()

  let petalHue = $state(338)
  let bloomScale = $state(1)
  let stemHeight = $state(172)

  const plantCurrentFlower = () => onPlantFlower({ hue: petalHue, scale: bloomScale })
</script>

<section
  class="greenhouse page-backdrop relative flex min-h-svh w-full flex-col gap-6 overflow-hidden px-7 pb-28 pt-7"
  aria-labelledby="designer-title"
>
  <div class="relative z-20 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(320px,0.94fr)_minmax(360px,1.06fr)]">
    <div class="contents lg:col-start-1 lg:flex lg:min-h-0 lg:flex-col lg:gap-5">
      <div class="designer-camera min-w-0 lg:flex lg:min-h-0 lg:flex-1">
        <CameraPreview />
      </div>

      <div class="designer-controls min-w-0">
        <FlowerControls
          bind:petalHue
          bind:bloomScale
          bind:stemHeight
          onPlantFlower={plantCurrentFlower}
        />
      </div>

      <section
        class="designer-tips shrink-0 rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
        aria-label="Tips"
      >
        <h2 class="mt-0 mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-ink">Tips</h2>
        <ul class="m-0 grid list-none gap-2.5 p-0">
          <li class="flex items-center gap-2.5 text-[13px] leading-snug text-ink">
            <HandMetal />
            <span>Spread your hands apart to make the flower bigger.</span>
          </li>
          <li class="flex items-center gap-2.5 text-[13px] leading-snug text-ink">
            <Hand />
            <span>Open the other hand wider to grow the petals.</span>
          </li>
        </ul>
      </section>

      <div class="designer-plant-button col-span-full">
        <Button variant="bloom" onclick={plantCurrentFlower} class="w-full">
          <Flower2 size={18} />
          <span>Plant flower</span>
        </Button>
      </div>
    </div>

    <div class="designer-preview min-w-0 lg:col-start-2 lg:flex lg:min-h-0 lg:flex-col">
      <FlowerPreview
        petalHue={petalHue}
        bloomScale={bloomScale}
        stemHeight={stemHeight}
        class="lg:flex-1"
      />
    </div>
  </div>

  <AppDock onGoHome={onGoHome} onGoGarden={onGoGarden} />
</section>

<style>
  @media (max-width: 1023px) {
    .designer-camera {
      order: 1;
    }

    .designer-preview {
      order: 2;
    }

    .designer-plant-button {
      order: 3;
    }

    .designer-controls {
      order: 4;
    }

    .designer-tips {
      order: 5;
    }
  }
</style>