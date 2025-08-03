import * as Yup from 'yup';

export const contactModel = Yup.object({
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
    subject: Yup.string()
        .max(100, 'Subject must be at most 50 characters long')
        .notRequired()
        .nullable(),
    message: Yup.string()
        .required('Message is required')
        .min(1, 'Message must be at least 1 characters long')
        .max(500, 'Message must be at most 500 characters long'),
});