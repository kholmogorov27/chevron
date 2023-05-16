const settings = JSON.parse(localStorage.getItem('settings'))
if (settings) {
const colorScheme = settings.appearance.colorScheme === 'auto'
  ? window.matchMedia("(prefers-color-scheme: dark)").matches
    ? 'dark'
    : 'light'
  : settings.appearance.colorScheme
document.documentElement.style.backgroundColor = settings.appearance.themes[settings.appearance.activeTheme][colorScheme].background;
document.documentElement.style.setProperty('--background-image', `url("${settings.appearance.backgroundImageURL}")`, 'important');
}
