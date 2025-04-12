import  Calendar  from "../components/Calendar";
import { Layout } from "../components/Layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <h1 className="flex">Всем привет. Эта сайт с расписанием УГЛТУ. Пока еще делаю, потом сделаю.</h1>
        <a href="/schedule" className="btn btn-xl">Посмотреть расписание</a>
      </div>
    </Layout>
  );
}
