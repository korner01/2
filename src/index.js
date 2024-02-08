import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import restAppInvokerFactory from "@sitevision/api/server/RestAppInvokerFactory";
import restApi from "@sitevision/api/server/RestApi";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
import systemUserUtil from "@sitevision/api/server/SystemUserUtil";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";

const restApp = restAppInvokerFactory.fromPath("/rest-api/articleFetcher");

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {
    if (req.xhr) {
      return res.status(401);
    }
    return;
  }
  const user = portletContextUtil.getCurrentUser;
  next();
});

router.get("/", (req, res) => {
  const archive = appData.get("archive");
  const selectedTags = req.session.selectedTags
    ? req.session.selectedTags
    : ["important", "staff"];

  if (!archive) {
    return res.send("Configure module");
  }

  const articles = restApp.get("/search", {
    archive,
    query: ["important", "staff"],
  }).body.articles;

  const tags = restApp.get("/getTagOptions", {
    archive,
  }).body.tags;

  const data = {
    articles,
    tags,
    selectedTags,
  };

  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});

router.get("/filterNews", (req, res) => {
  const { query } = req.params;
  req.session.selectedTags = query;

  const articles = restApp.get("/search", {
    archive: appData.get("archive"),
    query,
  }).body.articles;

  res.json(articles);
});

router.post("/like", (req, res) => {
  const { article } = req.params;

  const articleNode = resourceLocatorUtil.getNodeByIdentifier(article);
  restApi.post(articleNode, "likes", {});
  res.status(204);
});

router.delete("/like", (req, res) => {
  const { article } = req.params;

  const articleNode = resourceLocatorUtil.getNodeByIdentifier(article);
  restApi.delete(articleNode, "likes");
  res.status(204);
});
