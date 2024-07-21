import { computed, reactive, toRefs } from "vue";

const layoutConfig = reactive({
  ripple: true,
  darkTheme: false,
  inputStyle: "outlined",
  menuMode: "static",
  theme: "aura-light-green",
  scale: 14,
  activeMenuItem: null,
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
});

export function useLayout() {
  const onMenuToggled = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth >= 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSideBarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );
  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    isSideBarActive,
    onMenuToggled,
  };
}
