import * as yup from 'yup'

export const userInformationSchema = yup.object({
    firstname: yup.string()
        .required('This Is Required')
        .min(2, 'Name must be at least 3 characters')
        .max(20, 'Name cannot exceed 15 characters'),
    lastname: yup.string()
        .required('This Is Required')
        .min(2, 'Name must be at least 3 characters')
        .max(20, 'Name cannot exceed 15 characters'),
    restaurant: yup.string().required('This Is Required'),
    email: yup.string()
        .email()
        .required('Email Is Required'),
    phone: yup.string()
        .required('Phone Number Is Required')
        .min(11, 'Numbe must be at least 11 characters')
        .max(14, 'Number cannot exceed 14 characters')
})



export const userLocationSchema = yup.object({
    country: yup.string().required('Country name is requied'),
    city: yup.string().required('City/State name is required'),
    area: yup.string().required('Area name is required'),
    post: yup.number().required('Postel code is required')
})



export const profileAddRoleSchema = yup.object({
    addrole1: yup.string()
        .email()
        .required('Email Is Required'),
    addrole2: yup.string()
        .email()
        .required('Email Is Required')
})