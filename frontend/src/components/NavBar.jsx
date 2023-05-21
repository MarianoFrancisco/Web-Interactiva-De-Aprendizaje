import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { ROLES } from "../App";
import useLogout from "../hooks/useLogout";

let navigation = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();
  if (auth?.roles?.includes(ROLES.Admin)) {
    navigation = [];
    navigation.push(
      { name: "Crear Usuario", href: "/new-employee", current: false },
      { name: "Usuarios", href: "/users", current: false },
      { name: "Reportes", href: "#", current: false }
    );
  } else if (auth?.roles?.includes(ROLES.Delivery)) {
    navigation = [];
    // Opción adicional para el rol de entrega
    navigation.push(
      {
        name: "Productos",
        href: "/",
        current: false,
      },
      {
        name: "Pedidos",
        href: "/orders",
        current: false,
      }
    );
  } else if (auth?.roles?.includes(ROLES.User)) {
    navigation = [];
    // Opción adicional para el rol de entrega
    navigation.push(
      {
        name: "Nuevo Producto",
        href: "/product-form",
        current: false,
      },
      {
        name: "Mis Productos",
        href: "/profile/products",
        current: false,
      },
      {
        name: "Mis Pedidos",
        href: "/orders",
        current: false,
      }
    );
  }

  const signOut = async () => {
    await logout();
    navigate("/");
    navigation = [];
  };
  return (
    <Disclosure as="nav" className="bg-emerald-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-emerald-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    <FontAwesomeIcon icon={faXmark} className="block h-6 w-6" />
                  ) : (
                    // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={"/"} className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/logo.png"
                    alt="Gamificacion"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/logo.png"
                    alt="Gamificacion"
                  />
                  <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Gamificacion
                  </h1>
                </NavLink>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-emerald-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
                      <span className="sr-only">Open user menu</span>
                      {/* <UserCircleIcon className="w-7 flex-shrink-0 text-white" /> */}
                      <FontAwesomeIcon
                        icon={faUser}
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
                      {auth?.username ? (
                        <>
                          <h3 className="px-4 py-2 text-sm font-bold border-b border-gray-200">
                            {auth.fullname}
                          </h3>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Mi perfil
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={signOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "w-full text-left block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Cerrar sesión
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/login"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Iniciar sesión
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
