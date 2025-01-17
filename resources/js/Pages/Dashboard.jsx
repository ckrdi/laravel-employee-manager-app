import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import InputLabel from '@/Components/InputLabel';

export default function Dashboard({ employee_sum, unit_sum, position_sum, login_sum }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minLogins, setMinLogins] = useState(25);
    const [topLogins, setTopLogins] = useState([]);

    const getTopLogins = async () => {
        const res = await axios.get('/dashboard/get_top_logins', {
            params: {
                start_date: startDate,
                end_date: endDate,
                min_logins: minLogins,
            }
        });

        setTopLogins(res.data.top_logins);
    }

    useEffect(() => {
        getTopLogins();
    }, []);

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
                        <h3 className="text-xl font-semibold leading-tight text-gray-800 pb-4">
                            Top 10 user logins
                        </h3>
                        <div className="flex items-end">
                            <div className="mr-3">
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <input type="date" value={startDate} onChange={(e) => {
                                    setStartDate(format(e.target.value, 'yyyy-MM-dd'));
                                }} />
                            </div>
                            <div className="mr-3">
                                <InputLabel htmlFor="end_date" value="End Date" className="mt-2" />
                                <input type="date" value={endDate} onChange={(e) => {
                                    setEndDate(format(e.target.value, 'yyyy-MM-dd'));
                                }} />
                            </div>
                            <div className="mr-3">
                                <InputLabel htmlFor="start_date" value="Login count" className="mt-2" />
                                <input type="number" value={minLogins} min="1" max="1000" onChange={(e) => {
                                    setMinLogins(e.target.value);
                                }} />
                            </div>

                            <PrimaryButton className="mr-3" onClick={() => {
                                setStartDate('');
                                setEndDate('');
                                setMinLogins(0);
                            }}>Clear Search</PrimaryButton>
                            <PrimaryButton onClick={() => getTopLogins()}>Search</PrimaryButton>
                        </div>

                        {topLogins && topLogins.length > 0 ? <table className="table-auto border-2 mt-4">
                            <thead>
                                <tr>
                                    <th className="border-2">Username</th>
                                    <th className="py-2 border-2">Name</th>
                                    <th className="border-2">Logins</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {topLogins.map(top_login => (
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
