<script lang="ts">
  import HomePage from '$lib/components/pages/HomePage.svelte'
  import GardenPage from '$lib/components/pages/GardenPage.svelte'
  import DesignerPage from '$lib/components/pages/DesignerPage.svelte'

  type View = 'home' | 'garden' | 'designer'
  type PlantedBloom = { hue: number; scale: number }

  let view: View = $state('home')
  let plantedBlooms: PlantedBloom[] = $state([])

  const goHome = () => (view = 'home')
  const goGarden = () => (view = 'garden')
  const goDesigner = () => (view = 'designer')
  const plantFlower = (bloom: PlantedBloom) => {
    plantedBlooms = [...plantedBlooms, bloom]
    goGarden()
  }
</script>

<main class="min-h-svh overflow-hidden">
  {#if view === 'home'}
    <HomePage onOpenGarden={goGarden} onOpenDesigner={goDesigner} />
  {:else if view === 'garden'}
    <GardenPage onGoHome={goHome} onOpenDesigner={goDesigner} {plantedBlooms} />
  {:else}
    <DesignerPage onGoHome={goHome} onGoGarden={goGarden} onPlantFlower={plantFlower} />
  {/if}
</main>