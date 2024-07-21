export interface layoutConfig {
  ripple: boolean;
  darkTheme: boolean;
  inputStyle: string;
  menuMode: string;
  theme: string;
  scale: number;
  activeMenuItem: null;
}

export interface layoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}
