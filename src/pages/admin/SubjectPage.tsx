import { CreateSubject } from '@/features/subject/components/CreateSubject';
import { SubjectList } from '@/features/subject/components/SubjectList';

const SubjectPage = () => {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Редактирование предметов
          </h2>
          <p className="text-muted-foreground">
            Управляйте предметами и их деталями
          </p>
        </div>
        <CreateSubject />
      </div>
      <SubjectList />
    </>
  );
};

export default SubjectPage;
