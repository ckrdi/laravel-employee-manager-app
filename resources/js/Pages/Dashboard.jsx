import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';

export default function Dashboard({ employee_sum, unit_sum, position_sum, login_sum, top_logins }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!

                            <div>Jumlah Karyawan: {employee_sum} </div>
                            <div>Jumlah login anda: {login_sum}</div>
                            <div>Jumlah unit: {unit_sum}</div>
                            <div>Jumlah jabatan: {position_sum}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-xl font-semibold leading-tight text-gray-800 pb-8">
                            Top 10 user logins
                        </h3>
                        {top_logins.length > 0 ? <table className="table-auto border-2">
                            <thead>
                                <tr>
                                    <th className="border-2">Username</th>
                                    <th className="py-2 border-2">Name</th>
                                    <th className="border-2">Logins</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {top_logins.map(top_login => (
                                    <tr key={top_login.id}>
                                        <td className="px-8 py-1 border-2">{top_login.username}</td>
                                        <td className="px-8 py-1 border-2">{top_login.name}</td>
                                        <td className="px-8 py-1 border-2">{top_login.login_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <h4 className="text-xl font-semibold leading-tight text-gray-800 pb-8">No login data.</h4>}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
