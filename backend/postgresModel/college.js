// const colleges = `CREATE TABLE IF NOT EXISTS colleges (
//     college_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
//     college_name VARCHAR(255) NOT NULL,
//     established_year INT,
//     college_logo VARCHAR(255),

//     creator UUID REFERENCES users(user_id) NOT NULL,

//     latitude FLOAT, -- as this data will mainly be required
//     longitude FLOAT,  -- as this data will be mainly required

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
// );`

// const address = `
//     CREATE TABLE IF NOT EXISTS address (
//         address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//         college_id UUID REFERENCES colleges(colleg_id) ON DELETE SET NULL, 

//         latitude FLOAT,  -- this data will be based on the location acccess college will provide 
//         longitude FLOAT, -- this data will be based on the location acccess college will provide 

//         location TEXT,
//         city VARCHAR(255),
//         state VARCHAR(255),
//         country VARCHAR(255),
//         pincode INT,

//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//     `;

