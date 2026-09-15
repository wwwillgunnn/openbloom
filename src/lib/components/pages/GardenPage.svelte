<script lang="ts">
  import Dock from '$lib/components/svelte-bits/Dock.svelte'

  type Props = {
    onGoHome: () => void
    onOpenDesigner: () => void
  }

  let { onGoHome, onOpenDesigner }: Props = $props()

  const plantedBlooms = [
    { left: '16%', top: '66%', scale: 0.66, hue: 342, delay: '-1.3s' },
    { left: '31%', top: '72%', scale: 0.54, hue: 42, delay: '-0.2s' },
    { left: '60%', top: '69%', scale: 0.7, hue: 206, delay: '-0.8s' },
    { left: '76%', top: '61%', scale: 0.58, hue: 312, delay: '-1.8s' },
    { left: '86%', top: '77%', scale: 0.5, hue: 18, delay: '-0.6s' },
  ]
</script>

<section
  class="page-backdrop relative min-h-[100svh] w-full overflow-hidden p-7"
  aria-labelledby="garden-title"
>
  <div class="absolute inset-0 z-0 perspective-[1200px] [transform-style:preserve-3d]">
    <div
      class="horizon-bg absolute bottom-[32%] left-[4%] right-[4%] h-[28%] rounded-[50%] origin-bottom [transform:rotateX(62deg)]"
      aria-hidden="true"
    ></div>

    <div
      class="bed-bg absolute bottom-[2%] left-[3%] right-[3%] h-[48%] origin-bottom rounded-[50%_50%_22%_22%] shadow-[0_34px_80px_rgba(34,56,42,0.26)] [transform:rotateX(64deg)_rotateZ(-2deg)]"
      aria-hidden="true"
    ></div>

    {#each plantedBlooms as bloom}
      <div
        class="absolute h-[126px] w-[58px] origin-bottom animate-flower-sway [transform:translate(-50%,-100%)_scale(var(--bloom-scale))]"
        style={`left: ${bloom.left}; top: ${bloom.top}; --petal-hue: ${bloom.hue}; --bloom-scale: ${bloom.scale}; animation-delay: ${bloom.delay};`}
      >
        <span class="tiny-stem-bg absolute bottom-0 left-[27px] h-[78px] w-[8px] rounded-full shadow-[inset_-2px_0_4px_rgba(10,55,35,0.28)]"></span>
        <span class="tiny-leaf-bg absolute bottom-[34px] left-1 h-4 w-7 rounded-[100%_0_100%_0] shadow-[0_5px_10px_rgba(18,58,40,0.18)] [transform:rotate(-18deg)]"></span>
        <span class="tiny-leaf-bg absolute bottom-[34px] right-[3px] h-4 w-7 rounded-[0_100%_0_100%] shadow-[0_5px_10px_rgba(18,58,40,0.18)] [transform:rotate(17deg)]"></span>
        <span class="tiny-bloom-bg absolute left-[7px] top-0 h-12 w-12 rounded-full shadow-[inset_-8px_-9px_12px_rgba(96,42,30,0.18),0_10px_16px_rgba(32,56,40,0.18)] [transform:rotateX(18deg)_rotateZ(-10deg)]"></span>
      </div>
    {/each}

    <div
      class="absolute left-[49%] top-[71%] h-[88px] w-[220px] animate-ring-pulse rounded-[50%] border-[3px] border-[rgba(255,250,242,0.72)] bg-[rgba(111,76,54,0.18)] [transform:translate(-50%,-50%)_rotateX(64deg)]"
      aria-hidden="true"
    >
      <span class="absolute rounded-[50%] bg-[rgba(108,73,53,0.38)] inset-[15px_24px]"></span>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-6 z-30 flex justify-center">
    <Dock
      items={[
        { label: 'Welcome', icon: homeIcon, onClick: onGoHome },
        { label: 'Designer', icon: designIcon, onClick: onOpenDesigner },
      ]}
    />
  </div>
</section>

{#snippet homeIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
  </svg>
{/snippet}

{#snippet designIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 118-9M12 21a9 9 0 01-1-18m1 18a9 9 0 001-18 9 9 0 01-1 0m2-11a3 3 0 11-6 0m2 8h.01" />
  </svg>
{/snippet}