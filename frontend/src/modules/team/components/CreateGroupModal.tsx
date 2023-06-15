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
import { useForm } from 'react-hook-form';
interface ICreateGroupModal {
    isOpen: boolean;
    onClose: () => void;
}

interface TeamCreateData {
    group_name: string;
    address: string;
    owner_name: string;
}

const CreateGroupModal: React.FC<ICreateGroupModal> = ({ isOpen, onClose }) => {
    const { data: session, status } = useSession();
    const userId = session?.user?.user_id;
    const branchId = session?.user?.branch;

    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TeamCreateData>({ mode: 'onChange' });

    //function creating post post request for create team. this will be called inside isMutation
    const postRequest = async (values: TeamCreateData) => {
        const data = {
            name: values.group_name,
            address: values.address,
            owner: userId,
            branch: branchId,
        };

        const response = await http.post(`/api/v1/organization/teams/`, data);
        return response.data;
    };

    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: (data) => {
            showNotification('Team has created successfully');
        },
        onError: () => {
            alert('There is an error');
        },
        onSettled: () => {
            queryClient.invalidateQueries('teams');
        },
    });

    //team creation modal handling
    const CreateTeam = (values: TeamCreateData) => {
        const team = {
            ...values,
        };
        mutate(team, { onSuccess: () => reset() });

        onClose();
    };

    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    Create new group
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(CreateTeam)}>
                    <ModalBody>
                        <CustomTextInput className="mb-2" label="Group Name" {...register('group_name')} />
                        <CustomTextInput className="mb-2" label="Address" {...register('address')} />
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

export default CreateGroupModal;
