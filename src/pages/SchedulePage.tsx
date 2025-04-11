import ScheduleLesson from "../components/ScheduleLesson";
import ScheduleMenu from "../components/ScheduleMenu";
import { Layout } from "../components/Layout/Layout";
import { useState } from "react";

export default function SchedulePage() {
  const [selectedGroupId, setSelectedGroupId] = useState<number | string>();
  const [selectedDayWeek, setSelectedDayWeek] = useState<number | null>(null);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Блок с расписанием (центр-лево) */}
          <div className="md:w-3/5 lg:w-2/3 md:pr-8">
            {selectedGroupId ? (
              <ScheduleLesson groupId={selectedGroupId} dayWeek={selectedDayWeek}/>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-center">
                  Выберите группу для отображения расписания
                </p>
              </div>
            )}
          </div>

          {/* Блок с меню (центр-право) */}
          <div className="md:w-2/5 lg:w-1/3 max-w-md mx-auto md:mx-0 sticky top-4">
            <div className="bg-base-100 p-6 rounded-xl shadow-sm">
              <ScheduleMenu onGroupSelect={setSelectedGroupId} onDaySelect={setSelectedDayWeek}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
