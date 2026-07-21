export interface WorldSection {
  id: string;
  label: string;
  still: string;
  stillMobile?: string;
  clip: string;
  clipMobile?: string;
  accent?: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export interface WorldConfig {
  brand?: { name: string; href?: string };
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  hint?: string;
  nav?: boolean;
  atmosphere?: boolean;
  sections: WorldSection[];
  connectors: (string | null)[];
  connectorsMobile?: (string | null)[];
}

declare const engine: { mountScrollWorld: (container: HTMLElement, config: WorldConfig) => void };
export default engine;
