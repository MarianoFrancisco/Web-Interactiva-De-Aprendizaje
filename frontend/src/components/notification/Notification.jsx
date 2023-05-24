import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function Notification({ notifications = ['Not-1', 'Not-2'] }) {
    
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex rounded-full bg-emerald-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
                    <span className="sr-only">Notificaciones</span>
                    {/* <UserCircleIcon className="w-7 flex-shrink-0 text-white" /> */}
                    <FontAwesomeIcon
                        icon={faBell}
                        className="h-6 w-6 flex-shrink-0 text-white"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {notifications.map((notification, index) => (
                        <Menu.Item key={index}>
                            {({ active }) => (
                                <p
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                >
                                    {notification}
                                </p>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}