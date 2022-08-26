import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";

import Dashboard from "@/components/Dashboard";
import Modal from "@/components/Modal";

const removeConnectionTitle = "Apakah anda yakin?";
const removeConnectionContent = "Anda akan menghapus data ini.";

const columnHelper = createColumnHelper();

export default function RegisterCard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchStatus = useRef(false);

  axios.defaults.baseURL = "https://rfid-card-identifier`.herokuapp.com/api";

  const handleRemoveCardConnection = (e) => {
    if (!code) {
      toast.error("Kode kartu tidak boleh kosong!");
      return;
    }

    toast.promise(
      axios
        .delete(`/card/remove?code=${code}`)
        .then(() => {
          axios.get("/student/all-pair").then((res) => setData(res.data.data));
        })
        .finally(() => setOpen(false)),
      {
        loading: "Loading",
        success: "Data berhasil dihapus",
        error: (err) => err?.message ?? "Terjadi kesalahan saat menghapus data",
      }
    );
  };

  const showConfirmationModal = (e) => {
    setCode(e.target.getAttribute("data-code"));
    setOpen(true);
  };

  const renderRemoveConnectionButton = (value) => {
    return (
      <button
        type='button'
        onClick={(e) => showConfirmationModal(e)}
        data-code={value}
        className='inline-flex items-center px-4 py-2 text-sm font-medium border-2 rounded-md shadow-sm text-primary border-primary hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700'
      >
        Hapus
      </button>
    );
  };

  const columns = [
    columnHelper.accessor("nim", {
      cell: (info) => info.getValue(),
      header: "NIM",
    }),
    columnHelper.accessor("student.name", {
      cell: (info) => info.getValue(),
      header: "Nama",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue() ?? "-",
      header: "Kode Kartu",
    }),
    columnHelper.accessor("id", {
      cell: (info) => renderRemoveConnectionButton(info.getValue()),
      header: "Aksi",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (fetchStatus.current) return;

    toast.promise(
      axios.get("/student/all-pair").then((res) => setData(res.data.data)),
      {
        loading: "Loading",
        success: "Data berhasil diambil",
        error: (err) => err?.message ?? "Terjadi kesalahan saat mengambil data",
      }
    );

    fetchStatus.current = true;
  }, []);

  return (
    <>
      <Head>
        <title>Registrasi Kartu Baru</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Dashboard title='Registrasi Kartu Baru'>
        <main>
          <h2 className='mb-4'>Tabel Data Mahasiswa dan Kartu</h2>
          <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      {table.getHeaderGroups().map((headerGroup, idx) => (
                        <tr key={headerGroup.id}>
                          <th
                            key='no'
                            scope='col'
                            className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                          >
                            No
                          </th>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              scope='col'
                              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {data.length == 0 && !isLoading ? (
                        <tr>
                          <td
                            colSpan={5}
                            className='px-6 py-4 text-sm font-bold text-center text-red-500 whitespace-nowrap'
                          >
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        table.getRowModel().rows.map((row, idx) => (
                          <tr
                            key={row.id}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td
                              key='no'
                              className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'
                            >
                              {idx + 1}
                            </td>
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <Modal
                    open={open}
                    setOpen={setOpen}
                    title={removeConnectionTitle}
                    content={removeConnectionContent}
                    action={handleRemoveCardConnection}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </Dashboard>
    </>
  );
}
