import * as React from "react";
import * as JSX from "react/jsx-runtime";
import { useClub } from "./ui.js";
import { startsAt } from "./domain.js";
import { plans } from "./data.js";
import { cancelBooking } from "./domain.js";
import { PageIntro } from "./ui.js";
import { DemoNote } from "./ui.js";
import { CalendarDays as Mt } from "lucide-react";
import { Link as q } from "react-router-dom";
import { ArrowUpRight as he } from "lucide-react";
import { UserRound as Pa } from "lucide-react";
import { money } from "./data.js";
import { dateLabel } from "./data.js";
import { directions } from "./data.js";
import { Clock3 as va } from "lucide-react";
import { trainers } from "./data.js";
import { Empty } from "./ui.js";
import { Check as Ja } from "lucide-react";
import { Trash as Hd } from "lucide-react";
import { Dialog } from "./ui.js";
import { Button } from "./ui.js";
import { emptyStore } from "./domain.js";
var Yd = React;
var I = JSX;
function Account() {
  let { store: e, update: l, ready: a, notify: d } = useClub(),
    [t, c] = (0, Yd.useState)("upcoming"),
    [i, n] = (0, Yd.useState)(e.profile),
    [u, o] = (0, Yd.useState)(""),
    [r, M] = (0, Yd.useState)(!1),
    [b, m] = (0, Yd.useState)(!1);
  (0, Yd.useEffect)(() => {
    n(e.profile);
  }, [e.profile]);
  let N = Date.now(),
    D = e.bookings
      .filter((W) => W.status === "confirmed" && startsAt(W.date, W.time) > N)
      .sort((W, A) => startsAt(W.date, W.time) - startsAt(A.date, A.time)),
    w = e.bookings.filter(
      (W) => W.status === "cancelled" || startsAt(W.date, W.time) <= N,
    ),
    T = plans.find((W) => W.id === e.planId),
    p = (W) => {
      try {
        (l((A) => cancelBooking(A, W.id)),
          d(
            "Демонстрационная запись отменена. Место снова доступно в этом браузере.",
          ));
      } catch (A) {
        o(
          A instanceof Error
            ? A.message
            : "Не удалось сохранить изменение. Повторите попытку.",
        );
      }
    },
    U = (W) => {
      if (
        (W.preventDefault(),
        o(""),
        i.name.trim().length < 2 || i.name.length > 80)
      ) {
        o("Укажите имя от 2 до 80 символов.");
        return;
      }
      if (i.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)) {
        o("Проверьте адрес email.");
        return;
      }
      let A = i.phone.replace(/\D/g, "");
      if (i.phone && (A.length < 10 || A.length > 15)) {
        o("Проверьте телефон: от 10 до 15 цифр.");
        return;
      }
      try {
        (l((G) => ({
          ...G,
          profile: {
            name: i.name.trim(),
            email: i.email.trim(),
            phone: i.phone.trim(),
          },
        })),
          m(!0),
          d("Профиль сохранён в этом браузере."));
      } catch {
        o(
          "Не удалось сохранить профиль. Проверьте доступ к хранилищу браузера и повторите.",
        );
      }
    };
  return (0, I.jsxs)(I.Fragment, {
    children: [
      (0, I.jsx)(PageIntro, {
        kicker: "ДЕМО-КАБИНЕТ",
        title: (0, I.jsxs)(I.Fragment, {
          children: ["Твой прогресс.", (0, I.jsx)("br", {}), "Твой ритм."],
        }),
        children: e.profile.name
          ? "Привет, " +
            e.profile.name +
            ". Здесь твои выбранный формат и демонстрационные записи."
          : "Всё для следующего шага: выбранный формат, записи и личные данные.",
      }),
      (0, I.jsxs)("section", {
        className: "shell section-tight account-page",
        children: [
          (0, I.jsx)(DemoNote, {
            children:
              "Это демо-кабинет без авторизации. Данные хранятся только в этом браузере и доступны всем, кто использует тот же профиль браузера. Реальный абонемент не активируется.",
          }),
          a
            ? (0, I.jsxs)(I.Fragment, {
                children: [
                  (0, I.jsxs)("div", {
                    className: "account-overview",
                    children: [
                      (0, I.jsxs)("div", {
                        className: "membership-card",
                        children: [
                          (0, I.jsxs)("div", {
                            className: "card-meta",
                            children: [
                              (0, I.jsx)("span", {
                                children: "LEGACYLAB / DEMO MEMBER",
                              }),
                              (0, I.jsx)("span", { className: "status-dot" }),
                            ],
                          }),
                          (0, I.jsx)("h2", { children: T.name }),
                          (0, I.jsx)("p", { children: T.label }),
                          (0, I.jsxs)("div", {
                            className: "membership-bottom",
                            children: [
                              (0, I.jsx)("span", { children: T.period }),
                              (0, I.jsx)("span", {
                                children: "Выбран · не оплачен",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, I.jsxs)("div", {
                        className: "account-stat",
                        children: [
                          (0, I.jsx)(Mt, { size: 27 }),
                          (0, I.jsx)("strong", { children: D.length }),
                          (0, I.jsx)("span", { children: "Ближайших записей" }),
                          (0, I.jsxs)(q, {
                            to: "/schedule",
                            children: [
                              "Выбрать занятие",
                              (0, I.jsx)(he, { size: 17 }),
                            ],
                          }),
                        ],
                      }),
                      (0, I.jsxs)("div", {
                        className: "account-stat",
                        children: [
                          (0, I.jsx)(Pa, { size: 27 }),
                          (0, I.jsx)("strong", { children: money(T.price) }),
                          (0, I.jsx)("span", {
                            children: "Демонстрационная стоимость",
                          }),
                          (0, I.jsxs)(q, {
                            to: "/plans",
                            children: [
                              "Изменить формат",
                              (0, I.jsx)(he, { size: 17 }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, I.jsx)("div", {
                    className: "account-tabs",
                    role: "group",
                    "aria-label": "Разделы кабинета",
                    children: [
                      ["upcoming", "Мои записи"],
                      ["history", "История"],
                      ["profile", "Личные данные"],
                    ].map(([W, A]) =>
                      (0, I.jsx)(
                        "button",
                        {
                          onClick: () => {
                            (c(W), o(""));
                          },
                          "aria-pressed": t === W,
                          className: t === W ? "selected" : "",
                          children: A,
                        },
                        W,
                      ),
                    ),
                  }),
                  u &&
                    (0, I.jsx)("p", {
                      className: "form-error",
                      role: "alert",
                      children: u,
                    }),
                  t !== "profile"
                    ? (0, I.jsx)("div", {
                        className: "account-bookings",
                        children: (t === "upcoming" ? D : w).length
                          ? (t === "upcoming" ? D : w).map((W) =>
                              (0, I.jsxs)(
                                "article",
                                {
                                  className: "account-booking",
                                  children: [
                                    (0, I.jsxs)("div", {
                                      className: "booking-date",
                                      children: [
                                        (0, I.jsx)("strong", {
                                          children: dateLabel(W.date, {
                                            day: "numeric",
                                          }),
                                        }),
                                        (0, I.jsx)("span", {
                                          children: dateLabel(W.date, {
                                            month: "short",
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, I.jsxs)("div", {
                                      children: [
                                        (0, I.jsx)("span", {
                                          className: "eyebrow",
                                          children:
                                            W.status === "cancelled"
                                              ? "ОТМЕНЕНА"
                                              : t === "history"
                                                ? "ВРЕМЯ ЗАНЯТИЯ ПРОШЛО"
                                                : "СОХРАНЕНО В ЭТОМ БРАУЗЕРЕ",
                                        }),
                                        (0, I.jsx)("h3", {
                                          children: directions.find(
                                            (A) => A.id === W.direction,
                                          )?.name,
                                        }),
                                        (0, I.jsxs)("p", {
                                          children: [
                                            (0, I.jsx)(va, { size: 14 }),
                                            " ",
                                            W.time,
                                            " · UTC+5 ",
                                            W.trainer &&
                                              " · " +
                                                trainers.find(
                                                  (A) => A.id === W.trainer,
                                                )?.name,
                                          ],
                                        }),
                                        (0, I.jsxs)("small", {
                                          children: [
                                            "DEMO / ",
                                            W.id.slice(0, 8).toUpperCase(),
                                            " · ",
                                            plans.find((A) => A.id === W.planId)
                                              ?.label,
                                          ],
                                        }),
                                      ],
                                    }),
                                    t === "upcoming" &&
                                      (0, I.jsx)("button", {
                                        className: "button secondary small",
                                        onClick: () => p(W),
                                        children: "Отменить запись",
                                      }),
                                  ],
                                },
                                W.id,
                              ),
                            )
                          : (0, I.jsx)(Empty, {
                              title:
                                t === "upcoming"
                                  ? "Твоя следующая тренировка впереди."
                                  : "История начнётся с первого шага.",
                              text:
                                t === "upcoming"
                                  ? "Выбери занятие в расписании или познакомься с клубом на пробной тренировке."
                                  : "Здесь появятся отменённые записи и занятия, время которых уже прошло.",
                            }),
                      })
                    : (0, I.jsxs)("form", {
                        className: "profile-form",
                        onSubmit: U,
                        noValidate: !0,
                        children: [
                          (0, I.jsx)("h2", { children: "Личные данные" }),
                          (0, I.jsx)("p", {
                            className: "muted",
                            children:
                              "Изменения сохраняются только в этом браузере. Это не защищённый серверный аккаунт.",
                          }),
                          (0, I.jsxs)("div", {
                            className: "form-grid",
                            children: [
                              (0, I.jsxs)("label", {
                                className: "full",
                                children: [
                                  "Имя",
                                  (0, I.jsx)("input", {
                                    value: i.name,
                                    name: "profile-name",
                                    autoComplete: "given-name",
                                    maxLength: 80,
                                    onChange: (W) => {
                                      (n((A) => ({
                                        ...A,
                                        name: W.target.value,
                                      })),
                                        m(!1));
                                    },
                                  }),
                                ],
                              }),
                              (0, I.jsxs)("label", {
                                children: [
                                  "Email",
                                  (0, I.jsx)("input", {
                                    type: "email",
                                    name: "profile-email",
                                    autoComplete: "email",
                                    value: i.email,
                                    maxLength: 160,
                                    onChange: (W) => {
                                      (n((A) => ({
                                        ...A,
                                        email: W.target.value,
                                      })),
                                        m(!1));
                                    },
                                  }),
                                ],
                              }),
                              (0, I.jsxs)("label", {
                                children: [
                                  "Телефон",
                                  (0, I.jsx)("input", {
                                    type: "tel",
                                    name: "profile-phone",
                                    autoComplete: "tel",
                                    value: i.phone,
                                    maxLength: 30,
                                    onChange: (W) => {
                                      (n((A) => ({
                                        ...A,
                                        phone: W.target.value,
                                      })),
                                        m(!1));
                                    },
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, I.jsx)("button", {
                            className: "button",
                            type: "submit",
                            children: b
                              ? (0, I.jsxs)(I.Fragment, {
                                  children: [
                                    (0, I.jsx)(Ja, { size: 18 }),
                                    "Сохранено",
                                  ],
                                })
                              : (0, I.jsxs)(I.Fragment, {
                                  children: [
                                    "Сохранить данные",
                                    (0, I.jsx)(he, { size: 18 }),
                                  ],
                                }),
                          }),
                        ],
                      }),
                  (0, I.jsxs)("div", {
                    className: "account-data-note",
                    children: [
                      (0, I.jsxs)("div", {
                        children: [
                          (0, I.jsx)("strong", {
                            children: "Только в этом браузере",
                          }),
                          (0, I.jsx)("p", {
                            children:
                              "Очистка данных сайта удалит профиль и записи. Между устройствами они не переносятся. Не сохраняйте настоящие данные на общем компьютере.",
                          }),
                        ],
                      }),
                      (0, I.jsxs)("button", {
                        className: "text-link",
                        onClick: () => M(!0),
                        children: [
                          (0, I.jsx)(Hd, { size: 16 }),
                          "Удалить демо-данные",
                        ],
                      }),
                    ],
                  }),
                ],
              })
            : (0, I.jsx)("div", {
                className: "skeleton",
                role: "status",
                children: "Загружаем сохранённые данные…",
              }),
        ],
      }),
      (0, I.jsxs)(Dialog, {
        open: r,
        onClose: () => M(!1),
        title: "Удаление демо-данных",
        children: [
          (0, I.jsx)("h2", { children: "Начать заново?" }),
          (0, I.jsx)("p", {
            children:
              "Профиль, выбранный тариф и история записей в этом браузере будут удалены. Серверной копии нет.",
          }),
          (0, I.jsxs)("div", {
            className: "dialog-actions",
            children: [
              (0, I.jsx)(Button, {
                secondary: !0,
                onClick: () => M(!1),
                children: "Оставить данные",
              }),
              (0, I.jsx)(Button, {
                onClick: () => {
                  try {
                    (l(() => emptyStore()),
                      M(!1),
                      c("upcoming"),
                      d("Демонстрационные данные удалены."));
                  } catch {
                    (o(
                      "Не удалось удалить данные. Очистите данные сайта в настройках браузера.",
                    ),
                      M(!1));
                  }
                },
                children: "Удалить данные",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export { Yd, I, Account };
