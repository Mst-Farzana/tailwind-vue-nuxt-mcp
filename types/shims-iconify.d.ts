// types/shims-iconify.d.ts
declare module '@iconify/vue' {
  import type { DefineComponent } from 'vue';

  export interface IconProps {
    icon: string;
    width?: string | number | null;
    height?: string | number | null;
    color?: string | null;
  }

  const Icon: DefineComponent<IconProps>;
  export { Icon };
}
