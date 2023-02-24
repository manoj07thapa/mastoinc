import { Course, GetCourseQuery } from "@/types/amplifyCodegen/codegenTypes";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Home from "../dashboard/create/multiStepCourseCreate/Home";

type EditModalProps = {
    isOpen: boolean,
    closeModal: () => void
    course: GetCourseQuery
}

export default function CourseEditModal({
    course,
    isOpen,
    closeModal
}: EditModalProps) {
    console.log('COURSE', course);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-slate-800 rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-slate-200"
                                    >
                                        Edit Course
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <Home course={course} closeModal={closeModal} />
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
