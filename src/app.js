import * as JSX from "react/jsx-runtime";
import { useLocation as el } from "react-router-dom";
import * as qc from "react";
import { metadata } from "./meta.js";
import { ClubProvider } from "./ui.js";
import { Header } from "./ui.js";
import { Routes as Co } from "react-router-dom";
import { Route as ul } from "react-router-dom";
import { Home } from "./pages.js";
import { Club } from "./pages.js";
import { Training } from "./pages.js";
import { TrainingDetail } from "./pages.js";
import { Trainers } from "./pages.js";
import { TrainerDetail } from "./pages.js";
import { Schedule } from "./schedule.js";
import { Plans } from "./pages.js";
import { BookingPage } from "./booking.js";
import { Account } from "./account.js";
import { Contacts } from "./pages.js";
import { Legal } from "./pages.js";
import { NotFound } from "./pages.js";
import { Footer } from "./ui.js";
var $ = JSX;
function NavigationEffects() {
  let e = el(),
    l = (0, qc.useRef)(!0);
  return (
    (0, qc.useEffect)(() => {
      let a = metadata(e.pathname);
      ((document.title = a.title),
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", a.description),
        document
          .querySelector('link[rel="canonical"]')
          ?.setAttribute("href", a.canonical),
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", a.title),
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", a.description),
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", a.canonical),
        document
          .querySelector('meta[name="robots"]')
          ?.setAttribute(
            "content",
            a.noindex ? "noindex,nofollow" : "index,follow",
          ),
        e.hash
          ? requestAnimationFrame(() =>
              document.getElementById(e.hash.slice(1))?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              }),
            )
          : l.current ||
            (window.scrollTo(0, 0),
            document.getElementById("main")?.focus({ preventScroll: !0 })),
        (l.current = !1));
    }, [e.pathname, e.hash]),
    (0, qc.useEffect)(() => {
      if (
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)
      )
        return;
      let a = new IntersectionObserver(
        (d) => {
          d.forEach((t) => {
            t.isIntersecting &&
              (t.target.classList.add("revealed"), a.unobserve(t.target));
          });
        },
        { threshold: 0.08 },
      );
      return (
        document.querySelectorAll("[data-reveal]").forEach((d) => {
          d.getBoundingClientRect().top > innerHeight &&
            (d.classList.add("will-reveal"), a.observe(d));
        }),
        () => a.disconnect()
      );
    }, [e.pathname]),
    null
  );
}
function App({ today: e, now: l }) {
  let a = el();
  return (0, $.jsxs)(ClubProvider, {
    today: e,
    now: l,
    children: [
      (0, $.jsx)(NavigationEffects, {}),
      (0, $.jsx)(Header, {}),
      (0, $.jsx)(
        "main",
        {
          id: "main",
          tabIndex: -1,
          className: "page-enter",
          children: (0, $.jsxs)(Co, {
            children: [
              (0, $.jsx)(ul, { path: "/", element: (0, $.jsx)(Home, {}) }),
              (0, $.jsx)(ul, { path: "/club", element: (0, $.jsx)(Club, {}) }),
              (0, $.jsx)(ul, {
                path: "/training",
                element: (0, $.jsx)(Training, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/training/:slug",
                element: (0, $.jsx)(TrainingDetail, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/trainers",
                element: (0, $.jsx)(Trainers, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/trainers/:slug",
                element: (0, $.jsx)(TrainerDetail, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/schedule",
                element: (0, $.jsx)(Schedule, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/plans",
                element: (0, $.jsx)(Plans, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/booking",
                element: (0, $.jsx)(BookingPage, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/account",
                element: (0, $.jsx)(Account, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/contacts",
                element: (0, $.jsx)(Contacts, {}),
              }),
              (0, $.jsx)(ul, {
                path: "/privacy",
                element: (0, $.jsx)(Legal, { privacy: !0 }),
              }),
              (0, $.jsx)(ul, {
                path: "/rules",
                element: (0, $.jsx)(Legal, {}),
              }),
              (0, $.jsx)(ul, { path: "*", element: (0, $.jsx)(NotFound, {}) }),
            ],
          }),
        },
        a.pathname + a.search,
      ),
      (0, $.jsx)(Footer, {}),
    ],
  });
}

export { $, NavigationEffects, App };
