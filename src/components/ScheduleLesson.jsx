
export default function ScheduleLesson(){
    return (
            <div className="card w-96 bg-base-100 shadow-sm card-lg ">
                <div className="card-body">
                    <h2 className="card-title">Название пары</h2>
                    <h1>Аудитория</h1>
                    <p>Препод</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-success">Практика/лекция</div>
                    </div>
                </div>
            </div>
    )
}
