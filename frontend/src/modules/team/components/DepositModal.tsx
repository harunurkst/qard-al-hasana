import CustomTextInput from '@/components/CustomInput';
import {  z } from 'zod';
import { depositSchema,depositFormSubmitSchema } from '@/schema/TeamSchema';
import zodSafeQuery from '@/utils/zodSafeQuery';
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
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import CustomDatePicker from '@/components/CustomDatePicker/CustomDatePicker';
import {  useState } from 'react';

interface IDepositModal {
    isOpen: boolean;
    onClose: () => void;
}
interface IDepositType {
    amount: number;
}

const DepositModal: React.FC<IDepositModal> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<string | null>(null);
    const selectedMember = useMemberSavingsStore((state) => state.selectedMember);
    const queryClient = useQueryClient();
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
    } = useForm<IDepositType>({ resolver: zodResolver(depositSchema) });

    const mutation = useMutation(
        zodSafeQuery<z.infer<typeof depositFormSubmitSchema>>(
            '/api/v1/transaction/deposit/', 
            {
                method: 'POST',
                payloadSchema: depositSchema,
                safeParse: true
            }
        ), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries('memberSaving');
            },
        }
    );
    const onSubmit = async (values: IDepositType) => {
        if (!selectedMember) return;
        const payload = depositSchema.parse({ ...values, member: selectedMember.member_id, date });
        console.log('values', payload);
        mutation.mutate(payload);
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
                <ModalHeader className='text-xl font-semibold text-brand-800 font-noto' borderBottom={1} borderBottomColor="red.100">
                    সঞ্চয় জমা
                </ModalHeader>
                <ModalCloseButton />

                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                    <h2 className='text-xl font-semibold text-brand-800 font-nikosh'>{selectedMember?.member_name}</h2>
                        <CustomDatePicker label="তারিখ" setDate={setDate}  />

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
