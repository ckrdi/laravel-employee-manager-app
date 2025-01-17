import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function UserIndex({ employees }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Karyawan
                </h2>
            }
        >
            <Head title="Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center justify-between pb-6">
                            <h3 className="text-xl font-semibold leading-tight text-gray-800">
                                Karyawan
                            </h3>
                            <Link href={route('users.create')}>
                                <PrimaryButton>Tambah</PrimaryButton>
                            </Link>
                        </div>

                        {employees && employees.length > 0 ? <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border-2">No</th>
                                    <th className="py-2 border-2">Nama</th>
                                    <th className="border-2">Username</th>
                                    <th className="py-2 border-2">Unit</th>
                                    <th className="py-2 px-16 border-2">Jabatan</th>
                                    <th className="py-2 border-2">Tanggal Join</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {employees.map((employee, idx) => (
                                    <tr key={employee.id}>
                                        <td className="px-2 py-1 border-2">{++idx}</td>
                                        <td className="px-2 py-1 border-2">{employee.name}</td>
                                        <td className="px-2 py-1 border-2">{employee.username}</td>
                                        <td className="px-2 py-1 border-2">{employee.unit_name ?? "-"}</td>
                                        <td className="px-2 py-1 border-2">
                                            {employee.positions && employee.positions.length > 0 ? <>
                                                <ul>
                                                    {employee.positions.map(pos => (
                                                        <li key={pos.value}>- {pos.label}</li>
                                                    ))}
                                                </ul>
                                            </> : <span>-</span>}
                                        </td>
                                        <td className="px-4 py-1 border-2">{employee.join_date != null ? format(employee.join_date, 'dd/MM/yyyy') : "-"}</td>
                                        <td className="px-2 py-1">
                                            <Link href={route('users.edit', employee)}>
                                                <PrimaryButton>Edit</PrimaryButton>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <h4 className="text-xl font-semibold leading-tight text-gray-800 pb-8">Tidak ada data karyawan.</h4>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
