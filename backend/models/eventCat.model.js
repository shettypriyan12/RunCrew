import * as Yup from 'yup';
// import { eventModel } from './event.model.js';

export const eventCatModel = Yup.object({
    cat_id: Yup.number()
        .required('Category ID is required'),
    name: Yup.string()
        .required('Name is required')
        .min(1, 'Name must be at least 1 characters long'),
    start: Yup.date()
        .required('Start date is required'),
    end: Yup.date()
        .required('End date is required'),
    cost: Yup.string()
        .required('Cost is required')
        .min(1, 'Cost must be at least 1 characters long'),
    img: Yup.string()
        .required('Image is required'),
    location: Yup.string()
        .required('Location is required'),
});

