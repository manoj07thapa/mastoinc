import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from "next/router";
import { getCourse, listCourses } from '@/src/graphql/queries';
import { CourseProps } from '../../../../types/types';
import { withSSRContext, Storage } from 'aws-amplify';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import CourseContainer from '@/components/course/CourseContainer';
import { GetCourseQuery, Course } from '../../../../src/API';
import { CourseType } from '../../../../types/amplifyCodegen/APITypes';

export const getStaticPaths: GetStaticPaths = async () => {
    const SSR = withSSRContext();

    const { data } = await SSR.API.graphql({
        query: listCourses,
    });

    const items = data.listCourses.items
    const paths = items.map((course: any) => ({
        params: {
            id: course.id,
            category: course.category,
            framework: course.framework,
        },
    }));
    return {
        fallback: true,
        paths,
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const SSR = withSSRContext();
    try {
        const { data } = (await SSR.API.graphql({
            query: getCourse,
            variables: {
                id: params?.id
            },
        })) as { data: GetCourseQuery };
        if (!data) {
            return {
                notFound: true,
            }
        }
        const ssgCourse = data.getCourse
        return {
            props: {
                ssgCourse
            },
            revalidate: 100,
        };

    } catch (error) {
        return {
            props: {
                ssgCourse: []
            }

        };
    }


}

const SingleCourse = ({ ssgCourse }: { ssgCourse: CourseType }) => {
    const router = useRouter()
    const [courseImageUrl, setCourseImageUrl] = useState<string[] | []>([]);

    const fetchCourseImageUrl = useCallback(async () => {
        try {
            if (ssgCourse.images) {
                const imageUrls = await Promise.all(
                    ssgCourse.images.map(async (image) => {
                        const img = await Storage.get(image)
                        return img
                    })
                )
                setCourseImageUrl(imageUrls)
            }
        } catch (error) {

        }

    }, [ssgCourse]);

    useEffect(() => {
        fetchCourseImageUrl();
    }, [fetchCourseImageUrl, router, ssgCourse]);

    if (router.isFallback) {
        return (
            <div >
                Loading
            </div>
        );
    }
    return (
        <>
            <Head>
                <title>{`${ssgCourse.title} `}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {(ssgCourse && courseImageUrl.length) ? <CourseContainer ssgCourse={ssgCourse} courseImages={courseImageUrl} /> : "Loading..."}

        </>
    );
}
export default SingleCourse;