"use strict";

var _hooks = require("@sitevision/api/server/hooks");
var _appData = _interopRequireDefault(require("@sitevision/api/server/appData"));
var _PortletContextUtil = _interopRequireDefault(require("@sitevision/api/server/PortletContextUtil"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _hooks.addHeadElement)(function () {
  var currentPortlet = _PortletContextUtil["default"].getCurrentPortlet();
  if (currentPortlet) {
    var wrapperId = "#svid".concat(currentPortlet.getIdentifier().replace(".", "_"));
    var columnWidth = _appData["default"].get("columnWidth");
    return "<style>\n              ".concat(wrapperId, " .env-cardholder-grid {\n                --env-cardholder-grid-column-width: ").concat(columnWidth, "em;\n              }\n              ").concat(wrapperId, " .env-card__header {\n                padding: 0;\n              }\n            </style>");
  }
});