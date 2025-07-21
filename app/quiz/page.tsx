// pages/index.tsx
'use client';
import { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const questions: Question[] = [
  {
    q: 'Как зовут двух друзей в начале серии?',
    options: ['Эрен и Микаса', 'Армин и Кристиана', 'Ханджи и Леви'],
    answer: 0,
  },
  {
    q: 'Как называется стена, которую видят вначале?',
    options: ['Стена Роза', 'Стена Мария', 'Стена Сина'],
    answer: 1,
  },
  {
    q: 'Что Эрен чувствует перед появлением Титана?',
    options: [
      'Сновидение о звонке колокола',
      'Боль в ноге',
      'Успокоение',
    ],
    answer: 0,
  },
  {
    q: 'Какое животное держат под стеной?',
    options: ['Козу', 'Павлина', 'Свинью'],
    answer: 0,
  },
  {
    q: 'Кто спасает жителей во время атаки?',
    options: [
      'Никто — паника и хаос',
      'Разведкорпус',
      'Ариман-Энслинг',
    ],
    answer: 0,
  },
  {
    q: 'Чем солдаты пытаются остановить Титана?',
    options: ['Пушки и ружья', 'Луки со стрелами', 'Лазги из металла'],
    answer: 0,
  },
  {
    q: 'Что случается с мамой Эрена?',
    options: [
      'Её похищает Титан — Эрен в истерике',
      'Она убегает',
      'Её спасают',
    ],
    answer: 0,
  },
  {
    q: 'Как называется город у основания Стены Мария?',
    options: ['Трост', 'Шиганшина', 'Кинджи'],
    answer: 0,
  },
  {
    q: 'Какое снаряжение используют герои?',
    options: [
      'ODM‑gear (оборудование вертикального маневрирования)',
      'Реактный джетпак',
      'Зонтики',
    ],
    answer: 0,
  },
  {
    q: 'Что решают герои после атаки?',
    options: [
      'Вступить в разведкорпус и уничтожить титанов',
      'Уехать за стены',
      'Заняться земледелием',
    ],
    answer: 0,
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const current = questions[step];

  const handleChoose = (idx: number) => {
    if (idx === current.answer) setScore(prev => prev + 1);
    setStep(prev => prev + 1);
  };

  if (step >= questions.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded p-6 max-w-md w-full text-center">
          <h1 className="text-2xl mb-4">Квиз завершён!</h1>
          <p className="text-xl">
            Ваш счёт: {score} из {questions.length}
          </p>
          {score === questions.length ? (
            <p className="mt-4 text-green-600">Поздравляю! Отличный результат</p>
          ) : (
            <p className="mt-4 text-red-600">Можно лучше! Попробуйте снова.</p>
          )}
          <button
            onClick={() => {
              setStep(0);
              setScore(0);
            }}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Пройти снова
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded p-6 max-w-md w-full">
        <h2 className="text-xl mb-4">
          Вопрос {step + 1} из {questions.length}
        </h2>
        <p className="mb-6">{current.q}</p>
        <div className="flex flex-col space-y-3">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoose(i)}
              className="px-4 py-2 border rounded hover:bg-blue-50"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
