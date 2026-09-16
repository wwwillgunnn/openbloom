<script lang="ts">
  type Props = {
    petalHue: number
    bloomScale: number
    stemHeight: number
    class?: string
  }

  let { petalHue, bloomScale, stemHeight, class: className = '' }: Props = $props()

  const petals = Array.from({ length: 12 }, (_, index) => ({
    angle: `${index * 30}deg`,
    depth: `${index % 2 === 0 ? 18 : 6}px`,
  }))

  const flowerStyle = $derived(
    `--petal-hue: ${petalHue}; --bloom-scale: ${bloomScale}; --stem-height: ${stemHeight}px;`,
  )
</script>

<section
  class={`flex min-h-140 flex-col overflow-hidden rounded-lg border border-line bg-surface/80 shadow-[var(--shadow)] backdrop-blur-[18px] ${className}`}
  aria-label="Flower preview"
>
  <div class="preview-stage-bg relative grid min-h-105 flex-1 place-items-center overflow-hidden perspective-[1000px]">
    <div class="sky-bg absolute inset-0" aria-hidden="true"></div>
    <div class="mound-bg absolute origin-bottom rounded-[50%] [transform:rotateX(58deg)] -inset-x-[12%] -bottom-[26%] h-[54%]" aria-hidden="true"></div>

    <div
      class="absolute bottom-[12%] left-1/2 z-2 h-87.5 w-55 -translate-x-1/2 rotate-x-4 transform-3d"
      style={flowerStyle}
      role="img"
      aria-label="Flower preview"
    >
      <span class="absolute bottom-3 left-7.5 h-10.5 w-39.5 rounded-[50%] bg-[rgba(24,44,34,0.24)] blur-[2px] [transform:rotateX(64deg)]" aria-hidden="true"></span>
      <span class="stem-bg absolute bottom-10.5 w-4.5 origin-bottom rounded-full shadow-[inset_-4px_0_5px_rgba(20,70,45,0.3),7px_14px_18px_rgba(23,59,42,0.18)] left-[calc(50%-9px)] h-[var(--stem-height)] [transition:height_180ms_ease-out]" aria-hidden="true"></span>
      <span class="leaf-bg absolute left-6.5 h-9 w-20.5 shadow-[0_10px_18px_rgba(23,59,42,0.2)] bottom-[calc(var(--stem-height)-78px)] rounded-[100%_0_100%_0] [transform:rotateZ(-20deg)_rotateX(18deg)]" aria-hidden="true"></span>
      <span class="leaf-bg absolute right-6 h-9 w-20.5 shadow-[0_10px_18px_rgba(23,59,42,0.2)] bottom-[calc(var(--stem-height)-78px)] rounded-[0_100%_0_100%] [transform:rotateZ(18deg)_rotateX(18deg)]" aria-hidden="true"></span>
      <span class="absolute left-1/2 origin-center animate-preview-float transform-3d bottom-[calc(var(--stem-height)+28px)] h-34 w-34 [transform:translateX(-50%)_scale(var(--bloom-scale))_rotateX(10deg)]" aria-hidden="true">
        {#each petals as petal}
          <span
            class="petal-bg absolute left-1/2 top-1/2 h-22 w-13 origin-[50%_92%] rounded-[55%_55%_48%_48%] shadow-[inset_-9px_-16px_16px_rgba(83,36,30,0.16),0_10px_18px_rgba(45,39,31,0.16)] -ml-6.5 -mt-20.5 [transform:rotate(var(--petal-angle))_rotateX(58deg)_translateZ(var(--petal-depth))]"
            style={`--petal-angle: ${petal.angle}; --petal-depth: ${petal.depth};`}
          ></span>
        {/each}
        <span class="core-bg absolute left-1/2 top-1/2 h-11.5 w-11.5 rounded-full shadow-[inset_-6px_-8px_10px_rgba(96,64,34,0.24),0_10px_16px_rgba(45,39,31,0.18)] [transform:translate(-50%,-50%)_translateZ(34px)]"></span>
      </span>
    </div>
  </div>
</section>