import * as Yup from 'yup';

export const userModel = Yup.object({

        name: Yup.string()
                .required('Name is required')
                .min(1, 'Name must be at least 1 characters long'),
        email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
        phone: Yup.string()
                .max(15, 'Phone number must be at most 15 characters long')
                .notRequired()
                .nullable(),
        password: Yup.string()
                .required('Password is required')
                .min(8, 'Need more characters')
                .max(20, 'Password cannot exceed 20 characters'),
        role: Yup.string()
                .oneOf(['user', 'admin'], 'Role must be either user or admin')
                .default('user'),
});