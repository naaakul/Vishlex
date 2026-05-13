"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  buildEventPayload: () => buildEventPayload,
  buildPageviewPayload: () => buildPageviewPayload,
  getBrowser: () => getBrowser,
  getDevice: () => getDevice,
  getOS: () => getOS,
  getReferrer: () => getReferrer,
  getSessionHash: () => getSessionHash,
  getUTMParams: () => getUTMParams,
  getVisitorHash: () => getVisitorHash,
  send: () => send
});
module.exports = __toCommonJS(src_exports);

// src/lib/fingerprint.ts
var _visitorHash = null;
var _sessionHash = null;
function getVisitorHash() {
  if (_visitorHash) return _visitorHash;
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    (/* @__PURE__ */ new Date()).getTimezoneOffset(),
    navigator.hardwareConcurrency ?? ""
  ].join("|");
  _visitorHash = hashString(raw);
  return _visitorHash;
}
function getSessionHash() {
  if (_sessionHash) return _sessionHash;
  const STORAGE_KEY = "vsh_session";
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      _sessionHash = stored;
      return _sessionHash;
    }
  } catch {
  }
  const bucket = Math.floor(Date.now() / (1e3 * 60 * 30));
  _sessionHash = hashString(getVisitorHash() + "|" + bucket);
  try {
    sessionStorage.setItem(STORAGE_KEY, _sessionHash);
  } catch {
  }
  return _sessionHash;
}
function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = hash * 16777619 >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

// src/lib/device.ts
function getDevice() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "mobile";
  return "desktop";
}
function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/")) return "Safari";
  return "Other";
}
function getOS() {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

// src/lib/utm.ts
function getUTMParams(search = location.search) {
  const p = new URLSearchParams(search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_term: p.get("utm_term"),
    utm_content: p.get("utm_content")
  };
}
function getReferrer() {
  const ref = document.referrer;
  if (!ref) return null;
  try {
    const refHost = new URL(ref).hostname;
    if (refHost === location.hostname) return null;
  } catch {
    return null;
  }
  return ref;
}

// src/lib/sender.ts
function send(payload, endpoint) {
  const body = JSON.stringify(payload);
  if (typeof navigator === "undefined") return;
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon(endpoint, blob);
    if (queued) return;
  }
  fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true
  }).catch(() => {
  });
}

// src/lib/payload.ts
function buildPageviewPayload(trackingId, durationMs = null) {
  const utm = getUTMParams();
  return {
    type: "pageview",
    tracking_id: trackingId,
    url: location.pathname + location.search,
    referrer: getReferrer(),
    ...utm,
    device: getDevice(),
    browser: getBrowser(),
    os: getOS(),
    visitor_hash: getVisitorHash(),
    session_hash: getSessionHash(),
    duration_ms: durationMs
  };
}
function buildEventPayload(trackingId, name, properties = null) {
  return {
    type: "event",
    tracking_id: trackingId,
    name,
    properties,
    url: location.pathname + location.search,
    visitor_hash: getVisitorHash(),
    session_hash: getSessionHash()
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildEventPayload,
  buildPageviewPayload,
  getBrowser,
  getDevice,
  getOS,
  getReferrer,
  getSessionHash,
  getUTMParams,
  getVisitorHash,
  send
});
