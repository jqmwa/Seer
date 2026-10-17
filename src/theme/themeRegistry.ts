import themesJson from './themes.json'
import { ThemeDefinition, ThemeRegistry } from './themeTypes'

export const themeRegistry = themesJson as ThemeRegistry

export function getTheme(themeId: string): ThemeDefinition {
  return themeRegistry.themes[themeId] || themeRegistry.themes['seer-osiris']
}

export function listThemes() {
  return Object.entries(themeRegistry.themes).map(([id, theme]) => ({ id, label: theme.label }))
}
