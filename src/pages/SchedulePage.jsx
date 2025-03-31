import ScheduleLesson from "../components/ScheduleLesson"
import ScheduleMenu from "../components/ScheduleMenu"
import Layout from "../components/Layout/Layout"


export default function SchedulePage() {

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
         <div className="flex-1 max-w-1/3">
            <ScheduleLesson />
          </div>
        {/* Колонка с меню */}
        <div className="md:w-64 flex flex-col gap-4">
            <ScheduleMenu />
          </div>
      </div>
      </div>
    </Layout>
  );
}