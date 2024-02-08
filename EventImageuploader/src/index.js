import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
import imageUtil from "@sitevision/api/server/ImageUtil";
import storage from "@sitevision/api/server/storage";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import privileged from "@sitevision/api/server/privileged";
import versionUtil from "@sitevision/api/server/VersionUtil";
import i18n from "@sitevision/api/common/i18n";

const eventImages = storage.getCollectionDataStore("eventImages");

router.get("/", (req, res) => {
  if (!privileged.isConfigured()) {
    if (versionUtil.getCurrentVersion() === versionUtil.OFFLINE_VERSION) {
      return res.send(
        renderToStaticMarkup(
          <div className="env-alert env-alert--danger" role="alert">
            {i18n.get("noPrivUserConfigured")}
          </div>
        )
      );
    }
    return;
  }
  const data = {};
  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});

router.post("/upload", (req, res) => {
  const file = req.file("file");
  const { name, description, email } = req.params;

  let image;
  privileged.doPrivilegedAction(() => {
    const localImageRepository = resourceLocatorUtil.getLocalImageRepository();
    image = imageUtil.createImageFromTemporary(localImageRepository, file);

    if (image) {
      const post = eventImages.add({
        image: image.getIdentifier(),
        page: portletContextUtil.getCurrentPage().getIdentifier(),
        name,
        email,
        description,
      });
      eventImages.instantIndex(post.dsid);
    }
  });
  return image ? res.status(204) : res.status(400);
});
