

const subject = `
    CREATE TABLE subject (
    subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_name VARCHAR(255),
    department_id UUID REFERENCES departments(department_id)
);
`
// Subjects with a specific class
const classSubject = `
    CREATE TABLE class_subjects (
    class_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(class_id),
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id)
);
`