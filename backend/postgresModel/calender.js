// Required to think more on this portion

const days = `CREATE TYPE day_of_week AS ENUM (
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
);`

const academic_calender = `CREATE TABLE academic_calendars (
    calendar_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID REFERENCES colleges(college_id) ON DELETE CASCADE,

    academic_year VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    working_days day_of_week[] NOT NULL,

    holidays day_of_week NOT NULL,
    holiday_date DATE[],

    is_active BOOLEAN DEFAULT TRUE,

    UNIQUE(college_id, academic_year)
);`
// const holiday = `CREATE TABLE holiday_events (
//     holiday_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     calendar_id UUID REFERENCES academic_calendars(calendar_id) ON DELETE CASCADE,
//     title VARCHAR(100) NOT NULL,
//     start_date DATE NOT NULL,
//     end_date DATE NOT NULL,
//     is_academic_holiday BOOLEAN DEFAULT TRUE, -- TRUE = no classes, FALSE = just a celebration
//     CHECK (end_date >= start_date)
// );
// `


const day_status = `CREATE TYPE day_status_enum AS ENUM (
    'WORKING',
    'HOLIDAY'
);`
// // Real logic
const specific_date = `CREATE TABLE calendar_day_exceptions (
    calendar_id UUID REFERENCES academic_calendars(calendar_id) ON DELETE CASCADE,

    specific_date DATE NOT NULL,

    day_status day_status_enum NOT NULL,

    special_day day_of_week NOT NULL,

    reason TEXT,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (calendar_id, specific_date),

);`

    // CHECK (
    //     (day_status = 'SPECIAL_SCHEDULE' AND follow_day IS NOT NULL)
    //     OR
    //     (day_status <> 'SPECIAL_SCHEDULE' AND follow_day IS NULL)
    // )