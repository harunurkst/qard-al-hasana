import CustomTextInput from '@/components/CustomInput';
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
import { useMutation } from '@tanstack/react-query';
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
    console.log(session);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeamCreateData>({ mode: 'onChange' });

    //owner/staff get request handling function
    const getStaffList = () => {
        console.log('get request enforced');
    };

    //function creating post post request for create team. this will be called inside isMutation
    const postRequest = async (values: TeamCreateData) => {
        console.log('inside post Request', values);
        const data = {
            name: values.group_name,
            address: values.address,
            owner: 1,
        };

        const response = await http.post(`/api/v1/organization/teams/`, data);
        return response.data;
    };

    const { mutate, isLoading } = useMutation(postRequest);

    //team creation modal handling
    const CreateTeam = (values: TeamCreateData) => {
        console.log('values: ', values);
        const team = {
            ...values,
        };
        mutate(team);

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
                        <div className="w-full">
                            <label className="mb-1.5 block font-medium text-gray-700">Owner Name</label>
                            <select
                                className="border-gray-350 h-10 w-full rounded border bg-white"
                                {...register('owner_name')}
                            >
                                <option>Select One</option>
                                <option>Select 2</option>
                                <option>Select 3</option>
                            </select>
                        </div>
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
