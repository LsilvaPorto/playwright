export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: 'Male' | 'FeMale';
    hobbies: string[];
    languages: string[];
    skills: string;
    country: string;
    dateOfBirth: {
        year: string;
        month: string;
        day: string;
    };
};
