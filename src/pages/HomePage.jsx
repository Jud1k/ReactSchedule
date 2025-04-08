import Layout from "../components/Layout/Layout.jsx";
import ScheduleLesson from "../components/ScheduleLesson.jsx";
import ScheduleMenu from '../components/ScheduleMenu.jsx'
export default function HomePage(){
    return (
    <Layout>
        <ScheduleMenu/>
        <ScheduleLesson/>
    </Layout>
    )
}