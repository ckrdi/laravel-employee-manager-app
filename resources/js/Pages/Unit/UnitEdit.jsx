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

export default function UnitEdit({ unit }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, patch, delete: destroy, errors, processing, recentlySuccessful } =
        useForm({
            name: unit.name,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('units.update', unit));
    };

    const del = (e) => {
        e.preventDefault();
        destroy(route('units.destroy', unit));
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
                                            Data has been updated.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                        <section className={`space-y-6 mt-4 max-w-xl`}>
                            <DangerButton onClick={confirmUserDeletion} disabled={processing}>
                                Delete Unit
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
                                            Delete Unit
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
