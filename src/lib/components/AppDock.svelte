<script lang="ts">
  import Dock from '$lib/components/svelte-bits/Dock.svelte'
    import House from '@lucide/svelte/icons/house';
    import Rose from '@lucide/svelte/icons/rose';
    import Paintbrush from '@lucide/svelte/icons/paintbrush';

  type Props = {
    onGoHome?: () => void
    onGoGarden?: () => void
    onGoDesigner?: () => void
  }

  let { onGoHome, onGoGarden, onGoDesigner }: Props = $props()

  const noop = () => {}
</script>

<div class="absolute inset-x-0 bottom-4 z-30 flex justify-center">
  <Dock
    items={[
      { label: 'Welcome', icon: homeIcon, onClick: onGoHome ?? noop },
      { label: 'Garden', icon: gardenIcon, onClick: onGoGarden ?? noop },
      { label: 'Designer', icon: designerIcon, onClick: onGoDesigner ?? noop },
    ]}
  />
</div>

{#snippet homeIcon()}
  <House />
{/snippet}

{#snippet gardenIcon()}
  <Rose />
{/snippet}

{#snippet designerIcon()}
  <Paintbrush />
{/snippet}