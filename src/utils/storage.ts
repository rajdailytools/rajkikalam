const FAVORITES_KEY = 'rajkikalam_saved_ids';
const THEME_KEY = 'rajkikalam_theme';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading favorites:', err);
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const favs = getFavorites();
  return favs.includes(id);
}

export function toggleFavorite(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    let updated: string[];
    let isNowFavorite = false;
    if (index > -1) {
      updated = favs.filter(favId => favId !== id);
      isNowFavorite = false;
    } else {
      updated = [...favs, id];
      isNowFavorite = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
    return isNowFavorite;
  } catch (err) {
    console.error('Error toggling favorite:', err);
    return false;
  }
}

export function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setPersistedTheme(theme: 'light' | 'dark') {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new Event('theme-updated'));
  } catch (err) {
    console.error('Error saving theme:', err);
  }
}
