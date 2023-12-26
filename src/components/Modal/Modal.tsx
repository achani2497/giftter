import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { Fragment, useRef } from 'react'

export function Modal({ open, setOpen, children }: { open: boolean, setOpen: any, children: JSX.Element }) {

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative flex flex-col h-fit transform p-4 overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full">
                                <div className='flex justify-end w-full'>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        <XMarkIcon className='text-black h-8 w-8' />
                                    </button>
                                </div>

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}