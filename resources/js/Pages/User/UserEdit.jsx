import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Select from "react-select";
import { format } from 'date-fns';

export default function UserEdit({ employee, unit_options, position_options, user_positions }) {
    let positionArr = employee.positions;
    if (positionArr && positionArr.length > 0) {
        positionArr = positionArr.map(item => item.value);
    } else {
        positionArr = [];
    }

    const [unit, setUnit] = useState(employee.unit);
    const [positions, setPositions] = useState(employee.positions);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, patch, delete: destroy, errors, processing, recentlySuccessful } =
        useForm({
            name: employee.name,
            unit_id: employee.unit?.value ?? null,
            position_ids: positionArr,
            join_date: format(employee.join_date, 'yyyy-MM-dd'),
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('users.update', employee));
    };

    const del = (e) => {
        e.preventDefault();
        destroy(route('users.destroy', employee));
    };

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Unit
                </h2>
            }
        >
            <Head title="Edit Unit" />

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

                                    <input type="date" id="join_date" name="join_date" value={data.join_date} onChange={(e) => setData('join_date', e.target.value)} />

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
                        <section className={`space-y-6 mt-4 max-w-xl`}>
                            <DangerButton onClick={confirmUserDeletion} disabled={processing}>
                                Delete Karyawan
                            </DangerButton>

                            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                                <form onSubmit={del} className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Are you sure you want to delete this data?
                                    </h3>
                                    <div className="mt-6 flex justify-end">
                                        <SecondaryButton onClick={closeModal}>
                                            Cancel
                                        </SecondaryButton>

                                        <DangerButton className="ms-3" disabled={processing}>
                                            Delete Karyawan
                                        </DangerButton>
                                    </div>
                                </form>
                            </Modal>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
