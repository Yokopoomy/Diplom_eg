import React from "react";

export default function Home() {
  return (
    <div className="mainpage">
      <div className="page bb">
        <h1 className="page-title">Дипломный проект на курсе «Fullstack-разработчик на JavaScript»</h1>
        <p className="page-subtitle">Сайт-агрегатор просмотра и бронирования гостиниц</p>

        <section className="page-section">
          <h2 className="section-title">Цель проекта</h2>
          <p className="section-text">
            Цель дипломного проекта - разработать фронтенд- и бэкенд-части для сайта-агрегатора с реализацией возможности бронирования гостиниц на диапазон дат. Проект подытожит навыки, которые вы получили в рамках прохождения курса, этот проект вы сможете добавить в свое портфолио разработчика.
          </p>
        </section>

        <section className="page-section">
          <h2 className="section-title">Что вы разработаете</h2>
          <ul className="section-list">
            <li>Пользовательский интерфейс</li>
            <li>Публичный API</li>
            <li>API пользователя</li>
            <li>API администратора</li>
            <li>Чат консультанта</li>
          </ul>
        </section>
      </div>
    </div>
  );
}