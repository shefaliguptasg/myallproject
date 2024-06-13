export interface StrapiHeader {
  Authorization: string;
}

export interface StrapiPath {
  name?: string;
  routePath: string;
  strapiPath: string;
  refs?: string[];
  strapiFooterPaths?: StrapiPathWithRefs[];
  data?: StrapiData;
}

export interface StrapiData {
  [key: string]: any;
}

export interface StrapiPathWithRefs {
  main: string;
  refs?: string[];
}

export interface StrapiHeaderData {
  logo: StrapiIcon;
  navigation_items?: StrapiNavigationItem[];
}

export interface StrapiIcon {
  url: string;
}

export interface StrapiNavigationItem {
  title: string;
  icon: StrapiIcon;
  link: StrapiLink;
}

export interface StrapiLink {
  title: string;
  href: string;
}

export interface SideMenuItem {
  id: string;
  parentTitle: string;
  SubMenuBar: SideMenuSubItem[];
}

export interface SideMenuSubItem {
  menuLink: string;
  menuText: string;
  menuIcon: string;
}
export interface MaintenacePage {
  ErrorHeading: string;
  errorDescription: string;
  Image: string;
  errType: string;
  Button: {
    ButtonText?: string;
    ButtonLink?: any;
  };
}
