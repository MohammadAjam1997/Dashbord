import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  themeName: "Metronic",
  themeVersion: "8.1.5",
  demo: "demo7",
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/default-dark.svg",
      light: "media/logos/default.svg",
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  loader: {
    logo: "media/logos/default-dark.svg",
    display: true,
    type: "default",
  },
  scrollTop: {
    display: true,
  },
  header: {
    display: true,
    menuIcon: "font",
    width: "fixed",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: true,
    width: "fixed",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "column",
  },
  aside: {
    display: true,
    secondaryDisplay: true,
    theme: "dark",
    fixed: true,
    menuIcon: "svg",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  content: {
    width: "fixed",
  },
  footer: {
    width: "fixed",
  },
};

export default config;
