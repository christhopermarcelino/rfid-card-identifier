import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Dashboard from "@/components/Dashboard";
import { useAuthState } from "@/contexts/AuthContext";
import Modal from "@/components/Modal";

const columnHelper = createColumnHelper();

const removeConnectionTitle = "Apakah anda yakin?";
const removeConnectionContent =
  "Anda akan menghapus semua data tabel aktivitas.";

const columns = [
  columnHelper.accessor("time", {
    cell: (info) => info.getValue(),
    header: "Waktu",
  }),
  columnHelper.accessor("card.nim", {
    cell: (info) => info.getValue(),
    header: "NIM",
  }),
  columnHelper.accessor("card.student.name", {
    cell: (info) => info.getValue(),
    header: "Nama",
  }),
  columnHelper.accessor("card.name", {
    cell: (info) => info.getValue(),
    header: "Kode kartu",
  }),
];

export default function Home() {
  const { user } = useAuthState();
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && user === null) {
      router.replace("/signin");
    }
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://rfid-card-identifier.herokuapp.com/api/activities",
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  useEffect(() => {
    setTableData(data?.data ?? []);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleResetActivityTable = () => {
    setOpen(true);

    axios
      .delete("https://rfid-card-identifier.herokuapp.com/api/activities/reset")
      .then((res) => alert("Tabel berhasil direset"))
      .catch((err) => alert(err.message ?? "Erorr occurred."))
      .finally(() => setOpen(false));
  };

  return (
    <div>
      <Dashboard title='Data Statistik'>
        <main>
          <div>
            <div className='flex items-start justify-between mb-5'>
              <h2>Tabel Aktivitas</h2>
              <button
                type='button'
                onClick={() => setOpen(true)}
                className='inline-flex items-center px-4 py-2 text-sm font-medium border-2 rounded-md shadow-sm text-primary border-primary hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700'
              >
                Reset Tabel
              </button>
              <Modal
                open={open}
                setOpen={setOpen}
                title={removeConnectionTitle}
                content={removeConnectionContent}
                action={handleResetActivityTable}
              />
            </div>
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
                        {table.getRowModel().rows.map((row, idx) => (
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Dashboard>
    </div>
  );
}
