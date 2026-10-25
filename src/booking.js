import * as React from "react";
import * as JSX from "react/jsx-runtime";
import { useClub } from "./ui.js";
import { useSearchParams as Qc } from "react-router-dom";
import { getSchedule } from "./data.js";
import { trainers } from "./data.js";
import { directions } from "./data.js";
import { addDays } from "./data.js";
import { plans } from "./data.js";
import { validateDraft } from "./domain.js";
import { confirmBooking } from "./domain.js";
import { PageIntro } from "./ui.js";
import { CircleCheck as Td } from "lucide-react";
import { dateLabel } from "./data.js";
import { Button } from "./ui.js";
import { ArrowUpRight as he } from "lucide-react";
import { Image } from "./ui.js";
import { TextLink } from "./ui.js";
import { DemoNote } from "./ui.js";
import { CalendarDays as Mt } from "lucide-react";
import { Link as q } from "react-router-dom";
import { times } from "./domain.js";
import { money } from "./data.js";
import { Check as Ja } from "lucide-react";
import { Clock3 as va } from "lucide-react";
import { ArrowLeft as Cc } from "lucide-react";
var _l = React;
var h = JSX;
function BookingPage() {
  let { today: e, store: l, update: a, ready: d } = useClub(),
    [t] = Qc(),
    c = t.get("session"),
    i = getSchedule(e).find((x) => x.id === c),
    n = trainers.find((x) => x.id === t.get("trainer")),
    u =
      i?.direction ??
      directions.find((x) => x.id === t.get("direction"))?.id ??
      n?.directions[0] ??
      "personal",
    [o, r] = (0, _l.useState)({
      name: "",
      email: "",
      phone: "",
      direction: u,
      date: i?.date ?? addDays(e, 1),
      time: i?.time ?? "",
      comment: "",
      consent: !1,
      trainer: i?.trainer ?? n?.id ?? "",
    }),
    [M, b] = (0, _l.useState)(
      plans.find((x) => x.id === t.get("plan"))?.id ?? l.planId,
    ),
    [m, N] = (0, _l.useState)({}),
    [D, w] = (0, _l.useState)(""),
    [T, p] = (0, _l.useState)(!1),
    [U, W] = (0, _l.useState)(null),
    A = (0, _l.useRef)(!1),
    G = (0, _l.useRef)(!1),
    Y = (0, _l.useRef)(""),
    B = (0, _l.useRef)(null);
  (0, _l.useEffect)(() => {
    d &&
      !A.current &&
      (r((x) => ({ ...x, ...l.profile })), t.get("plan") || b(l.planId));
  }, [d, l.profile, l.planId, t]);
  let V = (x, re) => {
      ((A.current = !0),
        r((E) => ({
          ...E,
          [x]: re,
          ...(x === "direction" ? { trainer: "" } : {}),
        })),
        N((E) => {
          let F = { ...E };
          return (delete F[x], F);
        }));
    },
    S = (x) => {
      requestAnimationFrame(() =>
        B.current?.querySelector('[name="' + x + '"]')?.focus(),
      );
    },
    g = async (x) => {
      if ((x.preventDefault(), G.current)) return;
      w("");
      let re = validateDraft(o, e);
      if (c && !i) {
        w(
          "Это занятие больше не входит в текущую неделю. Выберите новое в расписании.",
        );
        return;
      }
      if (Object.keys(re).length) {
        (N(re), S(Object.keys(re)[0]));
        return;
      }
      ((G.current = !0), p(!0), Y.current || (Y.current = crypto.randomUUID()));
      try {
        await new Promise((F) => setTimeout(F, 450));
        let E;
        if (
          (a((F) => {
            let He = confirmBooking(F, o, {
              id: Y.current,
              today: e,
              now: Date.now(),
              session: i,
              planId: M,
            });
            return ((E = He.booking), He.store);
          }),
          !E)
        )
          throw new Error("Не удалось сохранить запись.");
        (W(E),
          requestAnimationFrame(() =>
            document.getElementById("booking-success")?.focus(),
          ));
      } catch (E) {
        w(
          E instanceof Error &&
            /занят|Выберите|Параметры|доступна|браузере|места/.test(E.message)
            ? E.message
            : "Не удалось сохранить запись в браузере. Проверьте разрешение на хранение данных и повторите. Введённые поля сохранены.",
        );
      } finally {
        ((G.current = !1), p(!1));
      }
    },
    J = (x) => ({
      "aria-invalid": !!m[x],
      "aria-describedby": m[x] ? x + "-error" : void 0,
    }),
    Q = (x) =>
      m[x] &&
      (0, h.jsx)("span", {
        className: "field-error",
        id: x + "-error",
        children: m[x],
      }),
    P = plans.find((x) => x.id === M);
  return U
    ? (0, h.jsxs)(h.Fragment, {
        children: [
          (0, h.jsx)(PageIntro, {
            kicker: "ЗАПИСЬ СОХРАНЕНА",
            title: (0, h.jsxs)(h.Fragment, {
              children: ["Первый шаг", (0, h.jsx)("br", {}), "уже сделан."],
            }),
            children:
              "Это демонстрационная запись. Она сохранена только в этом браузере и не отправлена администратору клуба.",
          }),
          (0, h.jsxs)("section", {
            className: "shell section-tight success-layout",
            children: [
              (0, h.jsxs)("div", {
                id: "booking-success",
                className: "success-card",
                tabIndex: -1,
                children: [
                  (0, h.jsx)("span", {
                    className: "success-icon",
                    children: (0, h.jsx)(Td, { size: 40 }),
                  }),
                  (0, h.jsxs)("span", {
                    className: "eyebrow",
                    children: ["DEMO / ", U.id.slice(0, 8).toUpperCase()],
                  }),
                  (0, h.jsxs)("h2", {
                    children: [
                      U.name,
                      ",",
                      (0, h.jsx)("br", {}),
                      "твой следующий шаг.",
                    ],
                  }),
                  (0, h.jsxs)("dl", {
                    className: "booking-summary",
                    children: [
                      (0, h.jsxs)("div", {
                        children: [
                          (0, h.jsx)("dt", { children: "Направление" }),
                          (0, h.jsx)("dd", {
                            children: directions.find(
                              (x) => x.id === U.direction,
                            )?.name,
                          }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        children: [
                          (0, h.jsx)("dt", { children: "Когда · UTC+5" }),
                          (0, h.jsxs)("dd", {
                            children: [dateLabel(U.date), " · ", U.time],
                          }),
                        ],
                      }),
                      U.trainer &&
                        (0, h.jsxs)("div", {
                          children: [
                            (0, h.jsx)("dt", { children: "Демо-тренер" }),
                            (0, h.jsx)("dd", {
                              children: trainers.find((x) => x.id === U.trainer)
                                ?.name,
                            }),
                          ],
                        }),
                      (0, h.jsxs)("div", {
                        children: [
                          (0, h.jsx)("dt", { children: "Выбранный формат" }),
                          (0, h.jsxs)("dd", {
                            children: [
                              plans.find((x) => x.id === U.planId)?.name,
                              " · без оплаты",
                            ],
                          }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        children: [
                          (0, h.jsx)("dt", { children: "Контактные данные" }),
                          (0, h.jsxs)("dd", {
                            children: [U.email, (0, h.jsx)("br", {}), U.phone],
                          }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        children: [
                          (0, h.jsx)("dt", { children: "Статус" }),
                          (0, h.jsx)("dd", {
                            children: "Сохранено в демо-кабинете",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, h.jsx)(Button, {
                    to: "/account",
                    children: "Открыть мою запись",
                  }),
                  (0, h.jsxs)("button", {
                    className: "text-link",
                    type: "button",
                    onClick: () => window.print(),
                    children: [
                      "Сохранить или распечатать",
                      (0, h.jsx)(he, { size: 17 }),
                    ],
                  }),
                ],
              }),
              (0, h.jsxs)("div", {
                className: "success-aside",
                children: [
                  (0, h.jsx)(Image, {
                    name: "lounge",
                    alt: "Визуализация зоны отдыха",
                  }),
                  (0, h.jsx)("h3", {
                    children: "Всё начинается с регулярности.",
                  }),
                  (0, h.jsx)("p", {
                    children:
                      "Запись можно посмотреть и отменить в демо-кабинете. Данные не синхронизируются с другими устройствами.",
                  }),
                  (0, h.jsx)(TextLink, {
                    to: "/rules",
                    children: "Как устроена демонстрация",
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : (0, h.jsxs)(h.Fragment, {
        children: [
          (0, h.jsx)(PageIntro, {
            kicker: "ЗАПИСЬ",
            title: (0, h.jsxs)(h.Fragment, {
              children: ["Оставь время", (0, h.jsx)("br", {}), "для себя."],
            }),
            children:
              "Выбери направление и удобное время. Попробуй полный сценарий записи без реального бронирования и оплаты.",
          }),
          (0, h.jsxs)("section", {
            className: "shell section-tight booking-layout",
            children: [
              (0, h.jsxs)("div", {
                children: [
                  (0, h.jsx)(DemoNote, {
                    children:
                      "Демо-режим. Форма сохранит данные только в этом браузере. Письмо или сообщение сотруднику клуба не отправляется. Можно использовать вымышленные контактные данные.",
                  }),
                  (0, h.jsxs)("form", {
                    ref: B,
                    onSubmit: g,
                    noValidate: !0,
                    className: "booking-form",
                    "aria-busy": T,
                    children: [
                      (0, h.jsxs)("div", {
                        className: "form-section-title",
                        children: [
                          (0, h.jsx)("span", { children: "01" }),
                          (0, h.jsx)("h2", { children: "Познакомимся" }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        className: "form-grid",
                        children: [
                          (0, h.jsxs)("label", {
                            className: "full",
                            children: [
                              "Имя",
                              (0, h.jsx)("input", {
                                name: "name",
                                autoComplete: "given-name",
                                maxLength: 80,
                                placeholder: "Как к вам обращаться",
                                value: o.name,
                                onChange: (x) => V("name", x.target.value),
                                ...J("name"),
                              }),
                              Q("name"),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            children: [
                              "Телефон",
                              (0, h.jsx)("input", {
                                name: "phone",
                                type: "tel",
                                inputMode: "tel",
                                autoComplete: "tel",
                                maxLength: 30,
                                placeholder: "+7 000 000-00-00",
                                value: o.phone,
                                onChange: (x) => V("phone", x.target.value),
                                ...J("phone"),
                              }),
                              Q("phone"),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            children: [
                              "Email",
                              (0, h.jsx)("input", {
                                name: "email",
                                type: "email",
                                inputMode: "email",
                                autoComplete: "email",
                                maxLength: 160,
                                placeholder: "you@example.com",
                                value: o.email,
                                onChange: (x) => V("email", x.target.value),
                                ...J("email"),
                              }),
                              Q("email"),
                            ],
                          }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        className: "form-section-title",
                        children: [
                          (0, h.jsx)("span", { children: "02" }),
                          (0, h.jsx)("h2", { children: "Твоя тренировка" }),
                        ],
                      }),
                      i &&
                        (0, h.jsxs)("div", {
                          className: "selected-session",
                          children: [
                            (0, h.jsx)(Mt, { size: 21 }),
                            (0, h.jsxs)("div", {
                              children: [
                                (0, h.jsx)("strong", {
                                  children: "Занятие из расписания",
                                }),
                                (0, h.jsxs)("p", {
                                  children: [
                                    dateLabel(i.date),
                                    " · ",
                                    i.time,
                                    " · ",
                                    i.room,
                                  ],
                                }),
                                (0, h.jsx)(q, {
                                  to: "/schedule",
                                  children: "Изменить занятие",
                                }),
                              ],
                            }),
                          ],
                        }),
                      (0, h.jsxs)("div", {
                        className: "form-grid",
                        children: [
                          (0, h.jsxs)("label", {
                            className: "full",
                            children: [
                              "Направление",
                              (0, h.jsx)("select", {
                                name: "direction",
                                value: o.direction,
                                disabled: !!i,
                                onChange: (x) => V("direction", x.target.value),
                                ...J("direction"),
                                children: directions.map((x) =>
                                  (0, h.jsx)(
                                    "option",
                                    { value: x.id, children: x.name },
                                    x.id,
                                  ),
                                ),
                              }),
                              Q("direction"),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            children: [
                              "Удобный день",
                              (0, h.jsx)("input", {
                                type: "date",
                                name: "date",
                                min: e,
                                max: addDays(e, 90),
                                value: o.date,
                                disabled: !!i,
                                onChange: (x) => V("date", x.target.value),
                                ...J("date"),
                              }),
                              Q("date"),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            children: [
                              "Время клуба · UTC+5",
                              (0, h.jsxs)("select", {
                                name: "time",
                                value: o.time,
                                disabled: !!i,
                                onChange: (x) => V("time", x.target.value),
                                ...J("time"),
                                children: [
                                  (0, h.jsx)("option", {
                                    value: "",
                                    children: "Выберите время",
                                  }),
                                  [
                                    ...new Set([
                                      ...times,
                                      ...(i ? [i.time] : []),
                                    ]),
                                  ]
                                    .sort()
                                    .map((x) =>
                                      (0, h.jsx)(
                                        "option",
                                        { value: x, children: x },
                                        x,
                                      ),
                                    ),
                                ],
                              }),
                              Q("time"),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            className: "full",
                            children: [
                              "Тренер · по желанию",
                              (0, h.jsxs)("select", {
                                name: "trainer",
                                value: o.trainer,
                                disabled: !!i,
                                onChange: (x) => V("trainer", x.target.value),
                                children: [
                                  (0, h.jsx)("option", {
                                    value: "",
                                    children: "Любой подходящий тренер",
                                  }),
                                  trainers
                                    .filter((x) =>
                                      x.directions.includes(o.direction),
                                    )
                                    .map((x) =>
                                      (0, h.jsx)(
                                        "option",
                                        { value: x.id, children: x.name },
                                        x.id,
                                      ),
                                    ),
                                ],
                              }),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            className: "full",
                            children: [
                              "Формат",
                              (0, h.jsx)("select", {
                                name: "plan",
                                value: M,
                                onChange: (x) => b(x.target.value),
                                children: plans.map((x) =>
                                  (0, h.jsxs)(
                                    "option",
                                    {
                                      value: x.id,
                                      children: [
                                        x.label,
                                        " — ",
                                        money(x.price),
                                      ],
                                    },
                                    x.id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, h.jsxs)("label", {
                            className: "full",
                            children: [
                              "Комментарий ",
                              (0, h.jsx)("span", {
                                className: "optional",
                                children: "необязательно",
                              }),
                              (0, h.jsx)("textarea", {
                                name: "comment",
                                maxLength: 1e3,
                                rows: 3,
                                value: o.comment,
                                onChange: (x) => V("comment", x.target.value),
                                placeholder:
                                  "Например, это ваше первое знакомство с залом. Не указывайте данные о здоровье.",
                                ...J("comment"),
                              }),
                              Q("comment"),
                            ],
                          }),
                        ],
                      }),
                      (0, h.jsxs)("div", {
                        className: "consent-field",
                        children: [
                          (0, h.jsxs)("label", {
                            children: [
                              (0, h.jsx)("input", {
                                type: "checkbox",
                                name: "consent",
                                checked: o.consent,
                                onChange: (x) => V("consent", x.target.checked),
                                ...J("consent"),
                              }),
                              (0, h.jsxs)("span", {
                                children: [
                                  "Согласен на сохранение введённых данных в этом браузере на условиях ",
                                  (0, h.jsx)(q, {
                                    to: "/privacy",
                                    children: "конфиденциальности",
                                  }),
                                  ". Понимаю, что это демонстрационная запись.",
                                ],
                              }),
                            ],
                          }),
                          Q("consent"),
                        ],
                      }),
                      D &&
                        (0, h.jsxs)("div", {
                          className: "form-error",
                          role: "alert",
                          children: [
                            D,
                            (0, h.jsx)(q, {
                              to: "/schedule",
                              children: "Выбрать другое занятие",
                            }),
                          ],
                        }),
                      (0, h.jsx)("button", {
                        type: "submit",
                        className: "button submit-button",
                        disabled: T || !d,
                        children: T
                          ? (0, h.jsxs)(h.Fragment, {
                              children: [
                                (0, h.jsx)("span", { className: "spinner" }),
                                "Сохраняем запись…",
                              ],
                            })
                          : (0, h.jsxs)(h.Fragment, {
                              children: [
                                "Подтвердить демо-запись",
                                (0, h.jsx)(he, { size: 19 }),
                              ],
                            }),
                      }),
                      (0, h.jsx)("p", {
                        className: "form-small",
                        children:
                          "Реальная оплата не проводится. Номер карты не требуется.",
                      }),
                    ],
                  }),
                ],
              }),
              (0, h.jsxs)("aside", {
                className: "booking-aside",
                children: [
                  (0, h.jsx)(Image, {
                    name: "recovery",
                    alt: "Концепция студии спокойного движения",
                  }),
                  (0, h.jsxs)("div", {
                    className: "aside-content",
                    children: [
                      (0, h.jsx)("span", {
                        className: "eyebrow",
                        children: "ТВОЙ ВЫБОР",
                      }),
                      (0, h.jsx)("h2", { children: P.name }),
                      (0, h.jsx)("div", {
                        className: "price",
                        children: money(P.price),
                      }),
                      (0, h.jsx)("p", { children: P.period }),
                      (0, h.jsx)("ul", {
                        children: P.items.map((x) =>
                          (0, h.jsxs)(
                            "li",
                            { children: [(0, h.jsx)(Ja, { size: 16 }), x] },
                            x,
                          ),
                        ),
                      }),
                      (0, h.jsx)("p", {
                        className: "muted",
                        children: P.limit,
                      }),
                      (0, h.jsxs)("div", {
                        className: "aside-footer",
                        children: [
                          (0, h.jsx)(va, { size: 18 }),
                          (0, h.jsxs)("p", {
                            children: [
                              "Приезжай за 10–15 минут.",
                              (0, h.jsx)("br", {}),
                              "Отмена — минимум за 2 часа.",
                            ],
                          }),
                        ],
                      }),
                      (0, h.jsx)("small", {
                        children:
                          "Демонстрационная стоимость. Тариф не оплачен и не активирован.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, h.jsx)("div", {
            className: "shell booking-back",
            children: (0, h.jsxs)(q, {
              className: "text-link",
              to: "/schedule",
              children: [
                (0, h.jsx)(Cc, { size: 17 }),
                "Вернуться к расписанию",
              ],
            }),
          }),
        ],
      });
}

export { _l, h, BookingPage };
