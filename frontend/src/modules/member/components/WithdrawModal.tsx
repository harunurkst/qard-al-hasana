import CustomTextInput from '@/components/CustomInput';
import { getFormattedCurrentDatetime } from '@/utils/datetime';
import http from '@/utils/http';
import { showNotification } from '@/utils/messages';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface ICreateWithdrawModal {
    isOpen: boolean;
    onClose: () => void;
    member: object | any;
}

interface WithdrawSchema {
    member: number;
    amount: number;
    date: string;
}

const WithdrawModal: React.FC<ICreateWithdrawModal> = ({ isOpen, onClose, member }) => {
    const queryClient = useQueryClient();
    //handle form submission with react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onChange' });

    const postRequest = (values: WithdrawSchema) => {
        const res = http.post(`/api/v1/transaction/withdraw/`, values);
        return res;
    };

    const { mutate } = useMutation(postRequest, {
        onSuccess: () => {
            showNotification('Your withdrawal has been done successfully', 'Success', 'success');
            queryClient.invalidateQueries('member');
        },
        onError: (error) => {
            // alert(error);
            showNotification(`${error}`, 'Error', 'error');
        },
    });

    const withdrawHandling = (values: WithdrawSchema) => {
        // const data = {
        //     ...values,
        // };
        const data = {
            member: member?.id,
            amount: parseInt(values?.amount),
            date: values?.date,
        };
        mutate(data, { onSuccess: () => reset() });
        onClose();
    };

    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    <h1>সঞ্চয় উঠানো</h1>
                    <dt>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">নাম: {member?.name},</dd>
                            <dd className=" text-sm">অভিভাবকের নাম: {member?.guardian_name}</dd>
                        </dl>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">দলের নাম: {member?.team},</dd>
                            <dd className=" text-sm">ক্রমিক নাম্বার: {member?.serial_number}</dd>
                        </dl>
                    </dt>
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(withdrawHandling)}>
                    <ModalBody>
                        <CustomTextInput
                            className="read-only: mb-2"
                            label="Member Name"
                            {...register('member')}
                            defaultValue={member?.id}
                            value={member?.name}
                        />
                        <CustomTextInput
                            label="Amount"
                            {...register('amount', { required: 'You must insert amount' })}
                        />
                        <p className=" text-red-700">{errors?.amount?.message}</p>
                        <CustomTextInput
                            className="mb-2"
                            label="Date"
                            type="date"
                            {...register('date')}
                            defaultValue={getFormattedCurrentDatetime().split('T')[0].trim()}
                        />
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Button onClick={onClose}>বন্ধ করুন</Button>
                        <Button colorScheme={'brand'} type="submit">
                            সঞ্চয় উঠান
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default WithdrawModal;
