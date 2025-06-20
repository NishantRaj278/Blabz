import {
  isDevelopmentFromPublishableKey
} from "./chunk-G3VP5PJE.mjs";

// src/netlifyCacheHandler.ts
var CLERK_NETLIFY_CACHE_BUST_PARAM = "__clerk_netlify_cache_bust";
function handleNetlifyCacheInDevInstance({
  locationHeader,
  requestStateHeaders,
  publishableKey
}) {
  const isOnNetlify = process.env.NETLIFY || process.env.URL?.endsWith("netlify.app") || Boolean(process.env.NETLIFY_FUNCTIONS_TOKEN);
  const isDevelopmentInstance = isDevelopmentFromPublishableKey(publishableKey);
  if (isOnNetlify && isDevelopmentInstance) {
    const hasHandshakeQueryParam = locationHeader.includes("__clerk_handshake");
    if (!hasHandshakeQueryParam) {
      const url = new URL(locationHeader);
      url.searchParams.append(CLERK_NETLIFY_CACHE_BUST_PARAM, Date.now().toString());
      requestStateHeaders.set("Location", url.toString());
    }
  }
}

export {
  CLERK_NETLIFY_CACHE_BUST_PARAM,
  handleNetlifyCacheInDevInstance
};
//# sourceMappingURL=chunk-LASKZGWP.mjs.map