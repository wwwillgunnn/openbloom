<script lang="ts">
  import Dock from '$lib/components/svelte-bits/Dock.svelte'

  type Props = {
    onGoHome?: () => void
    onGoGarden?: () => void
    onGoDesigner?: () => void
  }

  let { onGoHome, onGoGarden, onGoDesigner }: Props = $props()

  const noop = () => {}
</script>

<div class="absolute inset-x-0 bottom-6 z-30 flex justify-center">
  <Dock
    items={[
      { label: 'Welcome', icon: homeIcon, onClick: onGoHome ?? noop },
      { label: 'Garden', icon: gardenIcon, onClick: onGoGarden ?? noop },
      { label: 'Designer', icon: designerIcon, onClick: onGoDesigner ?? noop },
    ]}
  />
</div>

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