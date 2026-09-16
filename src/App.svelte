<script lang="ts">
  import HomePage from '$lib/components/pages/HomePage.svelte'
  import GardenPage from '$lib/components/pages/GardenPage.svelte'
  import DesignerPage from '$lib/components/pages/DesignerPage.svelte'

  type View = 'home' | 'garden' | 'designer'

  let view: View = $state('home')

  const goHome = () => (view = 'home')
  const goGarden = () => (view = 'garden')
  const goDesigner = () => (view = 'designer')
</script>

<main class="min-h-svh overflow-hidden">
  {#if view === 'home'}
    <HomePage onOpenGarden={goGarden} onOpenDesigner={goDesigner} />
  {:else if view === 'garden'}
    <GardenPage onGoHome={goHome} onOpenDesigner={goDesigner} />
  {:else}
    <DesignerPage onGoHome={goHome} onGoGarden={goGarden} />
  {/if}
</main>