import * as Yup from 'yup';

export const tagModel = Yup.object({
    cat_id: Yup.number()
        .required('Category ID is required'),
    event_id: Yup.number()
        .required('Event ID is required'),
    tag: Yup.string()
        .required('Tag is required')
        .min(1, 'Tag must be at least 1 characters long')
});