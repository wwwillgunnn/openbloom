<script lang="ts">
  type Props = {
    petalHue: number
    bloomScale: number
    stemHeight: number
  }

  let { petalHue = $bindable(), bloomScale = $bindable(), stemHeight = $bindable() }: Props =
    $props()
</script>

<section
  class="shrink-0 rounded-lg border border-line bg-surface/80 p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
  aria-label="Flower controls"
>
  <div class="grid grid-cols-3 gap-3.5 max-sm:grid-cols-1">
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span>Petals</span>
      <input type="range" min="0" max="360" bind:value={petalHue} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
    </label>
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span>Bloom</span>
      <input type="range" min="0.78" max="1.28" step="0.01" bind:value={bloomScale} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
    </label>
    <label class="grid gap-2 text-[13px] font-extrabold text-ink">
      <span>Stem</span>
      <input type="range" min="138" max="216" step="1" bind:value={stemHeight} class="w-full accent-[hsl(var(--petal-hue)_78%_54%)]" />
    </label>
  </div>
</section>

<section
  class="shrink-0 rounded-lg border border-line bg-surface/80 p-5 shadow-[var(--shadow)] backdrop-blur-[18px]"
  aria-label="Tips"
>
  <h2 class="mt-0 mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-ink">Tips</h2>
  <ul class="m-0 grid list-none gap-2.5 p-0">
    <li class="flex items-center gap-2.5 text-[13px] leading-snug text-ink">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-[hsl(var(--petal-hue)_78%_54%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11V7a2 2 0 114 0v1m0-1a2 2 0 114 0v2m0-2a2 2 0 114 0v4m-4 8h-3a5 5 0 01-5-5v-2a5 5 0 015-5h3" />
      </svg>
      <span>Spread your hands apart to make the flower bigger.</span>
    </li>
    <li class="flex items-center gap-2.5 text-[13px] leading-snug text-ink">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-[hsl(var(--petal-hue)_78%_54%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8V6m0 12v-2m4-6h2m-12 0h2m8.5-3.5l-1.5 1.5m-5 5L8.5 16.5m11 0l-1.5-1.5m-5-5L8.5 6.5M12 2a4 4 0 014 4v3c0 1.1-.4 2.1-1 2.9V15a3 3 0 01-6 0v-3.1a4 4 0 01-1-2.9V6a4 4 0 014-4z" />
      </svg>
      <span>Open the other hand wider to grow the petals.</span>
    </li>
  </ul>
</section>