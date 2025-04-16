
export default function HomePage() {
  return (
      <div className="flex flex-col justify-center gap-y-4">
        <h1 className="text-2xl text-center font-bold">
          Всем привет. Эта сайт с расписанием УГЛТУ. Пока еще делаю, потом
          сделаю.
        </h1>
        <a href="/schedule" className="btn btn-xl">
          Посмотреть расписание
        </a>
        <a href="/admin" className="btn btn-xl">
          Админка
        </a>
      </div>
  );
}
