const colleges = `CREATE TABLE IF NOT EXISTS colleges (
    college_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_name VARCHAR(255) NOT NULL,
    established_year INT,
    college_logo VARCHAR(255),

    creator UUID REFERENCES users(user_id) ON DELETE CASCADE,

    location INT REFERENCES address(address_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);`

const address = `
    CREATE TABLE IF NOT EXISTS address (
        address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID REFERENCES college(college_id) ON DELETE CASCADE,

        latitude FLOAT,  -- this data will be based on the location acccess college will provide 
        longitude FLOAT, -- this data will be based on the location acccess college will provide 

        location TEXT,
        city VARCHAR(255),
        state VARCHAR(255),
        country VARCHAR(255),
        pincode INT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

const academic_calender = `CREATE TABLE academic_years (
    year_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year_label VARCHAR(20) NOT NULL, -- 2025-2026
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);`
const week_days = `CREATE TABLE weekly_working_days (
    weekly_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calendar_id UUID REFERENCES academic_calendars(calendar_id) ON DELETE CASCADE,
    day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Mon
    is_working BOOLEAN DEFAULT TRUE,
    UNIQUE(calendar_id, day_of_week)
);`