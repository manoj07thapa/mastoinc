import Head from "next/head";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { ReactElement } from "react";
import { PageWithLayout } from "@/types/types";
import CreateResource from "@/components/dashboard/create/resource/CreateResource";
import { useRouter } from "next/router";


const Resource: PageWithLayout = ({ }) => {
    const { query } = useRouter()

    return (
        <>
            <Head>
                <title>{`Dashboard | ${query.param} Resource`}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="">
                {/* <div className="flex items-center justify-between px-4 py-3 rounded-md shadow bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"> */}
                <h2 className="text-xl font-bold tracking-wider uppercase ">
                    {query.param} resource
                </h2>
                {/* <CubeTransparentIcon className="w-6 h-6 text-pink-700" /> */}
                {/* </div> */}
                <div className="">
                    <CreateResource />
                </div>
            </div>
        </>
    );
}
// binding the page to the sidebatlayout
Resource.getLayout = function (page: ReactElement) {
    return (
        <SidebarLayout >
            <main>{page}</main>
        </SidebarLayout>
    )
}
export default Resource;