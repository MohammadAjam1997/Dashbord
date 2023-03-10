import objectPath from "object-path";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store/";
import { config } from "@/core/helpers/config";

class LayoutService {
  /**
   * @description initialize default layout
   */
  public static init(): void {
    //empty body element classes and attributes
    LayoutService.emptyElementClassesAndAttributes(document.body);

    LayoutService.initLayout();
    LayoutService.initHeader();
    LayoutService.initAside();
    LayoutService.initFooter();
  }

  /**
   * @description init layout
   */
  public static initLayout(): void {
    store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
      qualifiedName: "id",
      value: "kt_body",
    });

    if (objectPath.get(config.value, "loader.display")) {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading-enabled");
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
    }
  }

  /**
   * @description init header
   */
  public static initHeader(): void {
    if (objectPath.get(config.value, "header.fixed.desktop")) {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "header-fixed");
    }

    if (objectPath.get(config.value, "header.fixed.tabletAndMobile")) {
      store.dispatch(
        Actions.ADD_BODY_CLASSNAME,
        "header-tablet-and-mobile-fixed"
      );
    }
  }

  /**
   * @description init aside
   */
  public static initAside(): void {
    if (!objectPath.get(config.value, "aside.display")) {
      return;
    }

    // Enable Aside
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "aside-enabled");

    // Minimized
    if (
      objectPath.get(config.value, "aside.minimized") &&
      objectPath.get(config.value, "aside.toggle")
    ) {
      store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
        qualifiedName: "data-kt-aside-minimize",
        value: "on",
      });
    }

    if (objectPath.get(config.value, "aside.fixed")) {
      // Fixed Aside
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "aside-fixed");
    }

    if (objectPath.get(config.value, "aside.secondaryDisplay")) {
      // Aside Secondary Enabled
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "aside-secondary-enabled");
    }

    // Default minimized
    if (objectPath.get(config.value, "aside.minimized")) {
      store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
        qualifiedName: "data-kt-aside-minimize",
        value: "on",
      });
    }
  }

  /**
   * @description init footer
   */
  public static initFooter(): void {
    // Fixed header
    if (objectPath.get(config.value, "footer.width") === "fixed") {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "footer-fixed");
    }
  }

  public static emptyElementClassesAndAttributes(element: HTMLElement): void {
    element.className = "";
    for (let i = element.attributes.length; i-- > 0; )
      element.removeAttributeNode(element.attributes[i]);
  }
}

export default LayoutService;
