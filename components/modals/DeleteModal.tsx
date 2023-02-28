import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type DeleteModalProps = {
    isOpen: boolean,
    closeModal: () => void
    deleteItem?: (userId: string) => void,
    userId?: string,
    removeImagesCourseUserCourses?: () => void,
}

export default function DeleteModal({
    isOpen,
    closeModal,
    deleteItem,
    userId,
    removeImagesCourseUserCourses
}: DeleteModalProps) {

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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Are you sure?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Deleting the course will permanently remove the course
                                            from database!!
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        {(userId && deleteItem) &&
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => {
                                                    deleteItem(userId);
                                                    closeModal();
                                                }}
                                            >
                                                Delete Anyway
                                            </button>
                                        }
                                        {(removeImagesCourseUserCourses) &&
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => {
                                                    removeImagesCourseUserCourses();
                                                    closeModal();
                                                }}
                                            >
                                                Delete Anyway
                                            </button>
                                        }

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