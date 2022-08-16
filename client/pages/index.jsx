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
import { bearerToken } from "@/libs/helpers";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("time", {
    cell: (info) => info.getValue(),
    header: "Waktu",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Nama",
  }),
  columnHelper.accessor("nim", {
    cell: (info) => info.getValue(),
    header: "NIM",
  }),
  columnHelper.accessor("code", {
    cell: (info) => info.getValue(),
    header: "Kode kartu",
  }),
];

export default function Home() {
  const { user } = useAuthState();
  const router = useRouter();
  const [data, setData] = useState(() => []);

  axios.defaults.baseURL = "https://rfid-card-identifier.herokuapp.com/api";

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && user === null) {
      router.replace("/signin");
    }

    axios
      .get("/activities", {}, { headers: { ...bearerToken() } })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => alert(err));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Dashboard title='Data Statistik'>
        <main>
          <div>
            <h2 className='mb-4'>Tabel Aktivitas</h2>
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
