import CustomTextInput from '@/components/CustomInput';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ICreateMemberModal {
    isOpen: boolean;
    onClose: () => void;
}

interface MemberObject {
    name: string;
    mobile_number: string;
    nid_number: string;
    guardian_name: string;
    gender: string;
    serial_number: number;
    team: number;
}

const CreateMemberModal: React.FC<ICreateMemberModal> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const teamId = router.query.teamId;

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onChange' });

    //execution post request
    const memberCreatingMethod = async (values: MemberObject) => {
        const data = {
            name: values.name,
            mobile_number: values.mobile_number,
            nid_number: values.nid_number,
            guardian_name: values.guardian_name,
            gender: values.gender,
            serial_number: parseInt(values.serial_number),
            // team: values.team,
            team: teamId,
        };

        const postData = await http.post(`/api/v1/peoples/members/`, data);
        return postData;
    };

    //useMuation here to create a member
    const { mutate, status } = useMutation(memberCreatingMethod, {
        onSuccess: (data) => {
            showNotification('Members has created successfully', 'Success', 'success');
            queryClient.invalidateQueries('members');
        },
        onError: (error) => {
            showNotification(`${error}`, 'Error', 'error');
        },
    });

    //onsubmit executing this function
    const createMember = (values: MemberObject) => {
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
                    Create new member
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(createMember)}>
                    <ModalBody>
                        <CustomTextInput className="mb-2" label="Name" {...register('name')} />
                        <CustomTextInput className="mb-2" label="Mobile Number" {...register('mobile_number')} />
                        <CustomTextInput className="mb-2" label="NID" {...register('nid_number')} />
                        <CustomTextInput className="mb-2" label="Guardian Name" {...register('guardian_name')} />
                        <CustomTextInput className="mb-2" label="Serial Number" {...register('serial_number')} />
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

export default CreateMemberModal;
