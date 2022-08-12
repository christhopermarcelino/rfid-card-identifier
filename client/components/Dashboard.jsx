import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuAlt2Icon,
  XIcon,
  PresentationChartLineIcon,
  DocumentAddIcon,
  DatabaseIcon,
} from "@heroicons/react/outline";

import { classNames } from "@/libs/helpers";

const navigation =
  process.env.NODE_ENV === "production"
    ? [
        {
          name: "Data Statistik",
          href: "/",
          icon: PresentationChartLineIcon,
          current: true,
        },
      ]
    : [
        {
          name: "Data Statistik",
          href: "/",
          icon: PresentationChartLineIcon,
          current: true,
        },
        {
          name: "Registrasi Kartu",
          href: "/register-card",
          icon: DocumentAddIcon,
          current: false,
        },
        {
          name: "Data Kartu",
          href: "/data-card",
          icon: DatabaseIcon,
          current: false,
        },
      ];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Dashboard({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 z-40 flex md:hidden'
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex items-center flex-shrink-0 px-4'>
                <img
                  className='w-auto mx-auto h-9'
                  src='/images/logo.jpg'
                  alt='Polines'
                />
              </div>
              <div className='flex-1 h-0 mt-5 overflow-y-auto'>
                <nav className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-4 h-6 w-6"
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className='p-4 space-y-4'>
                <img
                  src='/images/profile1.jpg'
                  alt='Profile 1'
                  className='mx-auto rounded-md h-72'
                />
                <img
                  src='/images/profile2.jpg'
                  alt='Profile 2'
                  className='mx-auto rounded-md h-72'
                />
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-1 h-0'>
            <div className='flex items-center flex-shrink-0 h-16 px-4 bg-gray-900'>
              <img
                className='w-auto mx-auto h-9'
                src='/images/logo.jpg'
                alt='Polines'
              />
            </div>
            <div className='flex flex-col flex-1 overflow-y-auto bg-gray-800'>
              <nav className='flex-1 px-2 py-4 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 h-6 w-6"
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className='p-4 space-y-4'>
                <img
                  src='/images/profile1.jpg'
                  alt='Profile 1'
                  className='h-64 mx-auto rounded-md'
                />
                <img
                  src='/images/profile2.jpg'
                  alt='Profile 2'
                  className='h-64 mx-auto rounded-md'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 w-0 overflow-hidden'>
        <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
          <button
            className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt2Icon className='w-6 h-6' aria-hidden='true' />
          </button>
          <div className='flex justify-between flex-1 px-4'>
            <div className='flex items-center flex-1'>
              <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>
            </div>
            <div className='flex items-center ml-4 md:ml-6'>
              <button className='p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='sr-only'>View notifications</span>
                <BellIcon className='w-6 h-6' aria-hidden='true' />
              </button>

              {/* Profile dropdown */}
              {process.env.NODE_ENV === "production" && (
                <Menu as='div' className='relative ml-3'>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className='flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='w-8 h-8 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items
                          static
                          className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}
            </div>
          </div>
        </div>

        <main className='relative flex-1 overflow-y-auto focus:outline-none'>
          <div className='py-6'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
              {children}
            </div>
          </div>
        </main>
        <footer className='px-8 py-2'>
          <p className='text-lg text-gray-700 text-end'>
            Copyright &copy; 2022. Rancang Bangun Sistem Kendali Portal Parkir
            Menggunakan Middle Range RFID Reader Berbasis Internet Of Things
          </p>
        </footer>
      </div>
    </div>
  );
}
