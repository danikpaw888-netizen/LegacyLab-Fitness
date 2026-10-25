import * as JSX from "react/jsx-runtime";
import * as Xl from "react";
import { emptyStore } from "./domain.js";
import { readStore } from "./domain.js";
import { config } from "./data.js";
import { writeStore } from "./domain.js";
import { Check as Ja } from "lucide-react";
import { X as sd } from "lucide-react";
import { Link as q } from "react-router-dom";
import { ArrowUpRight as he } from "lucide-react";
import { ArrowRight as Jc } from "lucide-react";
import { useLocation as el } from "react-router-dom";
import { NavLink as St } from "react-router-dom";
import { UserRound as Pa } from "lucide-react";
import { Menu as kc } from "lucide-react";
import { Yb } from "./data.js";
import { ChevronDown as vc } from "lucide-react";
var X = JSX,
  ClubContext = (0, Xl.createContext)(null),
  useClub = () => {
    let e = (0, Xl.useContext)(ClubContext);
    if (!e) throw new Error("Missing club context");
    return e;
  };
function ClubProvider({ children: e, today: l, now: a }) {
  let [d, t] = (0, Xl.useState)(emptyStore),
    [c, i] = (0, Xl.useState)(!1),
    [n, u] = (0, Xl.useState)("");
  ((0, Xl.useEffect)(() => {
    try {
      t(readStore(localStorage));
    } catch {
      u(
        "Не удалось прочитать сохранённые данные. Проверьте доступ к хранилищу браузера.",
      );
    }
    i(!0);
    let r = (M) => {
      if (M.key === config.storageKey)
        try {
          t(readStore(localStorage));
        } catch {
          u("Сохранённые данные недоступны. Обновите страницу.");
        }
    };
    return (
      window.addEventListener("storage", r),
      () => window.removeEventListener("storage", r)
    );
  }, []),
    (0, Xl.useEffect)(() => {
      if (!n) return;
      let r = setTimeout(() => u(""), 8e3);
      return () => clearTimeout(r);
    }, [n]));
  let o = (r) => {
    try {
      let M = r(readStore(localStorage));
      return (writeStore(localStorage, M), t(M), M);
    } catch (M) {
      throw M instanceof Error && M.message.includes("Quota")
        ? new Error(
            "В браузере нет места для сохранения. Освободите место и повторите.",
          )
        : M;
    }
  };
  return (0, X.jsxs)(ClubContext.Provider, {
    value: {
      store: d,
      ready: c,
      notice: n,
      update: o,
      notify: u,
      today: l,
      now: a,
    },
    children: [
      e,
      n &&
        (0, X.jsxs)("div", {
          className: "toast",
          role: "status",
          children: [
            (0, X.jsx)(Ja, { size: 18, "aria-hidden": "true" }),
            (0, X.jsx)("span", { children: n }),
            (0, X.jsx)("button", {
              className: "icon-button",
              "aria-label": "Закрыть уведомление",
              onClick: () => u(""),
              children: (0, X.jsx)(sd, { size: 18 }),
            }),
          ],
        }),
    ],
  });
}
function Mark() {
  return (0, X.jsx)("svg", {
    className: "brand-mark",
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": "true",
    children: (0, X.jsx)("path", {
      d: "M4 4v24h13M15 4v13h13M24 4v4",
      stroke: "currentColor",
      strokeWidth: "3.5",
    }),
  });
}
function Logo() {
  return (0, X.jsxs)(q, {
    className: "logo",
    to: "/",
    "aria-label": "LegacyLab Fitness — главная",
    children: [
      (0, X.jsx)(Mark, {}),
      (0, X.jsxs)("span", {
        children: [
          (0, X.jsx)("b", { children: "LegacyLab" }),
          (0, X.jsx)("small", { children: "FITNESS CLUB" }),
        ],
      }),
    ],
  });
}
function Button({
  to: e,
  children: l,
  secondary: a = !1,
  className: d = "",
  onClick: t,
}) {
  let c = "button " + (a ? "secondary " : "") + d;
  return e
    ? (0, X.jsxs)(q, {
        to: e,
        className: c,
        onClick: t,
        children: [l, (0, X.jsx)(he, { size: 19, "aria-hidden": "true" })],
      })
    : (0, X.jsxs)("button", {
        type: "button",
        className: c,
        onClick: t,
        children: [l, (0, X.jsx)(he, { size: 19, "aria-hidden": "true" })],
      });
}
function TextLink({ to: e, children: l }) {
  return (0, X.jsxs)(q, {
    to: e,
    className: "text-link",
    children: [l, (0, X.jsx)(Jc, { size: 18, "aria-hidden": "true" })],
  });
}
function DemoNote({ children: e }) {
  return (0, X.jsxs)("div", {
    className: "demo-note",
    children: [
      (0, X.jsx)("span", { className: "status-dot" }),
      (0, X.jsx)("p", {
        children:
          e ??
          "Демонстрация LegacyLab. Клуб, фотографии, профили и условия — пример концепции. Реальных бронирований и списаний нет.",
      }),
    ],
  });
}
function Dialog({
  open: e,
  onClose: l,
  title: a,
  children: d,
  className: t = "",
}) {
  let c = (0, Xl.useRef)(null);
  return (
    (0, Xl.useEffect)(() => {
      let i = c.current;
      if (i)
        if (e) {
          i.showModal();
          let n = document.body.style.overflow;
          return (
            (document.body.style.overflow = "hidden"),
            () => {
              (i.close(), (document.body.style.overflow = n));
            }
          );
        } else i.close();
    }, [e]),
    (0, X.jsx)("dialog", {
      ref: c,
      className: "dialog " + t,
      "aria-label": a,
      onCancel: l,
      onClick: (i) => {
        i.target === i.currentTarget && l();
      },
      children: (0, X.jsxs)("div", {
        className: "dialog-inner",
        children: [
          (0, X.jsxs)("div", {
            className: "dialog-top",
            children: [
              (0, X.jsx)("span", { children: a }),
              (0, X.jsx)("button", {
                className: "icon-button",
                onClick: l,
                "aria-label": "Закрыть",
                children: (0, X.jsx)(sd, {}),
              }),
            ],
          }),
          d,
        ],
      }),
    })
  );
}
var _o = [
  ["/club", "Клуб"],
  ["/training", "Тренировки"],
  ["/schedule", "Расписание"],
  ["/plans", "Тарифы"],
  ["/contacts", "Контакты"],
];
function Header() {
  let [e, l] = (0, Xl.useState)(!1),
    a = el();
  return (
    (0, Xl.useEffect)(() => {
      l(!1);
    }, [a.pathname, a.search]),
    (0, X.jsxs)(X.Fragment, {
      children: [
        (0, X.jsx)("a", {
          className: "skip-link",
          href: "#main",
          children: "Перейти к содержанию",
        }),
        (0, X.jsxs)("div", {
          className: "demo-bar",
          children: [
            (0, X.jsx)("span", { children: "DESIGNED FOR YOUR PROGRESS" }),
            (0, X.jsx)("span", {
              children: "Демонстрационный клуб · без реальных оплат",
            }),
          ],
        }),
        (0, X.jsx)("header", {
          className: "header",
          children: (0, X.jsxs)("div", {
            className: "shell header-inner",
            children: [
              (0, X.jsx)(Logo, {}),
              (0, X.jsx)("nav", {
                className: "desktop-nav",
                "aria-label": "Основная навигация",
                children: _o.map(([d, t]) =>
                  (0, X.jsx)(St, { to: d, children: t }, d),
                ),
              }),
              (0, X.jsxs)("div", {
                className: "header-actions",
                children: [
                  (0, X.jsx)(q, {
                    to: "/account",
                    className: "icon-button",
                    "aria-label": "Демонстрационный личный кабинет",
                    children: (0, X.jsx)(Pa, { size: 21 }),
                  }),
                  (0, X.jsx)(Button, {
                    to: "/booking",
                    className: "header-cta",
                    children: "Записаться на тренировку",
                  }),
                  (0, X.jsx)("button", {
                    className: "icon-button menu-toggle",
                    "aria-label": "Открыть меню",
                    "aria-expanded": e,
                    onClick: () => l(!0),
                    children: (0, X.jsx)(kc, {}),
                  }),
                ],
              }),
            ],
          }),
        }),
        (0, X.jsxs)(Dialog, {
          open: e,
          onClose: () => l(!1),
          title: "Меню LegacyLab",
          className: "mobile-menu",
          children: [
            (0, X.jsxs)("nav", {
              "aria-label": "Мобильная навигация",
              children: [
                _o.map(([d, t], c) =>
                  (0, X.jsxs)(
                    St,
                    {
                      to: d,
                      onClick: () => l(!1),
                      children: [
                        (0, X.jsxs)("small", { children: ["0", c + 1] }),
                        t,
                        (0, X.jsx)(he, { size: 22 }),
                      ],
                    },
                    d,
                  ),
                ),
                (0, X.jsxs)(St, {
                  to: "/trainers",
                  onClick: () => l(!1),
                  children: [
                    (0, X.jsx)("small", { children: "06" }),
                    "Тренеры",
                    (0, X.jsx)(he, { size: 22 }),
                  ],
                }),
              ],
            }),
            (0, X.jsx)(Button, {
              to: "/booking",
              onClick: () => l(!1),
              children: "Записаться на тренировку",
            }),
            (0, X.jsxs)("p", {
              className: "muted",
              children: [
                "Каждый день · 07:00–23:00",
                (0, X.jsx)("br", {}),
                "Концепция фитнес-клуба LegacyLab.",
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function Footer() {
  return (0, X.jsx)("footer", {
    className: "footer",
    children: (0, X.jsxs)("div", {
      className: "shell",
      children: [
        (0, X.jsxs)("div", {
          className: "footer-top",
          children: [
            (0, X.jsx)(Logo, {}),
            (0, X.jsxs)("p", {
              children: [
                "Сила — это то, что ты",
                (0, X.jsx)("br", {}),
                "создаёшь каждый день.",
              ],
            }),
            (0, X.jsx)(Button, {
              to: "/booking",
              secondary: !0,
              children: "Начать свой путь",
            }),
          ],
        }),
        (0, X.jsxs)("div", {
          className: "footer-grid",
          children: [
            (0, X.jsxs)("div", {
              children: [
                (0, X.jsx)("span", {
                  className: "eyebrow",
                  children: "THE NEXT VERSION OF YOU",
                }),
                (0, X.jsxs)("p", {
                  className: "muted",
                  children: [
                    "Пространство для тренировок,",
                    (0, X.jsx)("br", {}),
                    "восстановления и движения вперёд.",
                  ],
                }),
              ],
            }),
            (0, X.jsx)("nav", {
              "aria-label": "Разделы в подвале",
              children: _o
                .slice(0, 4)
                .map(([e, l]) => (0, X.jsx)(q, { to: e, children: l }, e)),
            }),
            (0, X.jsxs)("nav", {
              "aria-label": "Информация",
              children: [
                (0, X.jsx)(q, { to: "/trainers", children: "Тренеры" }),
                (0, X.jsx)(q, { to: "/contacts", children: "Контакты" }),
                (0, X.jsx)(q, {
                  to: "/club#faq",
                  children: "Вопросы и ответы",
                }),
                (0, X.jsx)(q, { to: "/account", children: "Демо-кабинет" }),
              ],
            }),
            (0, X.jsxs)("nav", {
              "aria-label": "Документы",
              children: [
                (0, X.jsx)(q, {
                  to: "/privacy",
                  children: "Конфиденциальность",
                }),
                (0, X.jsx)(q, { to: "/rules", children: "Правила посещения" }),
                (0, X.jsx)(q, {
                  to: "/rules#demo",
                  children: "О демонстрации",
                }),
              ],
            }),
          ],
        }),
        (0, X.jsxs)("div", {
          className: "footer-bottom",
          children: [
            (0, X.jsxs)("span", {
              children: [
                "© ",
                new Date().getFullYear(),
                " LegacyLab Fitness · Концептуальный проект",
              ],
            }),
            (0, X.jsx)("span", { children: "Дизайн и разработка · LegacyLab" }),
          ],
        }),
        (0, X.jsx)("p", {
          className: "disclaimer",
          children:
            "Все фотографии созданы с помощью ИИ. Имена, опыт тренеров, отзывы, адрес, тарифы и расписание демонстрационные. Данные записей сохраняются только в вашем браузере.",
        }),
      ],
    }),
  });
}
function SectionHead({ num: e, kicker: l, title: a, children: d, action: t }) {
  return (0, X.jsxs)("div", {
    className: "section-head",
    "data-reveal": !0,
    children: [
      (0, X.jsxs)("div", {
        children: [
          (0, X.jsxs)("div", {
            className: "eyebrow",
            children: [
              (0, X.jsx)("span", { className: "accent", children: e }),
              " / ",
              l,
            ],
          }),
          (0, X.jsx)("h2", { children: a }),
          d &&
            (0, X.jsx)("p", { className: "section-description", children: d }),
        ],
      }),
      t,
    ],
  });
}
function PageIntro({ kicker: e, title: l, children: a }) {
  return (0, X.jsxs)("div", {
    className: "page-intro shell",
    children: [
      (0, X.jsxs)("div", {
        className: "eyebrow",
        children: ["LEGACYLAB / ", e],
      }),
      (0, X.jsx)("h1", { children: l }),
      a && (0, X.jsx)("p", { className: "intro-copy", children: a }),
    ],
  });
}
function Image({ name: e, alt: l, className: a = "", priority: d = !1 }) {
  return (0, X.jsxs)("picture", {
    className: "picture " + a,
    children: [
      (0, X.jsx)("source", {
        media: "(max-width: 600px)",
        srcSet: "/images/" + e + "-sm.webp",
      }),
      (0, X.jsx)("img", {
        src: "/images/" + e + ".webp",
        width: e.startsWith("trainer") ? 628 : 1200,
        height: e.startsWith("trainer") ? 628 : 800,
        alt: l,
        loading: d ? "eager" : "lazy",
        fetchPriority: d ? "high" : "auto",
        decoding: "async",
      }),
    ],
  });
}
function FAQ() {
  return (0, X.jsxs)("section", {
    className: "section shell faq-section",
    id: "faq",
    children: [
      (0, X.jsx)(SectionHead, {
        num: "09",
        kicker: "ЕСТЬ ВОПРОС",
        title: (0, X.jsxs)(X.Fragment, {
          children: ["До первой", (0, X.jsx)("br", {}), "тренировки."],
        }),
        children: "Всё, что поможет начать спокойно.",
      }),
      (0, X.jsx)("div", {
        className: "faq-list",
        children: Yb.map(([e, l], a) =>
          (0, X.jsxs)(
            "details",
            {
              "data-reveal": !0,
              children: [
                (0, X.jsxs)("summary", {
                  children: [
                    (0, X.jsxs)("span", {
                      className: "faq-index",
                      children: ["0", a + 1],
                    }),
                    (0, X.jsx)("span", { children: e }),
                    (0, X.jsx)(vc, { size: 20, "aria-hidden": "true" }),
                  ],
                }),
                (0, X.jsx)("div", { className: "faq-answer", children: l }),
              ],
            },
            e,
          ),
        ),
      }),
    ],
  });
}
function FinalCTA() {
  return (0, X.jsx)("section", {
    className: "final-cta",
    children: (0, X.jsxs)("div", {
      className: "shell",
      children: [
        (0, X.jsx)("div", {
          className: "eyebrow",
          children: "YOUR NEXT CHAPTER",
        }),
        (0, X.jsxs)("h2", {
          children: [
            "Не жди понедельника.",
            (0, X.jsx)("br", {}),
            "Начни с себя.",
          ],
        }),
        (0, X.jsxs)("div", {
          className: "cta-row",
          children: [
            (0, X.jsxs)("p", {
              children: [
                "Одна тренировка — хороший",
                (0, X.jsx)("br", {}),
                "первый шаг к новой привычке.",
              ],
            }),
            (0, X.jsx)(Button, {
              to: "/booking",
              children: "Записаться на пробную",
            }),
          ],
        }),
        (0, X.jsx)("span", {
          className: "cta-watermark",
          "aria-hidden": "true",
          children: "LL",
        }),
      ],
    }),
  });
}
function Empty({
  title: e,
  text: l,
  to: a = "/schedule",
  button: d = "К расписанию",
}) {
  return (0, X.jsxs)("div", {
    className: "empty",
    children: [
      (0, X.jsx)("span", { className: "eyebrow", children: "A NEW START" }),
      (0, X.jsx)("h3", { children: e }),
      (0, X.jsx)("p", { children: l }),
      (0, X.jsx)(Button, { to: a, children: d }),
    ],
  });
}

export {
  X,
  ClubContext,
  useClub,
  ClubProvider,
  Mark,
  Logo,
  Button,
  TextLink,
  DemoNote,
  Dialog,
  _o,
  Header,
  Footer,
  SectionHead,
  PageIntro,
  Image,
  FAQ,
  FinalCTA,
  Empty,
};
