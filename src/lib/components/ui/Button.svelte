<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils'

  type Props = {
    variant?: 'primary' | 'secondary' | 'quiet'
    class?: string
    type?: 'button' | 'submit' | 'reset'
    onclick?: () => void
    children: Snippet
  }

  let {
    variant = 'primary',
    class: className = '',
    type = 'button',
    onclick,
    children,
    ...rest
  }: Props = $props()

  const variants = {
    primary:
      'text-white bg-gradient-to-br from-rose-soft to-rose-deep shadow-[0_16px_30px_rgba(148,60,94,0.35)]',
    secondary:
      'text-rose-ink bg-white/75 border border-rose-ink/16 shadow-[0_12px_24px_rgba(74,31,47,0.14)] backdrop-blur',
    quiet:
      'text-rose-ink/80 bg-white/70 border border-rose-ink/12 min-w-[92px]',
  }
</script>

<button
  type={type}
  onclick={onclick}
  class={cn(
    'inline-flex min-h-11.5 items-center justify-center gap-2 rounded-lg px-5 font-extrabold tracking-normal transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(74,31,47,0.16)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rose/40 focus-visible:ring-offset-2 cursor-pointer border-0',
    variants[variant],
    className,
  )}
  {...rest}
>
  {@render children()}
</button>