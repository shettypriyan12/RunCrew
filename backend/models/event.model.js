import * as Yup from 'yup';

export const eventModel = Yup.object({
    category: Yup.string()
        .required('Category is required')
        .min(1, 'Category must be at least 1 characters long')
        .max(100, 'Category must be at most 50 characters long'),
});