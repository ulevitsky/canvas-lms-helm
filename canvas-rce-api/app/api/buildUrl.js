"use strict";

function buildUrl(domain, path) {
  var protocol = "http";
  if (process.env.HTTP_PROTOCOL_OVERRIDE) {
    protocol = process.env.HTTP_PROTOCOL_OVERRIDE;
  } else if (process.env.NODE_ENV === "production") {
    protocol = "https";
  }
  if (process.env.DOMAIN_OVERRIDE) {
    domain = process.env.DOMAIN_OVERRIDE;
  }
  return protocol + "://" + domain + (path || "");
}

module.exports = buildUrl;
