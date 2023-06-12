import CustomDatePicker from '@/components/CustomDatePicker/CustomDatePicker';
import CustomTextInput from '@/components/CustomInput';
import http from '@/utils/http';
import { showAlert } from '@/utils/sweatalert';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import { useMemberInstallmentsStore } from '../stores/useMemberInstallmentsStore';

interface IInstallmentModal {
    isOpen: boolean;
    onClose: () => void;
}
interface InstallmentFormType {
    amount: number;
}
interface InstallmentSubmitDataType {
    amount: number;
    date: string;
    loan: number | undefined;
}

const InstallmentModal: React.FC<IInstallmentModal> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<string | null>(null);
    const selectedMember = useMemberInstallmentsStore((state) => state.selectedMember);
    // const queryClient = useQueryClient();
    useEffect(() => {
        console.log('selectedMember', selectedMember);
    }, [selectedMember]);
    // useEffect(()=>{
    //     console.log('date',date)
    // },[date])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InstallmentFormType>({ mode: 'onChange' });

    const postRequest = async (payload: InstallmentSubmitDataType) => {
        const response = await http.post(`/api/v1/transaction/loan-installment/`, payload);
        return response.data;
    };
    const queryClient = useQueryClient();
    const { mutate, isLoading, error } = useMutation(postRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['memberInstallments']);
        },
        // onError: (error) => {
        //     console.error("Failed to deposit:", error);
        // },
    });

    //team creation modal handling
    const onSubmit = (values: InstallmentSubmitDataType) => {
        // console.log('values: ', values);
        const tempSubmittingData = {
            loan: selectedMember?.loan_id,
            amount: values.amount,
            date: date,
        };
        mutate(tempSubmittingData);

        showAlert({
            title: 'Deposit Successful!',
            text: `কর্জের কিস্তি জমা হয়েছে, ${selectedMember?.member_name}, কর্জ  ${tempSubmittingData.amount} টাকা`,
        });
        onClose();
    };

    // const onSubmit = async (values: IDepositType) => {
    //     const payload = {
    //         member: selectedMember?.member_id,
    //         amount: values.amount,
    //         date: date,
    //     };
    //     try {
    //         const result = await mutation.mutateAsync(payload);
    //         console.log(result);
    //     } catch (error) {
    //         console.log('Failed to deposit:', error);
    //     }
    // };

    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    className="font-noto text-xl font-semibold text-brand-800"
                    borderBottom={1}
                    borderBottomColor="red.100"
                >
                    কর্জের কিস্তি
                </ModalHeader>
                <ModalCloseButton />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        {/* <h2 className="font-nikosh text-xl font-semibold text-brand-800">
                            {selectedMember?.member_name}
                        </h2> */}
                        <CustomDatePicker label="তারিখ" setDate={setDate} />

                        <CustomTextInput
                            className="mt-2.5"
                            label="পরিমান"
                            error={errors.amount?.message}
                            {...register('amount')}
                            type="number"
                        />
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Button onClick={onClose}>Close</Button>
                        <Button colorScheme={'brand'} isLoading={isSubmitting} type="submit">
                            কিস্তি জমা দিন
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default InstallmentModal;
