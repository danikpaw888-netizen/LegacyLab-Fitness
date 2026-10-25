import * as React from "react";
import * as JSX from "react/jsx-runtime";
import { directions } from "./data.js";
import { Link as q } from "react-router-dom";
import { Image } from "./ui.js";
import { ArrowUpRight as he } from "lucide-react";
import { trainers } from "./data.js";
import { useClub } from "./ui.js";
import { plans } from "./data.js";
import { money } from "./data.js";
import { Check as Ja } from "lucide-react";
import { Button } from "./ui.js";
import { getSchedule } from "./data.js";
import { startsAt } from "./domain.js";
import { dateLabel } from "./data.js";
import { ArrowDown as gc } from "lucide-react";
import { Plus as od } from "lucide-react";
import { TextLink } from "./ui.js";
import { SectionHead } from "./ui.js";
import { Focus as Bc } from "lucide-react";
import { Activity as Fc } from "lucide-react";
import { Sun as Pc } from "lucide-react";
import { FAQ } from "./ui.js";
import { Clock3 as va } from "lucide-react";
import { MapPin as Id } from "lucide-react";
import { FinalCTA } from "./ui.js";
import { PageIntro } from "./ui.js";
import { DemoNote } from "./ui.js";
import { Dialog } from "./ui.js";
import { useParams as Hn } from "react-router-dom";
import { config } from "./data.js";
import { Empty } from "./ui.js";
var Bb = React;
var s = JSX;
function DirectionCards({ all: e = !1 }) {
  return (0, s.jsx)("div", {
    className: "direction-grid",
    children: directions.slice(0, e ? 6 : 3).map((l, a) =>
      (0, s.jsxs)(
        q,
        {
          to: "/training/" + l.id,
          className: "direction-card",
          "data-reveal": !0,
          children: [
            (0, s.jsx)(Image, {
              name: l.image,
              alt: l.name + " — визуализация тренировочного пространства",
            }),
            (0, s.jsxs)("div", {
              className: "direction-content",
              children: [
                (0, s.jsxs)("div", {
                  className: "card-meta",
                  children: [
                    (0, s.jsxs)("span", {
                      children: ["0", a + 1, " / ", l.en],
                    }),
                    (0, s.jsx)(he, { "aria-hidden": "true" }),
                  ],
                }),
                (0, s.jsx)("h3", { children: l.name }),
                (0, s.jsx)("p", { children: l.tag }),
              ],
            }),
          ],
        },
        l.id,
      ),
    ),
  });
}
function TrainerCards() {
  return (0, s.jsx)("div", {
    className: "trainer-grid",
    children: trainers.map((e, l) =>
      (0, s.jsxs)(
        "article",
        {
          className: "trainer-card",
          "data-reveal": !0,
          children: [
            (0, s.jsxs)(q, {
              to: "/trainers/" + e.id,
              className: "trainer-portrait",
              "aria-label": "Профиль: " + e.name,
              children: [
                (0, s.jsx)(Image, {
                  name: e.image,
                  alt:
                    e.name + " — вымышленный профиль, изображение создано ИИ",
                }),
                (0, s.jsx)("span", {
                  className: "round-arrow",
                  children: (0, s.jsx)(he, { size: 20 }),
                }),
              ],
            }),
            (0, s.jsx)("div", {
              className: "card-meta",
              children: (0, s.jsxs)("span", {
                children: ["0", l + 1, " / ", e.role],
              }),
            }),
            (0, s.jsx)("h3", {
              children: (0, s.jsx)(q, {
                to: "/trainers/" + e.id,
                children: e.name,
              }),
            }),
            (0, s.jsxs)("p", { children: [e.experience, " · демо-профиль"] }),
          ],
        },
        e.id,
      ),
    ),
  });
}
function PlanCards({ compact: e = !1 }) {
  let { update: l, notify: a } = useClub();
  return (0, s.jsx)("div", {
    className: "plan-grid " + (e ? "compact" : ""),
    children: plans
      .filter((d) => !e || ["trial", "month", "personal"].includes(d.id))
      .map((d) =>
        (0, s.jsxs)(
          "article",
          {
            className: "plan-card " + (d.featured ? "featured" : ""),
            "data-reveal": !0,
            children: [
              d.featured &&
                (0, s.jsx)("span", {
                  className: "plan-badge",
                  children: "ДЛЯ СВОЕГО РИТМА",
                }),
              (0, s.jsx)("span", { className: "eyebrow", children: d.label }),
              (0, s.jsx)("h3", { children: d.name }),
              (0, s.jsx)("div", {
                className: "price",
                children: money(d.price),
              }),
              (0, s.jsx)("p", { className: "plan-period", children: d.period }),
              (0, s.jsx)("ul", {
                children: d.items.map((t) =>
                  (0, s.jsxs)(
                    "li",
                    {
                      children: [
                        (0, s.jsx)(Ja, { size: 16, "aria-hidden": "true" }),
                        t,
                      ],
                    },
                    t,
                  ),
                ),
              }),
              (0, s.jsx)("p", { className: "plan-limit", children: d.limit }),
              (0, s.jsx)(Button, {
                to: "/booking?plan=" + d.id,
                secondary: !d.featured,
                onClick: () => {
                  try {
                    l((t) => ({ ...t, planId: d.id }));
                  } catch {
                    a(
                      "Тариф выбран для формы. Сохранение в браузере пока недоступно.",
                    );
                  }
                },
                children: "Выбрать тариф",
              }),
            ],
          },
          d.id,
        ),
      ),
  });
}
function SchedulePreview() {
  let { today: e, now: l, store: a } = useClub(),
    d = getSchedule(e)
      .filter(
        (t) =>
          !t.cancelled &&
          t.seats > 0 &&
          startsAt(t.date, t.time) > new Date(l).getTime() &&
          !a.bookings.some(
            (c) => c.sessionId === t.id && c.status === "confirmed",
          ),
      )
      .slice(0, 3);
  return (0, s.jsx)("div", {
    className: "schedule-preview",
    children: d.map((t) =>
      (0, s.jsxs)(
        "div",
        {
          className: "preview-row",
          children: [
            (0, s.jsxs)("div", {
              children: [
                (0, s.jsx)("span", {
                  className: "preview-time",
                  children: t.time,
                }),
                (0, s.jsx)("small", {
                  children: dateLabel(t.date, {
                    day: "numeric",
                    month: "short",
                  }),
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              children: [
                (0, s.jsx)("h3", {
                  children: directions.find((c) => c.id === t.direction)?.name,
                }),
                (0, s.jsxs)("p", {
                  children: [
                    trainers.find((c) => c.id === t.trainer)?.name,
                    " · ",
                    t.duration,
                    " мин",
                  ],
                }),
              ],
            }),
            (0, s.jsx)("span", { className: "preview-room", children: t.room }),
            (0, s.jsx)(q, {
              className: "round-arrow",
              to: "/booking?session=" + t.id,
              "aria-label": "Записаться: " + t.time + ", " + dateLabel(t.date),
              children: (0, s.jsx)(he, {}),
            }),
          ],
        },
        t.id,
      ),
    ),
  });
}
function Home() {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)("section", {
        className: "hero",
        children: [
          (0, s.jsx)(Image, {
            name: "hero",
            alt: "Концепция LegacyLab Fitness: тренировка с гантелями в просторном зале с естественным светом",
            priority: !0,
          }),
          (0, s.jsx)("div", { className: "hero-shade" }),
          (0, s.jsxs)("div", {
            className: "shell hero-inner",
            children: [
              (0, s.jsxs)("div", {
                className: "hero-eyebrow",
                children: [
                  (0, s.jsx)("span", { className: "status-dot" }),
                  " ПРОСТРАНСТВО ТВОЕГО ПРОГРЕССА",
                ],
              }),
              (0, s.jsxs)("h1", {
                children: [
                  "Сила —",
                  (0, s.jsx)("br", {}),
                  "это твой",
                  (0, s.jsx)("br", {}),
                  (0, s.jsx)("span", { children: "выбор." }),
                ],
              }),
              (0, s.jsxs)("p", {
                children: [
                  "Сила — это то, что ты создаёшь каждый день.",
                  (0, s.jsx)("br", {}),
                  "Найди свой ритм в LegacyLab Fitness.",
                ],
              }),
              (0, s.jsxs)("div", {
                className: "hero-buttons",
                children: [
                  (0, s.jsx)(Button, {
                    to: "/booking?plan=trial",
                    children: "Записаться на пробную",
                  }),
                  (0, s.jsx)(Button, {
                    to: "/club",
                    secondary: !0,
                    children: "Посмотреть клуб",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "hero-bottom",
                children: [
                  (0, s.jsx)("span", { children: "TRAIN. RECOVER. EVOLVE." }),
                  (0, s.jsxs)("a", {
                    href: "#about",
                    "aria-label": "Узнать о клубе",
                    children: [
                      (0, s.jsx)(gc, { size: 19 }),
                      " ДАЛЬШЕ — БОЛЬШЕ",
                    ],
                  }),
                  (0, s.jsx)("span", { children: "01 / YOUR NEXT CHAPTER" }),
                ],
              }),
            ],
          }),
          (0, s.jsx)("span", {
            className: "hero-vertical",
            "aria-hidden": "true",
            children: "BUILT EVERY DAY / LEGACYLAB",
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "brand-strip",
        "aria-hidden": "true",
        children: [
          (0, s.jsx)("span", { children: "DISCIPLINE" }),
          (0, s.jsx)(od, {}),
          (0, s.jsx)("span", { children: "PROGRESS" }),
          (0, s.jsx)(od, {}),
          (0, s.jsx)("span", { children: "BALANCE" }),
          (0, s.jsx)(od, {}),
          (0, s.jsx)("span", { children: "YOUR LEGACY" }),
          (0, s.jsx)(od, {}),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell intro-section",
        id: "about",
        children: [
          (0, s.jsx)("div", {
            className: "eyebrow",
            "data-reveal": !0,
            children: "01 / НЕ ПРОСТО ФИТНЕС",
          }),
          (0, s.jsxs)("div", {
            "data-reveal": !0,
            children: [
              (0, s.jsxs)("h2", {
                children: [
                  "Место, где ты",
                  (0, s.jsx)("br", {}),
                  "становишься ",
                  (0, s.jsx)("span", {
                    className: "subtle",
                    children: "собой.",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "intro-bottom",
                children: [
                  (0, s.jsx)("p", {
                    children:
                      "Без гонки за чужими результатами. С вниманием к технике, восстановлению и твоему собственному темпу. Мы создали концепцию пространства, в которое хочется возвращаться.",
                  }),
                  (0, s.jsx)(TextLink, {
                    to: "/club",
                    children: "Философия клуба",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "02",
            kicker: "НАЙДИ СВОЁ ДВИЖЕНИЕ",
            title: (0, s.jsxs)(s.Fragment, {
              children: ["Разные пути.", (0, s.jsx)("br", {}), "Твоя сила."],
            }),
            action: (0, s.jsx)(TextLink, {
              to: "/training",
              children: "Все направления",
            }),
            children:
              "От первого знакомства с залом до привычки тренироваться.",
          }),
          (0, s.jsx)(DirectionCards, {}),
        ],
      }),
      (0, s.jsx)("section", {
        className: "benefits-section",
        children: (0, s.jsx)("div", {
          className: "shell benefits-grid",
          children: [
            [
              Bc,
              "Внимание к тебе",
              "Помогаем выбрать нагрузку, а не подгоняем под общий стандарт.",
            ],
            [
              Fc,
              "Система вместо случайности",
              "Понятная структура занятий и постепенное движение вперёд.",
            ],
            [
              Pc,
              "Баланс нагрузки и отдыха",
              "Восстановление — такая же часть твоего плана, как тренировка.",
            ],
          ].map(([e, l, a]) =>
            (0, s.jsxs)(
              "article",
              {
                "data-reveal": !0,
                children: [
                  (0, s.jsx)(e, {
                    size: 30,
                    strokeWidth: 1.3,
                    "aria-hidden": "true",
                  }),
                  (0, s.jsx)("h3", { children: String(l) }),
                  (0, s.jsx)("p", { children: String(a) }),
                ],
              },
              String(l),
            ),
          ),
        }),
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "03",
            kicker: "ПРОСТРАНСТВО",
            title: (0, s.jsxs)(s.Fragment, {
              children: [
                "Больше воздуха.",
                (0, s.jsx)("br", {}),
                "Меньше лишнего.",
              ],
            }),
            action: (0, s.jsx)(TextLink, {
              to: "/club#space",
              children: "Исследовать клуб",
            }),
            children:
              "Свет, материалы и оборудование, которые помогают сосредоточиться.",
          }),
          (0, s.jsxs)("div", {
            className: "space-feature",
            "data-reveal": !0,
            children: [
              (0, s.jsx)(Image, {
                name: "strength",
                alt: "Визуализация силового зала с рядами гантелей и естественным светом",
              }),
              (0, s.jsxs)("div", {
                className: "space-caption",
                children: [
                  (0, s.jsx)("span", { children: "01 / STRENGTH ZONE" }),
                  (0, s.jsx)("p", { children: "Всё для уверенного движения." }),
                  (0, s.jsx)(q, {
                    to: "/club#space",
                    className: "round-arrow",
                    "aria-label": "Посмотреть зоны клуба",
                    children: (0, s.jsx)(he, {}),
                  }),
                ],
              }),
            ],
          }),
          (0, s.jsx)("p", {
            className: "image-caption",
            children:
              "Визуализация концепции. Фотографии созданы с помощью ИИ.",
          }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "04",
            kicker: "ТВОЯ КОМАНДА",
            title: (0, s.jsxs)(s.Fragment, {
              children: [
                "Люди, которые",
                (0, s.jsx)("br", {}),
                "помогают расти.",
              ],
            }),
            action: (0, s.jsx)(TextLink, {
              to: "/trainers",
              children: "Познакомиться с командой",
            }),
            children:
              "Демонстрационные профили: имена, опыт и фотографии приведены для примера.",
          }),
          (0, s.jsx)(TrainerCards, {}),
        ],
      }),
      (0, s.jsx)("section", {
        className: "section schedule-section",
        children: (0, s.jsxs)("div", {
          className: "shell",
          children: [
            (0, s.jsx)(SectionHead, {
              num: "05",
              kicker: "РИТМ НЕДЕЛИ",
              title: (0, s.jsxs)(s.Fragment, {
                children: ["Время", (0, s.jsx)("br", {}), "для себя."],
              }),
              action: (0, s.jsx)(TextLink, {
                to: "/schedule",
                children: "Полное расписание",
              }),
              children:
                "Ближайшие занятия · время клуба UTC+5 · демонстрационные места.",
            }),
            (0, s.jsx)(SchedulePreview, {}),
          ],
        }),
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "06",
            kicker: "ТВОЙ ФОРМАТ",
            title: (0, s.jsxs)(s.Fragment, {
              children: [
                "Начни с малого.",
                (0, s.jsx)("br", {}),
                "Продолжай по-своему.",
              ],
            }),
            action: (0, s.jsx)(TextLink, {
              to: "/plans",
              children: "Все тарифы",
            }),
            children:
              "Прозрачные демонстрационные условия. Без реальной оплаты и автопродления.",
          }),
          (0, s.jsx)(PlanCards, { compact: !0 }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell reviews-section",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "07",
            kicker: "ЧЕЛОВЕЧЕСКИЙ ОПЫТ",
            title: "Здесь важны ощущения.",
            children:
              "Примеры отзывов для демонстрации интерфейса. Это не отзывы реальных посетителей.",
          }),
          (0, s.jsx)("div", {
            className: "review-grid",
            children: [
              "Наконец-то можно начать спокойно, не сравнивая себя с теми, кто давно в зале.",
              "Нравится, когда у тренировки есть понятный план, а у меня — свой темп.",
              "Тот самый час без спешки. После рабочего дня это особенно ценно.",
            ].map((e, l) =>
              (0, s.jsxs)(
                "blockquote",
                {
                  children: [
                    (0, s.jsx)("span", {
                      className: "quote-mark",
                      children: "“",
                    }),
                    (0, s.jsx)("p", { children: e }),
                    (0, s.jsxs)("footer", {
                      children: ["ДЕМО-ОТЗЫВ / 0", l + 1],
                    }),
                  ],
                },
                e,
              ),
            ),
          }),
        ],
      }),
      (0, s.jsx)(FAQ, {}),
      (0, s.jsxs)("section", {
        className: "section shell home-contact",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "10 / НА СВЯЗИ",
              }),
              (0, s.jsxs)("h2", {
                children: [
                  "Твой маршрут",
                  (0, s.jsx)("br", {}),
                  "к новой привычке.",
                ],
              }),
              (0, s.jsxs)("p", {
                className: "muted",
                children: [
                  "Как спланировать первый визит, что взять с собой",
                  (0, s.jsx)("br", {}),
                  "и как устроен демонстрационный клуб.",
                ],
              }),
              (0, s.jsx)(Button, {
                to: "/contacts",
                secondary: !0,
                children: "Контакты и первый визит",
              }),
            ],
          }),
          (0, s.jsxs)("div", {
            className: "contact-preview",
            children: [
              (0, s.jsx)(va, { "aria-hidden": "true" }),
              (0, s.jsxs)("p", {
                children: [
                  "Ежедневно",
                  (0, s.jsx)("br", {}),
                  (0, s.jsx)("strong", { children: "07:00–23:00" }),
                ],
              }),
              (0, s.jsx)(Id, { "aria-hidden": "true" }),
              (0, s.jsxs)("p", {
                children: [
                  "Город N, улица Прогресса, 12",
                  (0, s.jsx)("br", {}),
                  (0, s.jsx)("small", {
                    children: "Вымышленный адрес · пример",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)(FinalCTA, {}),
    ],
  });
}
function Club() {
  let [e, l] = (0, Bb.useState)(null);
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "О КЛУБЕ",
        title: (0, s.jsxs)(s.Fragment, {
          children: [
            "Пространство.",
            (0, s.jsx)("br", {}),
            "Для сильной версии тебя.",
          ],
        }),
        children:
          "Legacy — то, что остаётся с тобой. Lab — смелость пробовать новое. Мы соединяем эти идеи в современном подходе к тренировкам.",
      }),
      (0, s.jsxs)("div", {
        className: "shell",
        children: [
          (0, s.jsx)(DemoNote, {}),
          (0, s.jsxs)("div", {
            className: "club-lead",
            children: [
              (0, s.jsx)(Image, {
                name: "strength",
                alt: "Архитектурная визуализация тренировочного зала",
                priority: !0,
              }),
              (0, s.jsxs)("div", {
                children: [
                  (0, s.jsx)("span", {
                    className: "eyebrow",
                    children: "НАША ФИЛОСОФИЯ",
                  }),
                  (0, s.jsxs)("h2", {
                    children: [
                      "Не идеальный старт.",
                      (0, s.jsx)("br", {}),
                      "А следующий шаг.",
                    ],
                  }),
                  (0, s.jsx)("p", {
                    children:
                      "Здесь не нужно соответствовать чужим ожиданиям. Важнее научиться двигаться уверенно, понимать нагрузку и находить время для восстановления.",
                  }),
                  (0, s.jsx)("p", {
                    children:
                      "Тренер объясняет, пространство помогает сосредоточиться, а ты выбираешь свой ритм. Маленькие действия становятся системой — день за днём.",
                  }),
                  (0, s.jsx)(Button, {
                    to: "/booking",
                    children: "Познакомиться с клубом",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        id: "space",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "01",
            kicker: "ЧЕТЫРЕ ЗОНЫ",
            title: "Всё на своём месте.",
            children:
              "Все изображения — визуализации концепции, а не фотографии действующего клуба.",
          }),
          (0, s.jsx)("div", {
            className: "zone-grid",
            children: [
              [
                "strength",
                "Силовой зал",
                "Свободные веса, тренажёры и пространство для базовых движений.",
              ],
              [
                "functional",
                "Функциональная зона",
                "Гири, кольца и оборудование для разнообразных тренировок.",
              ],
              [
                "recovery",
                "Студия движения",
                "Групповые занятия, мобильность и внимание к своему темпу.",
              ],
              [
                "lounge",
                "Зона восстановления",
                "Спокойная пауза между залом и остальным днём.",
              ],
            ].map(([d, t, c], i) =>
              (0, s.jsxs)(
                "article",
                {
                  "data-reveal": !0,
                  children: [
                    (0, s.jsxs)("button", {
                      className: "zone-image",
                      onClick: () => l(d),
                      "aria-label": "Увеличить: " + t,
                      children: [
                        (0, s.jsx)(Image, {
                          name: d,
                          alt: t + " — концепция пространства",
                        }),
                        (0, s.jsx)("span", {
                          className: "round-arrow",
                          children: (0, s.jsx)(od, {}),
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "card-meta",
                      children: ["0", i + 1, " / LEGACYLAB SPACE"],
                    }),
                    (0, s.jsx)("h3", { children: t }),
                    (0, s.jsx)("p", { children: c }),
                  ],
                },
                d,
              ),
            ),
          }),
        ],
      }),
      (0, s.jsx)(FAQ, {}),
      (0, s.jsx)(FinalCTA, {}),
      (0, s.jsx)(Dialog, {
        open: !!e,
        onClose: () => l(null),
        title: "Концепция пространства",
        className: "image-dialog",
        children:
          e &&
          (0, s.jsx)(Image, {
            name: e,
            alt: "Увеличенная визуализация зоны клуба",
          }),
      }),
    ],
  });
}
function Training() {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "ТРЕНИРОВКИ",
        title: (0, s.jsxs)(s.Fragment, {
          children: [
            "Найди движение,",
            (0, s.jsx)("br", {}),
            "которое станет твоим.",
          ],
        }),
        children:
          "Шесть направлений. Разная интенсивность. Одна идея: устойчивый прогресс в подходящем тебе ритме.",
      }),
      (0, s.jsxs)("section", {
        className: "shell section section-tight",
        children: [
          (0, s.jsx)(DirectionCards, { all: !0 }),
          (0, s.jsx)(DemoNote, {
            children:
              "Все программы и условия представлены как пример. Занятия не являются медицинскими услугами.",
          }),
        ],
      }),
      (0, s.jsx)(FinalCTA, {}),
    ],
  });
}
function TrainingDetail() {
  let { slug: e } = Hn(),
    l = directions.find((a) => a.id === e);
  return l
    ? (0, s.jsxs)(s.Fragment, {
        children: [
          (0, s.jsx)(PageIntro, {
            kicker: "ТРЕНИРОВКИ / " + l.en,
            title: l.name,
            children: l.subtitle,
          }),
          (0, s.jsxs)("div", {
            className: "shell detail-grid section-tight",
            children: [
              (0, s.jsx)(Image, {
                name: l.image,
                alt: "Визуализация направления: " + l.name,
                priority: !0,
              }),
              (0, s.jsxs)("div", {
                className: "detail-copy",
                children: [
                  (0, s.jsxs)("span", {
                    className: "eyebrow",
                    children: [l.duration, " МИНУТ / В СВОЁМ ТЕМПЕ"],
                  }),
                  (0, s.jsx)("h2", { children: l.tag }),
                  (0, s.jsx)("p", { children: l.text }),
                  (0, s.jsx)("h3", { children: "Кому подходит" }),
                  (0, s.jsx)("p", { children: l.for }),
                  (0, s.jsx)("h3", { children: "Как проходит занятие" }),
                  (0, s.jsx)("p", { children: l.process }),
                  (0, s.jsx)(Button, {
                    to: "/booking?direction=" + l.id,
                    children: "Записаться на занятие",
                  }),
                  (0, s.jsx)(TextLink, {
                    to: "/schedule?direction=" + l.id,
                    children: "Посмотреть расписание",
                  }),
                  (0, s.jsx)(DemoNote, {
                    children:
                      "Демонстрационная программа. При ограничениях по нагрузке обсудите занятия со специалистом.",
                  }),
                ],
              }),
            ],
          }),
          (0, s.jsxs)("section", {
            className: "section shell",
            children: [
              (0, s.jsx)(SectionHead, {
                num: "01",
                kicker: "ПОДДЕРЖКА РЯДОМ",
                title: "Твой следующий шаг.",
                children:
                  "Можно начать с пробного занятия и спокойно познакомиться с подходом клуба.",
              }),
              (0, s.jsx)(Button, {
                to: "/booking?plan=trial",
                children: "Выбрать пробную тренировку",
              }),
            ],
          }),
        ],
      })
    : (0, s.jsx)(NotFound, {});
}
function Trainers() {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "КОМАНДА",
        title: (0, s.jsxs)(s.Fragment, {
          children: [
            "Рядом с тобой.",
            (0, s.jsx)("br", {}),
            "На каждом этапе.",
          ],
        }),
        children:
          "Техника, внимание и поддержка. Познакомься с подходом каждого тренера и найди комфортный формат занятий.",
      }),
      (0, s.jsxs)("section", {
        className: "shell section section-tight",
        children: [
          (0, s.jsx)(DemoNote, {
            children:
              "Все профили вымышлены: имена, опыт, специализации и фотографии — демонстрационный контент. Изображения созданы с помощью ИИ.",
          }),
          (0, s.jsx)(TrainerCards, {}),
        ],
      }),
      (0, s.jsx)(FinalCTA, {}),
    ],
  });
}
function TrainerDetail() {
  let { slug: e } = Hn(),
    l = trainers.find((a) => a.id === e);
  return l
    ? (0, s.jsxs)(s.Fragment, {
        children: [
          (0, s.jsxs)(PageIntro, {
            kicker: "ТРЕНЕРЫ / ДЕМО-ПРОФИЛЬ",
            title: l.name,
            children: [l.role, " · ", l.experience, " — пример данных."],
          }),
          (0, s.jsxs)("section", {
            className: "shell detail-grid trainer-detail section-tight",
            children: [
              (0, s.jsx)(Image, {
                name: l.image,
                alt: l.name + " — вымышленный тренер, изображение ИИ",
                priority: !0,
              }),
              (0, s.jsxs)("div", {
                className: "detail-copy",
                children: [
                  (0, s.jsx)("span", {
                    className: "eyebrow",
                    children: "ПОДХОД К ТРЕНИРОВКАМ",
                  }),
                  (0, s.jsxs)("h2", { children: ["«", l.quote, "»"] }),
                  (0, s.jsx)("p", { children: l.bio }),
                  (0, s.jsx)("h3", { children: "Направления" }),
                  (0, s.jsx)("div", {
                    className: "tag-list",
                    children: l.directions.map((a) =>
                      (0, s.jsxs)(
                        q,
                        {
                          to: "/training/" + a,
                          children: [
                            directions.find((d) => d.id === a)?.name,
                            (0, s.jsx)(he, { size: 15 }),
                          ],
                        },
                        a,
                      ),
                    ),
                  }),
                  (0, s.jsx)(Button, {
                    to:
                      "/booking?trainer=" +
                      l.id +
                      "&direction=" +
                      l.directions[0],
                    children: "Выбрать тренировку",
                  }),
                  (0, s.jsx)(TextLink, {
                    to: "/schedule?trainer=" + l.id,
                    children: "Занятия этого тренера",
                  }),
                  (0, s.jsx)(DemoNote, {
                    children:
                      "Это демонстрационный профиль. Здесь нет заявлений о реальных сертификатах или достижениях.",
                  }),
                ],
              }),
            ],
          }),
          (0, s.jsx)(FinalCTA, {}),
        ],
      })
    : (0, s.jsx)(NotFound, {});
}
function Plans() {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "ТАРИФЫ",
        title: (0, s.jsxs)(s.Fragment, {
          children: ["Выбери свой", (0, s.jsx)("br", {}), "ритм движения."],
        }),
        children:
          "Первое знакомство, регулярные тренировки или персональная работа. Понятный формат для каждого этапа.",
      }),
      (0, s.jsxs)("section", {
        className: "section section-tight shell",
        children: [
          (0, s.jsx)(DemoNote, {
            children:
              "Цены в рублях — демонстрационные. При выборе тарифа списаний нет; настоящий договор и абонемент не оформляются.",
          }),
          (0, s.jsx)(PlanCards, {}),
          (0, s.jsxs)("div", {
            className: "terms-grid",
            children: [
              (0, s.jsxs)("div", {
                children: [
                  (0, s.jsx)("h3", { children: "Без скрытых условий" }),
                  (0, s.jsx)("p", {
                    children:
                      "Стоимость указана полностью. Автоматических списаний нет. Срок и ограничения каждого формата указаны в карточке.",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                children: [
                  (0, s.jsx)("h3", { children: "Сначала — знакомство" }),
                  (0, s.jsx)("p", {
                    children:
                      "Для первого посещения подойдёт пробная тренировка. Выбор тарифа сохранится в демо-кабинете этого браузера.",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                children: [
                  (0, s.jsx)("h3", { children: "Планы могут меняться" }),
                  (0, s.jsx)("p", {
                    children:
                      "Отмена записи доступна в кабинете минимум за 2 часа до начала. Все условия служат примером продукта.",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)(FAQ, {}),
    ],
  });
}
function Contacts() {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "КОНТАКТЫ",
        title: (0, s.jsxs)(s.Fragment, {
          children: ["Увидимся", (0, s.jsx)("br", {}), "на тренировке."],
        }),
        children:
          "Спланируй первый визит без спешки. Ниже — пример контактного блока для будущего клуба.",
      }),
      (0, s.jsxs)("section", {
        className: "shell section-tight",
        children: [
          (0, s.jsx)(DemoNote, {
            children:
              "Клуб вымышленный. Адрес, телефон и email ниже — шаблоны, они не предназначены для связи или поездки.",
          }),
          (0, s.jsxs)("div", {
            className: "contact-grid",
            children: [
              (0, s.jsxs)("div", {
                className: "contact-details",
                children: [
                  (0, s.jsx)("span", {
                    className: "eyebrow",
                    children: "ПРИМЕР КОНТАКТНЫХ ДАННЫХ",
                  }),
                  (0, s.jsx)("h2", { children: "LegacyLab Fitness" }),
                  (0, s.jsxs)("dl", {
                    children: [
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("dt", { children: "Адрес · вымышленный" }),
                          (0, s.jsx)("dd", {
                            children: "Город N, улица Прогресса, 12",
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("dt", {
                            children: "Время работы · пример",
                          }),
                          (0, s.jsx)("dd", { children: config.hours }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("dt", {
                            children: "Телефон · не действует",
                          }),
                          (0, s.jsx)("dd", { children: "+7 (000) 000-00-00" }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("dt", {
                            children: "Email · не действует",
                          }),
                          (0, s.jsx)("dd", {
                            children: "club@example.invalid",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)(Button, {
                    to: "/booking",
                    children: "Попробовать запись",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "map-mock",
                role: "img",
                "aria-label":
                  "Условная схема квартала. Не является картой реального местоположения",
                children: [
                  (0, s.jsx)("div", { className: "map-road road-1" }),
                  (0, s.jsx)("div", { className: "map-road road-2" }),
                  (0, s.jsx)("div", { className: "map-road road-3" }),
                  (0, s.jsx)("div", { className: "map-block block-1" }),
                  (0, s.jsx)("div", { className: "map-block block-2" }),
                  (0, s.jsx)("div", { className: "map-block block-3" }),
                  (0, s.jsxs)("div", {
                    className: "map-pin",
                    children: [
                      (0, s.jsx)(Id, { size: 25 }),
                      (0, s.jsx)("strong", { children: "LegacyLab" }),
                    ],
                  }),
                  (0, s.jsx)("span", {
                    className: "map-label",
                    children: "УСЛОВНАЯ СХЕМА · НЕ РЕАЛЬНЫЙ АДРЕС",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "section shell",
        children: [
          (0, s.jsx)(SectionHead, {
            num: "01",
            kicker: "ПЕРВЫЙ ВИЗИТ",
            title: "Начни спокойно.",
          }),
          (0, s.jsx)("div", {
            className: "terms-grid",
            children: [
              [
                "01",
                "Выбери время",
                "Пробная тренировка — удобный способ познакомиться с пространством и тренером.",
              ],
              [
                "02",
                "Подготовься",
                "Возьми форму, чистую сменную обувь, воду и приезжай за 10–15 минут до занятия.",
              ],
              [
                "03",
                "Оставь место планам",
                "Если не получается прийти, отмени запись в демо-кабинете минимум за 2 часа.",
              ],
            ].map(([e, l, a]) =>
              (0, s.jsxs)(
                "div",
                {
                  children: [
                    (0, s.jsx)("span", {
                      className: "eyebrow accent",
                      children: e,
                    }),
                    (0, s.jsx)("h3", { children: l }),
                    (0, s.jsx)("p", { children: a }),
                  ],
                },
                e,
              ),
            ),
          }),
        ],
      }),
      (0, s.jsx)(FAQ, {}),
    ],
  });
}
function Legal({ privacy: e = !1 }) {
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)(PageIntro, {
        kicker: "ИНФОРМАЦИЯ",
        title: e ? "О личных данных." : "Правила и условия.",
        children:
          "Документы демонстрационного сайта LegacyLab Fitness. Дата редакции: 25 октября 2026 года.",
      }),
      (0, s.jsxs)("article", {
        className: "shell legal section-tight",
        children: [
          e
            ? (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsx)("h2", { children: "Какие данные сохраняются" }),
                  (0, s.jsx)("p", {
                    children:
                      "Если вы подтвердите согласие в форме, имя, телефон, email, комментарий, выбранные занятия и тариф будут сохранены в localStorage вашего браузера. Комментарий необязателен. Не указывайте в нём сведения о здоровье или другие чувствительные данные.",
                  }),
                  (0, s.jsx)("h2", { children: "Где находятся данные" }),
                  (0, s.jsx)("p", {
                    children:
                      "Сайт не отправляет заявки сотрудникам клуба, в CRM или почтовые сервисы. Серверного аккаунта и синхронизации между устройствами нет. Любой человек с доступом к тому же профилю браузера может открыть демо-кабинет.",
                  }),
                  (0, s.jsx)("h2", { children: "Удаление и изменение" }),
                  (0, s.jsx)("p", {
                    children:
                      "Профиль можно изменить в демо-кабинете. Для удаления записей и профиля используйте «Удалить демо-данные» в кабинете или очистите данные этого сайта в браузере. После удаления восстановить их с сервера нельзя.",
                  }),
                  (0, s.jsx)("h2", { children: "Техническая инфраструктура" }),
                  (0, s.jsx)("p", {
                    children:
                      "Страницы и изображения обслуживаются Cloudflare. При обращении к сайту инфраструктура получает технические данные запроса, включая IP-адрес. Сторонняя аналитика и рекламные пиксели не подключены. Фотографии и шрифты размещены вместе с сайтом.",
                  }),
                  (0, s.jsx)("h2", { children: "Ограничения демонстрации" }),
                  (0, s.jsx)("p", {
                    children:
                      "Это описание поведения данного примера, а не политика действующего юридического лица. Перед запуском настоящего клуба владелец должен настроить обработку данных и подготовить документы под реальные условия.",
                  }),
                ],
              })
            : (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsx)("h2", { children: "Гостевое посещение" }),
                  (0, s.jsx)("p", {
                    children:
                      "Выберите пробную тренировку, направление, день и время. Подготовьте удобную форму, чистую обувь и воду. Рекомендуем приходить за 10–15 минут. Представленные тренировки — фитнес-программы, не медицинские услуги.",
                  }),
                  (0, s.jsx)("h2", { children: "Расписание и отмена" }),
                  (0, s.jsx)("p", {
                    children:
                      "В расписании показана демонстрационная неделя. Время клуба — UTC+5. Полные, отменённые и начавшиеся занятия недоступны для записи. Свободные места изменяются только с учётом записей в этом браузере: это не реальные остатки и не общий сервис бронирования.",
                  }),
                  (0, s.jsx)("p", {
                    children:
                      "Отменить демонстрационную запись можно минимум за 2 часа до начала в кабинете. Повторная отмена не меняет количество свободных мест.",
                  }),
                  (0, s.jsx)("h2", { children: "Тарифы и оплата" }),
                  (0, s.jsx)("p", {
                    children:
                      "Цены указаны в рублях для примера. Деньги не списываются, карточные данные не запрашиваются. Выбранный тариф не является приобретённым абонементом. Автопродления и скрытых платежей нет.",
                  }),
                  (0, s.jsx)("h2", {
                    id: "demo",
                    children: "Демонстрационный статус",
                  }),
                  (0, s.jsx)("p", {
                    children:
                      "LegacyLab Fitness — концептуальный проект. Действующий клуб, юридическое лицо, реальные контакты, тренеры и отзывы не представлены. Фотографии сгенерированы с помощью ИИ. Профили, опыт, цены, расписание и отзывы вымышлены и служат для демонстрации интерфейса.",
                  }),
                  (0, s.jsx)("p", {
                    children:
                      "Форма сохраняет данные в браузере; она не отправляет заявку администратору. Не используйте этот пример для реальной записи и не приезжайте по указанному вымышленному адресу.",
                  }),
                ],
              }),
          (0, s.jsx)(TextLink, {
            to: "/account",
            children: "Открыть демо-кабинет",
          }),
        ],
      }),
    ],
  });
}
function NotFound() {
  return (0, s.jsx)("div", {
    className: "shell section",
    children: (0, s.jsx)(Empty, {
      title: "Этот маршрут ещё не открыт.",
      text: "Страница не найдена. Вернитесь на главную или выберите занятие в расписании.",
      to: "/",
      button: "На главную",
    }),
  });
}

export {
  Bb,
  s,
  DirectionCards,
  TrainerCards,
  PlanCards,
  SchedulePreview,
  Home,
  Club,
  Training,
  TrainingDetail,
  Trainers,
  TrainerDetail,
  Plans,
  Contacts,
  Legal,
  NotFound,
};
