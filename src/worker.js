import { metadata as Qn, publicPaths as cm } from "./meta.js";
import { config as fl, todayISO as Vb } from "./data.js";
import * as um from "react-dom/server";
import { StaticRouter as Po } from "react-router-dom";
import * as es from "react/jsx-runtime";
import { App as im } from "./app.js";
import { assets as nm } from "./assets.generated.js";
const vt = (e) =>
    e.replace(
      /[&<>"']/g,
      (l) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[l],
    ),
  uG = {
    async fetch(e) {
      let l = new URL(e.url),
        a = l.pathname,
        d = {
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        };
      if (!["GET", "HEAD"].includes(e.method))
        return new Response("Method not allowed", {
          status: 405,
          headers: { ...d, Allow: "GET, HEAD" },
        });
      if (a === "/robots.txt")
        return new Response(
          `User-agent: *
Allow: /
Disallow: /account
Disallow: /booking
Sitemap: ` +
            fl.url +
            `/sitemap.xml
`,
          { headers: { ...d, "Content-Type": "text/plain;charset=utf-8" } },
        );
      if (a === "/sitemap.xml")
        return new Response(
          '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
            cm.map((b) => "<url><loc>" + fl.url + b + "</loc></url>").join("") +
            "</urlset>",
          {
            headers: {
              ...d,
              "Content-Type": "application/xml;charset=utf-8",
              "Cache-Control": "public,max-age=3600",
            },
          },
        );
      let t = nm[a];
      if (t) {
        let b = {
          ...d,
          "Content-Type": t.type,
          "Cache-Control": a.startsWith("/assets/")
            ? "public,max-age=31536000,immutable"
            : "public,max-age=86400",
          ETag: '"BUILD_VERSION"',
        };
        return e.headers.get("If-None-Match") === b.ETag
          ? new Response(null, { status: 304, headers: b })
          : new Response(
              e.method === "HEAD"
                ? null
                : Uint8Array.from(atob(t.data), (m) => m.charCodeAt(0)),
              { headers: b },
            );
      }
      if (
        a.startsWith("/images/") ||
        a.startsWith("/assets/") ||
        /\.[a-z0-9]+$/i.test(a)
      )
        return new Response("Not found", { status: 404, headers: d });
      let c = Qn(a),
        i = new Date().toISOString(),
        n = { today: Vb(new Date(i)), now: i },
        u = crypto.randomUUID().replaceAll("-", ""),
        o = (0, um.renderToString)(
          (0, es.jsx)(Po, {
            location: a + l.search,
            children: (0, es.jsx)(im, { ...n }),
          }),
        ),
        r = JSON.stringify(n).replaceAll("<", "\\u003c"),
        M =
          '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="theme-color" content="#191715"/><title>' +
          vt(c.title) +
          '</title><meta name="description" content="' +
          vt(c.description) +
          '"/><meta name="robots" content="' +
          (c.noindex ? "noindex,nofollow" : "index,follow") +
          '"/><link rel="canonical" href="' +
          vt(c.canonical) +
          '"/><meta property="og:type" content="website"/><meta property="og:locale" content="ru_RU"/><meta property="og:site_name" content="LegacyLab Fitness"/><meta property="og:title" content="' +
          vt(c.title) +
          '"/><meta property="og:description" content="' +
          vt(c.description) +
          '"/><meta property="og:url" content="' +
          vt(c.canonical) +
          '"/><meta property="og:image" content="' +
          fl.url +
          '/og.png"/><meta name="twitter:card" content="summary_large_image"/><link rel="icon" type="image/svg+xml" href="/favicon.svg?v=BUILD_VERSION"/><link rel="stylesheet" href="/assets/app.css?v=BUILD_VERSION"/></head><body><div id="root">' +
          o +
          '</div><script nonce="' +
          u +
          '">window.__APP_ERRORS__=[];window.addEventListener("error",function(e){window.__APP_ERRORS__.push(e.message||"resource-error")},true);window.addEventListener("unhandledrejection",function(){window.__APP_ERRORS__.push("unhandledrejection")});window.__BOOT__=' +
          r +
          ';<\/script><script type="module" src="/assets/app.js?v=BUILD_VERSION"><\/script></body></html>';
      return new Response(e.method === "HEAD" ? null : M, {
        status: c.exists ? 200 : 404,
        headers: {
          ...d,
          "Content-Type": "text/html;charset=utf-8",
          "Cache-Control": "no-store",
          "Content-Security-Policy":
            "default-src 'self'; script-src 'self' 'nonce-" +
            u +
            "'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
          ...(c.noindex ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
        },
      });
    },
  };
export { uG as default };
