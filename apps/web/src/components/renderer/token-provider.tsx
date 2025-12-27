"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { DesignTokens } from "@repo/templates";
import { generateCSSVariables, defaultTokens } from "@repo/templates";

type TokenContextValue = {
  tokens: DesignTokens;
  cssVariables: string;
};

const TokenContext = createContext<TokenContextValue | null>(null);

export function useTokens(): TokenContextValue {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
}

export function useToken<K extends keyof DesignTokens>(
  category: K
): DesignTokens[K] {
  const { tokens } = useTokens();
  return tokens[category];
}

type TokenProviderProps = {
  tokens?: Partial<DesignTokens>;
  children: React.ReactNode;
};

export function TokenProvider({ tokens: customTokens, children }: TokenProviderProps) {
  const mergedTokens = useMemo(() => {
    if (!customTokens) return defaultTokens;

    return {
      ...defaultTokens,
      ...customTokens,
      colors: {
        ...defaultTokens.colors,
        ...customTokens.colors,
        text: {
          ...defaultTokens.colors.text,
          ...customTokens.colors?.text,
        },
      },
      typography: {
        ...defaultTokens.typography,
        ...customTokens.typography,
        fontFamily: {
          ...defaultTokens.typography.fontFamily,
          ...customTokens.typography?.fontFamily,
        },
        fontSize: {
          ...defaultTokens.typography.fontSize,
          ...customTokens.typography?.fontSize,
        },
        fontWeight: {
          ...defaultTokens.typography.fontWeight,
          ...customTokens.typography?.fontWeight,
        },
        lineHeight: {
          ...defaultTokens.typography.lineHeight,
          ...customTokens.typography?.lineHeight,
        },
        letterSpacing: {
          ...defaultTokens.typography.letterSpacing,
          ...customTokens.typography?.letterSpacing,
        },
      },
      spacing: {
        ...defaultTokens.spacing,
        ...customTokens.spacing,
        scale: {
          ...defaultTokens.spacing.scale,
          ...customTokens.spacing?.scale,
        },
        section: {
          ...defaultTokens.spacing.section,
          ...customTokens.spacing?.section,
        },
        container: {
          ...defaultTokens.spacing.container,
          ...customTokens.spacing?.container,
        },
        gap: {
          ...defaultTokens.spacing.gap,
          ...customTokens.spacing?.gap,
        },
      },
      effects: {
        ...defaultTokens.effects,
        ...customTokens.effects,
        borderRadius: {
          ...defaultTokens.effects.borderRadius,
          ...customTokens.effects?.borderRadius,
        },
        shadow: {
          ...defaultTokens.effects.shadow,
          ...customTokens.effects?.shadow,
        },
        transition: {
          ...defaultTokens.effects.transition,
          ...customTokens.effects?.transition,
        },
        opacity: {
          ...defaultTokens.effects.opacity,
          ...customTokens.effects?.opacity,
        },
      },
      breakpoints: {
        ...defaultTokens.breakpoints,
        ...customTokens.breakpoints,
      },
    } as DesignTokens;
  }, [customTokens]);

  const cssVariables = useMemo(
    () => generateCSSVariables(mergedTokens),
    [mergedTokens]
  );

  const value = useMemo(
    () => ({ tokens: mergedTokens, cssVariables }),
    [mergedTokens, cssVariables]
  );

  return (
    <TokenContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      {children}
    </TokenContext.Provider>
  );
}
