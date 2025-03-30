import ScheduleLesson from "../components/ScheduleLesson"
import ScheduleMenu from "../components/ScheduleMenu"
import Layout from "../components/Layout/Layout"

export default function SchedulePage() {
  return (
    <Layout>
    <div className="flex min-h-screen items-start justify-around ml-52">
      {/* Основной контейнер для двух компонентов */}
      <div className="flex items-center gap-8">
          <ScheduleLesson />
          <ScheduleMenu />
      </div>
    </div>
    </Layout>
  )
}