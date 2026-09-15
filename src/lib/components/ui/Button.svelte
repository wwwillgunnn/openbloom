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
      'text-white bg-gradient-to-br from-[#df7c9f] to-[#a94f6e] shadow-[0_16px_30px_rgba(148,60,94,0.35)]',
    secondary:
      'text-[#4a1f2f] bg-white/75 border border-[rgba(74,31,47,0.16)] shadow-[0_12px_24px_rgba(74,31,47,0.14)] backdrop-blur',
    quiet:
      'text-[#52303a] bg-white/70 border border-[rgba(74,31,47,0.12)] min-w-[92px]',
  }
</script>

<button
  type={type}
  onclick={onclick}
  class={cn(
    'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-5 font-extrabold tracking-normal transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(74,31,47,0.16)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d96a8c]/40 focus-visible:ring-offset-2 cursor-pointer border-0',
    variants[variant],
    className,
  )}
  {...rest}
>
  {@render children()}
</button>