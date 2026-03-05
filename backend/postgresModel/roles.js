


// const student = `
//     CREATE TABLE IF NOT EXISTS students (
//     student_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
//     college_id UUID REFERENCES colleges(college_id) NOT NULL,

//     enrollment_number INT NOT NULL,
//     registered_roll_number INT NOT NULL,
//     session VARCHAR(100),

//     current_year INT,
//     current_semester INT,
//     current_roll VARCHAR(5),

//     class_id INT REFERENCES class(class_id) NOT NULL,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//      PRIMARY KEY(college_id, student_id)
//     );
// `

// const teacher = `
//     CREATE TABLE IF NOT EXISTS teachers (
//     teacher_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,

//     college_id INT REFERENCES college(college_id) NOT NULL,
//     registered_batch_number INT NOT NULL,

//     department_id INT REFERENCES departments(department_id) NOT NULL,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

//      PRIMARY KEY(college_id, teacher_id)
// `