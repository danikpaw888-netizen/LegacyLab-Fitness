import {SlidersHorizontal as Ec} from "lucide-react";
import * as JSX from "react/jsx-runtime";
import { useClub } from "./ui.js";
import { useSearchParams as Qc } from "react-router-dom";
import { addDays } from "./data.js";
import { getSchedule } from "./data.js";
import { PageIntro } from "./ui.js";
import { DemoNote } from "./ui.js";
import { directions } from "./data.js";
import { trainers } from "./data.js";
import { dateLabel } from "./data.js";
import { X as sd } from "lucide-react";
import { seatsLeft } from "./domain.js";
import { startsAt } from "./domain.js";
import { Clock3 as va } from "lucide-react";
import { Link as q } from "react-router-dom";
import { MapPin as Id } from "lucide-react";
import { ArrowUpRight as he } from "lucide-react";
import { Empty } from "./ui.js";
var y = JSX;
function Schedule() {
  let { today: e, now: l, store: a } = useClub(),
    [d, t] = Qc(),
    c = Array.from({ length: 7 }, (b, m) => addDays(e, m)),
    i = c.includes(d.get("day") ?? "") ? d.get("day") : e,
    n = d.get("direction") ?? "",
    u = d.get("trainer") ?? "",
    o = getSchedule(e),
    r = o.filter(
      (b) =>
        b.date === i && (!n || b.direction === n) && (!u || b.trainer === u),
    ),
    M = (b, m) => {
      let N = new URLSearchParams(d);
      (m ? N.set(b, m) : N.delete(b), t(N, { preventScrollReset: !0 }));
    };
  return (0, y.jsxs)(y.Fragment, {
    children: [
      (0, y.jsx)(PageIntro, {
        kicker: "РАСПИСАНИЕ",
        title: (0, y.jsxs)(y.Fragment, {
          children: [
            "Твоё время.",
            (0, y.jsx)("br", {}),
            "Твой следующий шаг.",
          ],
        }),
        children:
          "Выбери день и занятие. Найди свой темп — от спокойного восстановления до работы над силой.",
      }),
      (0, y.jsxs)("section", {
        className: "shell section-tight schedule-page",
        children: [
          (0, y.jsx)(DemoNote, {
            children:
              "Демонстрационное расписание на 7 дней. Места учитывают только записи этого браузера. Время клуба — UTC+5.",
          }),
          (0, y.jsxs)("div", {
            className: "schedule-toolbar",
            children: [
              (0, y.jsxs)("div", {
                className: "eyebrow",
                children: [
                  (0, y.jsx)(Ec, { size: 16, "aria-hidden": "true" }),
                  " НАСТРОЙ СВОЙ РИТМ",
                ],
              }),
              (0, y.jsxs)("div", {
                className: "schedule-filters",
                children: [
                  (0, y.jsxs)("label", {
                    children: [
                      "Направление",
                      (0, y.jsxs)("select", {
                        value: n,
                        onChange: (b) => M("direction", b.target.value),
                        "aria-label": "Фильтр по направлению",
                        children: [
                          (0, y.jsx)("option", {
                            value: "",
                            children: "Все направления",
                          }),
                          directions.map((b) =>
                            (0, y.jsx)(
                              "option",
                              { value: b.id, children: b.name },
                              b.id,
                            ),
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, y.jsxs)("label", {
                    children: [
                      "Тренер",
                      (0, y.jsxs)("select", {
                        value: u,
                        onChange: (b) => M("trainer", b.target.value),
                        "aria-label": "Фильтр по тренеру",
                        children: [
                          (0, y.jsx)("option", {
                            value: "",
                            children: "Все тренеры",
                          }),
                          trainers.map((b) =>
                            (0, y.jsx)(
                              "option",
                              { value: b.id, children: b.name },
                              b.id,
                            ),
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsx)("div", {
            className: "day-tabs",
            role: "group",
            "aria-label": "Дни недели",
            children: c.map((b, m) =>
              (0, y.jsxs)(
                "button",
                {
                  onClick: () => M("day", b),
                  "aria-pressed": i === b,
                  className: i === b ? "selected" : "",
                  children: [
                    (0, y.jsx)("span", {
                      children: dateLabel(b, { weekday: "short" }),
                    }),
                    (0, y.jsx)("strong", {
                      children: dateLabel(b, { day: "numeric" }),
                    }),
                    (0, y.jsx)("small", {
                      children:
                        m === 0 ? "Сегодня" : dateLabel(b, { month: "short" }),
                    }),
                  ],
                },
                b,
              ),
            ),
          }),
          (0, y.jsxs)("div", {
            className: "schedule-result-line",
            children: [
              (0, y.jsx)("h2", {
                children: dateLabel(i, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }),
              }),
              (0, y.jsxs)("span", {
                role: "status",
                children: [r.length, " занятий"],
              }),
            ],
          }),
          (n || u) &&
            (0, y.jsxs)("div", {
              className: "filter-chips",
              children: [
                n &&
                  (0, y.jsxs)("button", {
                    onClick: () => M("direction", ""),
                    children: [
                      directions.find((b) => b.id === n)?.name ??
                        "Неизвестное направление",
                      (0, y.jsx)(sd, { size: 15 }),
                      (0, y.jsx)("span", {
                        className: "sr-only",
                        children: "Снять фильтр направления",
                      }),
                    ],
                  }),
                u &&
                  (0, y.jsxs)("button", {
                    onClick: () => M("trainer", ""),
                    children: [
                      trainers.find((b) => b.id === u)?.name ??
                        "Неизвестный тренер",
                      (0, y.jsx)(sd, { size: 15 }),
                      (0, y.jsx)("span", {
                        className: "sr-only",
                        children: "Снять фильтр тренера",
                      }),
                    ],
                  }),
                (0, y.jsx)("button", {
                  className: "reset-filters",
                  onClick: () => t({ day: i }),
                  children: "Сбросить фильтры",
                }),
              ],
            }),
          r.length
            ? (0, y.jsx)("div", {
                className: "schedule-rows",
                children: r.map((b) => {
                  let m = seatsLeft(b, a),
                    N = a.bookings.some(
                      (p) => p.sessionId === b.id && p.status === "confirmed",
                    ),
                    D = startsAt(b.date, b.time) <= new Date(l).getTime(),
                    w = b.cancelled || m === 0 || D || N,
                    T = b.cancelled
                      ? "Занятие отменено"
                      : D
                        ? "Уже началось"
                        : N
                          ? "Вы записаны"
                          : m === 0
                            ? "Мест нет"
                            : m + " мест";
                  return (0, y.jsxs)(
                    "article",
                    {
                      className: "schedule-row " + (w ? "unavailable" : ""),
                      children: [
                        (0, y.jsxs)("div", {
                          className: "session-time",
                          children: [
                            b.time,
                            (0, y.jsxs)("small", {
                              children: [
                                (0, y.jsx)(va, {
                                  size: 13,
                                  "aria-hidden": "true",
                                }),
                                b.duration,
                                " мин",
                              ],
                            }),
                          ],
                        }),
                        (0, y.jsxs)("div", {
                          className: "session-main",
                          children: [
                            (0, y.jsx)("span", {
                              className: "eyebrow",
                              children: directions.find(
                                (p) => p.id === b.direction,
                              )?.en,
                            }),
                            (0, y.jsx)("h3", {
                              children: (0, y.jsx)(q, {
                                to: "/training/" + b.direction,
                                children: directions.find(
                                  (p) => p.id === b.direction,
                                )?.name,
                              }),
                            }),
                            (0, y.jsxs)("p", {
                              children: [
                                (0, y.jsx)(Id, {
                                  size: 13,
                                  "aria-hidden": "true",
                                }),
                                b.room,
                              ],
                            }),
                          ],
                        }),
                        (0, y.jsxs)(q, {
                          className: "session-trainer",
                          to: "/trainers/" + b.trainer,
                          children: [
                            trainers.find((p) => p.id === b.trainer)?.name,
                            (0, y.jsx)("small", { children: "Демо-тренер" }),
                          ],
                        }),
                        (0, y.jsxs)("span", {
                          className: "session-status " + (w ? "" : "available"),
                          children: [
                            !w &&
                              (0, y.jsx)("span", { className: "status-dot" }),
                            T,
                          ],
                        }),
                        N
                          ? (0, y.jsxs)(q, {
                              className: "button secondary small",
                              to: "/account",
                              children: [
                                "Моя запись",
                                (0, y.jsx)(he, { size: 17 }),
                              ],
                            })
                          : w
                            ? (0, y.jsx)("button", {
                                className: "button secondary small",
                                disabled: !0,
                                children: b.cancelled
                                  ? "Отменено"
                                  : D
                                    ? "Закрыто"
                                    : "Нет мест",
                              })
                            : (0, y.jsxs)(q, {
                                className: "button secondary small",
                                to: "/booking?session=" + b.id,
                                children: [
                                  "Записаться",
                                  (0, y.jsx)(he, { size: 17 }),
                                ],
                              }),
                      ],
                    },
                    b.id,
                  );
                }),
              })
            : (0, y.jsx)(Empty, {
                title: "В этот день совпадений нет.",
                text: "Попробуйте другое направление, тренера или день недели.",
                to: "/schedule?day=" + i,
                button: "Сбросить фильтры",
              }),
          (0, y.jsxs)("div", {
            className: "schedule-footnote",
            children: [
              (0, y.jsx)("p", {
                children:
                  "Подойдёт ли занятие новичку? У каждого направления есть подробное описание. На пробной тренировке можно познакомиться с залом в спокойном темпе.",
              }),
              (0, y.jsxs)(q, {
                to: "/booking?plan=trial",
                className: "text-link",
                children: ["Начать с пробной", (0, y.jsx)(he, { size: 18 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export { y, Schedule };
