import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function UnitIndex({ units }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Unit
                </h2>
            }
        >
            <Head title="Unit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center justify-between pb-6">
                            <h3 className="text-xl font-semibold leading-tight text-gray-800">
                                Unit
                            </h3>
                            <Link href={route('units.create')}>
                                <PrimaryButton>Tambah</PrimaryButton>
                            </Link>
                        </div>

                        {units && units.length > 0 ? <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border-2">No</th>
                                    <th className="py-2 border-2">Nama Unit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {units.map((unit, idx) => (
                                    <tr key={unit.id}>
                                        <td className="px-8 py-1 border-2">{++idx}</td>
                                        <td className="px-8 py-1 border-2">{unit.name}</td>
                                        <td className="px-8 py-1">
                                            <Link href={route('units.edit', unit)}>
                                                <PrimaryButton>Edit</PrimaryButton>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <h4 className="text-xl font-semibold leading-tight text-gray-800 pb-8">Tidak ada data unit.</h4>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
