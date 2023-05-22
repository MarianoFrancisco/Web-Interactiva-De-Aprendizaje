import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function GameDetail({
  details,
  clearDetails,
  removeFromDetails,
  name = "Detalles",
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex text-emerald-600 px-4"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faFile} className="block h-6 w-6" />
        {name}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {name}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="block h-6 w-6"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {details.map((detail, index) => (
                                <li key={detail.id} className="flex py-6">
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>{detail.name}</p>
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeFromDetails(detail)
                                          }
                                          className="font-medium text-emerald-600 hover:text-emerald-500"
                                        >
                                          <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="block h-6 w-6"
                                          />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeFromDetails(detail.id)
                                          }
                                          className="font-medium text-emerald-600 hover:text-emerald-500"
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            className="block h-6 w-6"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="mt-6 space-y-2">
                          <button
                            onClick={() => clearDetails()}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="block h-6 w-6"
                            />
                            {`Vaciar ${name}`}
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            o {}
                            <button
                              type="button"
                              className="font-medium text-emerald-600 hover:text-emerald-500"
                              onClick={() => setOpen(false)}
                            >
                              Continúa agregando
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
