import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import Select from "react-select";
import { useState } from 'react';

export default function UserAdd({ unit_options, position_options }) {
    const [unit, setUnit] = useState(null);
    const [positions, setPositions] = useState(null);
    const { data, setData, post, errors, processing, recentlySuccessful, reset } =
        useForm({
            name: '',
            username: '',
            password: '',
            unit_id: null,
            position_ids: [],
            join_date: null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('users'));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Karyawan
                </h2>
            }
        >
            <Head title="Tambah Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section className="max-w-xl">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="username" value="Username" />

                                    <TextInput
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        className="mt-1 block w-full"
                                        required
                                        onChange={(e) => setData('username', e.target.value)}
                                    />

                                    <InputError message={errors.username} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="unit" value="Unit" />

                                    <input type="hidden" name="unit_id" id="unit_id" value={data.unit_id || ""} />
                                    <Select
                                        value={unit}
                                        placeholder="Pilih Unit"
                                        closeMenuOnSelect={true}
                                        options={unit_options}
                                        onChange={(x) => {
                                            setUnit(x);
                                            setData('unit_id', x.value);
                                        }}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />

                                    <InputError message={errors.unit_id} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="position" value="Jabatan" />

                                    <input type="hidden" name="position_ids" id="position_ids" value={data.position_ids || ""} />
                                    <Select
                                        value={positions}
                                        isMulti
                                        placeholder="Pilih Jabatan"
                                        closeMenuOnSelect={true}
                                        options={position_options}
                                        onChange={(x) => {
                                            setPositions(x);
                                            let positionIds = [];
                                            if (x.length) {
                                                for (let i = 0; i < x.length; i++) {
                                                    positionIds.push(x[i].value);
                                                }
                                            }

                                            setData('position_ids', positionIds);
                                        }}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />

                                    <InputError message={errors.position_ids} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="join_date" value="Tanggal Join" />

                                    <input type="date" id="join_date" name="join_date" onChange={(e) => setData('join_date', e.target.value)}/>

                                    <InputError message={errors.join_date} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
