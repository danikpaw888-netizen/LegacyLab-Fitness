import { directions } from "./data.js";
import { trainers } from "./data.js";
import { addDays } from "./data.js";
import { plans } from "./data.js";
import { config } from "./data.js";
var emptyStore = () => ({
    version: 1,
    profile: { name: "", email: "", phone: "" },
    planId: "trial",
    bookings: [],
  }),
  times = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:30",
    "20:00",
    "21:00",
  ],
  startsAt = (e, l) => new Date(e + "T" + l + ":00+05:00").getTime();
function validateDraft(e, l, a = Date.now()) {
  let d = {};
  ((e.name.trim().length < 2 || e.name.trim().length > 80) &&
    (d.name = "Укажите имя: от 2 до 80 символов."),
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim()) ||
      e.email.length > 160) &&
      (d.email = "Проверьте адрес электронной почты."));
  let t = e.phone.replace(/\D/g, "");
  ((t.length < 10 || t.length > 15) &&
    (d.phone = "Укажите телефон: от 10 до 15 цифр."),
    directions.some((i) => i.id === e.direction) ||
      (d.direction = "Выберите направление."));
  if (
    e.trainer &&
    !trainers.some(
      (t) => t.id === e.trainer && t.directions.includes(e.direction),
    )
  )
    d.trainer = "Выберите тренера этого направления.";
  let c = new Date(e.date + "T12:00:00Z");
  return (
    (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) ||
      !Number.isFinite(c.getTime()) ||
      c.toISOString().slice(0, 10) !== e.date ||
      e.date < l ||
      e.date > addDays(l, 90)) &&
      (d.date = "Выберите дату в ближайшие 90 дней."),
    times.includes(e.time)
      ? !d.date &&
        startsAt(e.date, e.time) <= a &&
        (d.time = "Это время уже прошло. Выберите другое.")
      : (d.time = "Выберите время."),
    e.comment.length > 1e3 &&
      (d.comment = "Комментарий — не более 1000 символов."),
    e.consent ||
      (d.consent = "Нужно согласие на сохранение данных в этом браузере."),
    d
  );
}
function seatsLeft(e, l) {
  return Math.max(
    0,
    e.seats -
      l.bookings.filter((a) => a.sessionId === e.id && a.status === "confirmed")
        .length,
  );
}
function confirmBooking(e, l, a) {
  let d = e.bookings.find((u) => u.id === a.id);
  if (d) return { store: e, booking: d };
  let t = validateDraft(l, a.today, a.now);
  if (Object.keys(t).length) throw new Error(Object.values(t)[0]);
  let c = a.session;
  if (c) {
    if (c.cancelled || seatsLeft(c, e) < 1 || startsAt(c.date, c.time) <= a.now)
      throw new Error(
        "На это занятие запись недоступна. Выберите другое время.",
      );
    if (
      l.date !== c.date ||
      l.time !== c.time ||
      l.direction !== c.direction ||
      l.trainer !== c.trainer
    )
      throw new Error(
        "Параметры занятия изменились. Выберите его в расписании ещё раз.",
      );
    if (
      e.bookings.some((u) => u.sessionId === c.id && u.status === "confirmed")
    )
      throw new Error(
        "Вы уже записаны на это занятие. Запись есть в демо-кабинете.",
      );
  }
  if (!plans.some((u) => u.id === a.planId))
    throw new Error("Выберите действующий демонстрационный тариф.");
  let i = {
    ...l,
    name: l.name.trim(),
    email: l.email.trim(),
    phone: l.phone.trim(),
    comment: l.comment.trim(),
    id: a.id,
    status: "confirmed",
    createdAt: new Date(a.now).toISOString(),
    sessionId: c?.id ?? "",
    planId: a.planId,
  };
  return {
    store: {
      ...e,
      profile: { name: i.name, email: i.email, phone: i.phone },
      planId: a.planId,
      bookings: [i, ...e.bookings],
    },
    booking: i,
  };
}
function cancelBooking(e, l, a = Date.now()) {
  let d = e.bookings.find((t) => t.id === l);
  if (!d || d.status === "cancelled") return e;
  if (startsAt(d.date, d.time) - a < 7200 * 1e3)
    throw new Error(
      "Отмена доступна не позднее чем за 2 часа до начала. Это демонстрационное правило клуба.",
    );
  return {
    ...e,
    bookings: e.bookings.map((t) =>
      t.id === l ? { ...t, status: "cancelled" } : t,
    ),
  };
}
function parseStore(e) {
  if (!e) return emptyStore();
  let l = JSON.parse(e);
  if (
    !l ||
    typeof l != "object" ||
    !("version" in l) ||
    l.version !== 1 ||
    !("bookings" in l) ||
    !Array.isArray(l.bookings) ||
    !("profile" in l) ||
    !l.profile ||
    typeof l.profile != "object"
  )
    throw new Error("Saved data has an unsupported format.");
  let a = l;
  if (
    !["name", "email", "phone"].every((d) => typeof a.profile[d] == "string") ||
    !plans.some((d) => d.id === a.planId)
  )
    throw new Error("Invalid profile.");
  if (
    a.bookings.length > 500 ||
    a.bookings.some(
      (d) =>
        !d ||
        typeof d.id != "string" ||
        typeof d.date != "string" ||
        typeof d.time != "string" ||
        typeof d.name != "string" ||
        !directions.some((t) => t.id === d.direction) ||
        !["confirmed", "cancelled"].includes(d.status),
    )
  )
    throw new Error("Invalid bookings.");
  return a;
}
function readStore(e) {
  return parseStore(e.getItem(config.storageKey));
}
function writeStore(e, l) {
  e.setItem(config.storageKey, JSON.stringify(l));
}

export {
  emptyStore,
  times,
  startsAt,
  validateDraft,
  seatsLeft,
  confirmBooking,
  cancelBooking,
  parseStore,
  readStore,
  writeStore,
};
