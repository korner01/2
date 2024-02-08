import { addHeadElement } from "@sitevision/api/server/hooks";
import appData from "@sitevision/api/server/appData";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";

addHeadElement(() => {
  const currentPortlet = portletContextUtil.getCurrentPortlet();
  if (currentPortlet) {
    const wrapperId = `#svid${currentPortlet
      .getIdentifier()
      .replace(".", "_")}`;
    const columnWidth = appData.get("columnWidth");
    return `<style>
              ${wrapperId} .env-cardholder-grid {
                --env-cardholder-grid-column-width: ${columnWidth}em;
              }
              ${wrapperId} .env-card__header {
                padding: 0;
              }
            </style>`;
  }
});
