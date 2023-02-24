import { UserContext } from "@/contexts/UserContext";
import { DeleteUserCoursesInput, GetCourseQuery, ListUserCoursesQuery } from "@/types/amplifyCodegen/codegenTypes";
import { API, withSSRContext } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { getCourseWithEnrollees } from '../../../../src/customGraphql/queries';
import CourseWithEnrollees from "@/components/dashboard/CourseWithEnrollees";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { PageWithLayout, UserProp } from "@/types/types";
import { listUserCourses } from "@/src/graphql/queries";
import { deleteUserCourses } from "@/src/graphql/mutations";
import { GetServerSideProps } from "next";

const TeacherCourse: PageWithLayout = ({ }) => {
    const { query } = useRouter()
    const [courseWithEnrollees, setcourseWithEnrollees] = useState<GetCourseQuery | undefined>(undefined)
    const userContext = useContext(UserContext);

    const fetchCourseUsers = useCallback(async () => {
        if (userContext?.user && query.course) {
            try {

                const res = (await API.graphql({
                    query: getCourseWithEnrollees,
                    variables: {
                        id: query.course
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS",
                })) as { data: GetCourseQuery };

                setcourseWithEnrollees(res.data);
            } catch (error) {
                console.log('Error', error);


            }
        }
    }, [query.course, userContext?.user]);

    useEffect(() => {
        fetchCourseUsers();
    }, [fetchCourseUsers]);

    const removeUserFromCourse = async (enrolleeId: string) => {

        const filter = {
            courseId: { eq: courseWithEnrollees?.getCourse?.id }, userId: { eq: enrolleeId }
        }
        try {
            const res = (await API.graphql({
                query: listUserCourses,
                variables: {
                    filter
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
            })) as { data: ListUserCoursesQuery };

            const userCoursesId = res.data.listUserCourses?.items.map(item => item?.id)

            if (userCoursesId) {
                const deleteRes = (await API.graphql({
                    query: deleteUserCourses,
                    variables: {
                        input: {
                            id: userCoursesId[0]
                        }
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS",
                })) as { data: DeleteUserCoursesInput }
                fetchCourseUsers()

            }

        } catch (error) {
            console.log('USERCOURSEDELETEERROR', error);
        }

    }


    return (
        <>
            <Head>
                <title>{`Dashboard | Course Detail`}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                {courseWithEnrollees && <CourseWithEnrollees courseWithEnrollees={courseWithEnrollees} removeUserFromCourse={removeUserFromCourse} />}

            </div>
        </>
    );
}

// binding the page to the sidebatlayout
TeacherCourse.getLayout = function (page: ReactElement) {
    return (
        <SidebarLayout >
            <main>{page}</main>
        </SidebarLayout>
    )
}
export default TeacherCourse;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const SSR = withSSRContext({ req });
    // await pageNotFound(SSR)

    try {
        const user: UserProp = await SSR.Auth.currentAuthenticatedUser();
        const userGroup = user?.signInUserSession?.accessToken?.payload["cognito:groups"]

        if ((!userGroup?.includes("admin")) && (!userGroup?.includes("teacher"))) {
            return {
                notFound: true,
            };
        }
    } catch (error) {
        if (error) {
            return {
                notFound: true,
            };
        }
    }

    return {
        props: {},
    };
}