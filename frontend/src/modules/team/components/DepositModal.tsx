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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import { showNotification } from '@/utils/messages';

interface IDepositModal {
    isOpen: boolean;
    onClose: () => void;
}
interface DepositFormType {
    amount: number;
}
interface DepositSubmitDataType {
    member: number | undefined;
    amount: number;
    date: string;
}

const DepositModal: React.FC<IDepositModal> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<string | null>(null);
    const selectedMember = useMemberSavingsStore((state) => state.selectedMember);

    // const queryClient = useQueryClient();
    // useEffect(()=>{
    //     console.log('selectedMember',selectedMember)
    // },[selectedMember])
    // useEffect(()=>{
    //     console.log('date',date)
    // },[date])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DepositFormType>({ mode: 'onChange' });

    const postRequest = async (payload: DepositSubmitDataType) => {
        const response = await http.post(`/api/v1/transaction/deposit/`, payload);
        return response.data;
    };
    const queryClient = useQueryClient();
    const { mutate, isLoading, error } = useMutation(postRequest, {
        onSuccess: () => {

            showNotification(
                `সঞ্চয় জমা হয়েছে ${selectedMember?.member_name}`,
                'Sucess',
                'success'
            );
            // showAlert({
            //     title: 'Deposit Successful!',
            //     text: ` সঞ্চয় জমা হয়েছে, ${selectedMember?.member_name}, মোট সঞ্চয় ${tempSubmittingData.amount} টাকা`,
            // });
            queryClient.invalidateQueries(['memberSaving']);
        },
        onError: (error) => {
            // alert(error);
            showAlert({
                title: 'Not Successful',
                text: `${error}`,
                icon: 'error',
            });
        },
    });

    //team creation modal handling
    const onSubmit = (values: DepositSubmitDataType) => {


        const tempSubmittingData = {
            member: selectedMember?.member_id,
            amount: values.amount,
            date: date,
        };
        mutate(tempSubmittingData, { onSuccess: () => reset() });

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
                    <h2>সঞ্চয় জমা</h2>
                    <dt>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">নাম: {selectedMember?.member_name}</dd>
                        </dl>
                        <dl className="flex gap-3">
                            <dd className=" text-sm">সঞ্চয় পরিমান: {selectedMember?.balance}</dd>
                            <dd className=" text-sm">সদস্য নাম্বার: {selectedMember?.sl}</dd>
                        </dl>
                    </dt>
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
                            সঞ্চয় জমা দিন
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default DepositModal;
