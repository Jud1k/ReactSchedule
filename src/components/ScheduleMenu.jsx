import "cally";

function ScheduleMenu(){
    return(
        <div className='gap-4'>
            <div className="dropdown dropdown-start ">
                <div tabIndex={0} role="button" className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box">Выберите группу⬇️</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>ИЦЭ-21</a></li>
                    <li><a>АИС-32</a></li>
                </ul>
            </div>
            <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
                <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                <calendar-month></calendar-month>
            </calendar-date>
        </div>
    )
}

export default ScheduleMenu


