import { FormikConfig, FormikValues, FormikHelpers } from 'formik';
import { array, number, object, string, } from 'yup';
import { Storage, API } from "aws-amplify";
import { createCourse, updateCourse } from '../../../../src/graphql/mutations'
import { FormikStepper } from "./FormikStepper";
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import { MultipleFileUploadField } from '@/components/upload/MultiFileUploadField';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { GetCourseQuery } from '@/types/amplifyCodegen/codegenTypes';


const courseInfoSchema = object({
    title: string().required().min(6),
    subtitle: string().required().min(6),
    language: string().required(),
    price: number().required(),
    duration: string().required(),
    time: string().required(),
    level: string().required(),
    tutor: string().required(),
    ownerEmail: string().email().required(),
    tutorWho: string().required(),
    category: string().required(),
    framework: string().required()

})
const prerequisiteSchema = object({
    relatedSkills: array().of(string().required("related skill is required")),
    prerequisites: array().of(string().required("prerequisite is required")),
    courseObjectives: array().of(string().required("Course Objective is required")),

})
const syllabusSchema = object().shape({
    syllabus: array()
        .of(
            object().shape({
                topic: string().min(10, 'topic must contain at least 10 charachers').required('Topic is required').required(), // these constraints take precedence
                description: string().min(15, 'description must be at least 15 characters'), // these constraints take precedence
                duration: string().required(), // these constraints take precedence
            })
        )

})

const imageUpoadSchema = object().shape({
    images: array().of(string().required())

})
type HomeProps = {
    course?: GetCourseQuery,
    closeModal?: () => void
}

function Home({ course, closeModal }: HomeProps) {
    const userContext = useContext(UserContext)
    const { query } = useRouter()
    console.log('QUERYROUTER', query);
    const image = course?.getCourse?.images
    console.log('courseimage', image);


    const initialValues = {
        title: course ? course.getCourse?.title : "",
        subtitle: course ? course.getCourse?.subtitle : "",
        language: course ? course.getCourse?.language : "",
        price: course ? course.getCourse?.price : 0,
        duration: course ? course.getCourse?.duration : "",
        level: course ? course.getCourse?.level : "",
        time: course ? course.getCourse?.time : "",
        tutor: course ? course.getCourse?.tutor : "",
        ownerEmail: userContext?.user?.attributes.email,
        tutorWho: course ? course.getCourse?.tutorWho : "",
        category: course ? course.getCourse?.category : "",
        framework: course ? course.getCourse?.framework : "",
        relatedSkills: course ? course.getCourse?.relatedSkills : [""],
        prerequisites: course ? course.getCourse?.prerequisites : [""],
        courseObjectives: course ? course.getCourse?.courseObjectives : [""],
        syllabus: course ? course.getCourse?.syllabus : [{ topic: "", description: "", duration: "" }],
        images: course ? course.getCourse?.images : [""]
    }

    const editCourse = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        console.log('EDITEDVALUES', values);
        values.id = course?.getCourse?.id
        try {
            //uploading the image to s3 one at a time with the file name as the key
            const imageKeys = await Promise.all(
                values.images.map(async (file: File) => {
                    const key = await Storage.put(file.name, file);
                    return key.key;
                })
            );
            values.images = imageKeys;
            const res = await API.graphql({
                query: updateCourse,
                variables: { input: values },
                authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            if (res && closeModal) {
                console.log('coursEditres', res);
                closeModal()
                // actions.resetForm()
            }
        } catch (error) {
            console.log('COURSEEDITERROR', error);

        }

    }

    const publishCourse = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        try {
            //uploading the image to s3 one at a time with the file name as the key
            const imageKeys = await Promise.all(
                values.images.map(async (file: File) => {
                    const key = await Storage.put(file.name, file);
                    return key.key;
                })
            );
            values.images = imageKeys;
            const res = await API.graphql({
                query: createCourse,
                variables: { input: values },
                authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            if (res) {
                console.log('coursecreationres', res);
                // actions.resetForm()
            }
        } catch (error) {
            console.log('coursecreationerror', error);

        }

    }

    const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        if (course) {
            await editCourse(values, actions)
        } else {
            await publishCourse(values, actions)

        }


        // if (values.images.length === 0) return
        // try {
        //     //uploading the image to s3 one at a time with the file name as the key
        //     const imageKeys = await Promise.all(
        //         values.images.map(async (file: File) => {
        //             const key = await Storage.put(file.name, file);
        //             return key.key;
        //         })
        //     );
        //     values.images = imageKeys;
        //     const res = await API.graphql({
        //         query: createCourse,
        //         variables: { input: values },
        //         authMode: "AMAZON_COGNITO_USER_POOLS",
        //     });
        //     if (res) {
        //         console.log('coursecreationres', res);


        //         // actions.resetForm()

        //     }
        // } catch (error) {
        //     console.log('coursecreationerror', error);

        // }

    }

    return (
        <FormikStepper
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {/**step1 */}
            <FormikStep label="Course Info" validationSchema={courseInfoSchema} >
                <StepOne />
            </FormikStep>
            {/**step2 */}
            <FormikStep label="Prerequisite and related skills" validationSchema={prerequisiteSchema}>
                <StepTwo />
            </FormikStep>
            {/**step 3 */}
            <FormikStep label="Syllabus" validationSchema={syllabusSchema}>
                <StepThree />
            </FormikStep>
            {/**step4  */}
            <FormikStep label="CourseImage" validationSchema={imageUpoadSchema}>
                <MultipleFileUploadField />
            </FormikStep>
            <FormikStep label="Preview" >
                Preview
            </FormikStep>
        </FormikStepper>

    );
}

export default Home



export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string;

}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}


