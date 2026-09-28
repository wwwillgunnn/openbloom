<script lang="ts">
  type Props = {
    petalHue: number
    bloomScale: number
    stemHeight: number
    onPlantFlower: () => void
  }

  let {
    petalHue = $bindable(),
    bloomScale = $bindable(),
    stemHeight = $bindable(),
    onPlantFlower,
  }: Props = $props()
</script>

<section
  class="shrink-0 rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
  aria-label="Flower controls"
>
  <div class="grid grid-cols-3 gap-3.5 max-sm:grid-cols-1">
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span class="flex items-center justify-between uppercase">
        <span>Petals</span>
        <output class="font-mono tabular-nums text-ink-soft">{petalHue}</output>
      </span>
      <input type="range" min="0" max="360" bind:value={petalHue} class="w-full" />
    </label>
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span class="flex items-center justify-between uppercase">
        <span>Bloom</span>
        <output class="font-mono tabular-nums text-ink-soft">{Number(bloomScale).toFixed(2)}</output>
      </span>
      <input type="range" min="0.78" max="1.28" step="0.01" bind:value={bloomScale} class="w-full" />
    </label>
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span class="flex items-center justify-between uppercase">
        <span>Stem</span>
        <output class="font-mono tabular-nums text-ink-soft">{stemHeight}</output>
      </span>
      <input type="range" min="138" max="216" step="1" bind:value={stemHeight} class="w-full" />
    </label>
  </div>
</section>

<style>
  input[type='range'] {
    accent-color: var(--color-rose-soft);
  }
</style>