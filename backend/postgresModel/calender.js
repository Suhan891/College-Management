

// const days = `CREATE TYPE day_of_week AS ENUM (
//     'Monday', 'Tuesday', 'Wednesday',
//     'Thursday', 'Friday', 'Saturday', 'Sunday'
// );`

// const academic_calender = `CREATE TABLE academic_calendars (
//     calendar_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     college_id UUID REFERENCES colleges(college_id) ON DELETE CASCADE,

//     academic_year VARCHAR(20) NOT NULL,
//     start_date DATE NOT NULL,
//     end_date DATE NOT NULL,

//     working_days day_of_week[] NOT NULL,

//     is_active BOOLEAN DEFAULT TRUE,

//     UNIQUE(college_id, academic_year)
// );`


// const day_status = `CREATE TYPE day_status_enum AS ENUM (
//     'WORKING',
//     'HOLIDAY'
// );`
// // Real logic
// const specific_date = `CREATE TABLE calendar_day_exceptions (
//     calendar_id UUID REFERENCES academic_calendars(calendar_id) ON DELETE CASCADE,

//     specific_date DATE NOT NULL,

//     day_status day_status_enum NOT NULL,

//     specific_day day_of_week NOT NULL,

//     reason TEXT,
//     created_by UUID REFERENCES users(user_id),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//     PRIMARY KEY (calendar_id, specific_date),

// );`
