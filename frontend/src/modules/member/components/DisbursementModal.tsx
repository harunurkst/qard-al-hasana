import CustomTextInput from '@/components/CustomInput';
import { DisbursementSchema, DisbursementType } from '@/schema/AllModalSchema';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface ICreateDisbursementModal {
    isOpen: boolean;
    onClose: () => void;
    member: object | any;
}

const DisbursementModal: React.FC<ICreateDisbursementModal> = ({ isOpen, onClose, member }) => {
    const queryClient = useQueryClient();
    //handle form submission with react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DisbursementType>({
        resolver: zodResolver(DisbursementSchema),
    });

    const postRequest = (values: DisbursementType) => {
        const data = {
            amount: values.loan_amount,
            date: values.date,
            member: member.id,
            total_installment: values.installment_count,
        };
        const res = http.post(`/api/v1/transaction/loan-disbursment/`, data);
        return res;
    };

    const { mutate } = useMutation(postRequest, {
        onSuccess: () => {
            showNotification('Loan Disbursement has been done successfully');
            queryClient.invalidateQueries('member');
        },
        onError: (error) => {
            alert(error);
        },
    });

    const disbursementCreation = (values: DisbursementType) => {
        const data = {
            ...values,
        };
        mutate(data, { onSuccess: () => reset() });
        onClose();
    };

    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    <h1>Loan/Debt Disbursement To</h1>
                    <dt>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">Name: {member?.name},</dd>
                            <dd className=" text-sm">Guardian Name: {member?.guardian_name}</dd>
                        </dl>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">Team Name: {member?.team},</dd>
                            <dd className=" text-sm">Serial Number: {member?.serial_number}</dd>
                        </dl>
                    </dt>
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(disbursementCreation)}>
                    <ModalBody>
                        <CustomTextInput
                            className="mb-2"
                            label="Debt Amount"
                            error={errors.loan_amount?.message}
                            {...register('loan_amount')}
                        />
                        <CustomTextInput
                            className="mb-2"
                            label="Date"
                            type="date"
                            {...register('date')}
                            defaultValue={getFormattedCurrentDatetime().split('T')[0].trim()}
                        />
                        <CustomTextInput
                            label="Installment Count"
                            error={errors.installment_count?.message}
                            {...register('installment_count')}
                        />
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Button onClick={onClose}>Close</Button>
                        <Button colorScheme={'brand'} type="submit">
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default DisbursementModal;
