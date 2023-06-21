import CustomDatePicker from '@/components/CustomDatePicker/CustomDatePicker';
import CustomTextInput from '@/components/CustomInput';
import CustomSelectInput from '@/components/CustomSelect';
import { BranchAddExpensePayloadType } from '@/types/incomeExpense.type';
import http from '@/utils/http';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface IExpensseModal {
    isOpen: boolean;
    onClose: () => void;
}

const ExpenseModal: React.FC<IExpensseModal> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BranchAddExpensePayloadType>({ mode: 'onChange' });

    const postRequest = async (payload: BranchAddExpensePayloadType) => {
        const response = await http.post(`/api/v1/transaction/expense/`, payload);
        return response.data;
    };
    const queryClient = useQueryClient();
    const { mutate, isLoading, error } = useMutation(postRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['branchExpense']);
        },
        onError: (error) => {
            console.error('Failed to deposit:', error);
        },
    });

    //team creation modal handling
    const onSubmit = (values: BranchAddExpensePayloadType) => {
        console.log('values: ', values);
        const data: BranchAddExpensePayloadType = {
            ...values,
            date: date,
        };
        const onSuccessCallback = () => {
            onClose();
            Swal.fire({
                icon: 'success',
                title: 'Expense Added Successfully',
            }).then(() => {
                reset();
            });
        };
        mutate(data, {
            onSuccess: onSuccessCallback,
        });
    };
    const categoryOptions = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '1' },
        { label: 'Option 3', value: '1' },
    ];
    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    className="font-noto text-xl font-semibold text-brand-800"
                    borderBottom={1}
                    borderBottomColor="red.100"
                >
                    Add Expense
                </ModalHeader>
                <ModalCloseButton />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <CustomTextInput
                            className="mt-2.5"
                            label="Amount"
                            error={errors.amount?.message}
                            {...register('amount')}
                            type="number"
                        />
                        <>{console.log('errors: ', { ...register('category') })}</>
                        <CustomDatePicker label="Date" setDate={setDate} />
                     

                        <CustomSelectInput
                            className="mt-2.5"
                            label={'Category'}
                            {...register('category')}
                            options={categoryOptions}
                        />
                        <CustomTextInput
                            className="mt-2.5"
                            label="Summary"
                            error={errors.summary?.message}
                            {...register('summary')}
                            type="text"
                        />
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Button onClick={onClose}>Close</Button>
                        <Button colorScheme={'brand'} isLoading={isSubmitting} type="submit">
                            Add Expense
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ExpenseModal;
