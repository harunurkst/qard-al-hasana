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
// import { useEffect } from 'react';
import zodSafeQuery from '@/utils/zodSafeQuery';
import { useQuery } from '@tanstack/react-query';
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

interface StaffObject {
    id: number;
    branch: number;
    gender: string;
    guardian_name: string;
    is_active: boolean;
    mobile_number: string;
    name: string;
    nid_number: string;
    serial_number: number;
    team: number;
}
const CreateGroupModal: React.FC<ICreateGroupModal> = ({ isOpen, onClose }) => {
    const { data: session, status } = useSession();
    // console.log(session);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeamCreateData>({ mode: 'onChange' });

    //owner/staff get request handling function
    const { data, isFetching } = useQuery(['staffs'], async () => zodSafeQuery(`/api/v1/organization/staffs/`)());
    const staffList = data?.result?.results;

    //function creating post post request for create team. this will be called inside isMutation
    const postRequest = async (values: TeamCreateData) => {
        const data = {
            name: values.group_name,
            address: values.address,
            owner: values.owner_name,
        };

        const response = await http.post(`/api/v1/organization/teams/`, data);
        return response.data;
    };

    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: (data) => {
            alert('Successfully posted');
        },
        onError: () => {
            alert('There is an error');
        },
    });

    //team creation modal handling
    const CreateTeam = (values: TeamCreateData) => {
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
                                {staffList &&
                                    staffList.map((data: StaffObject) => (
                                        <option key={data.id} value={data.id}>
                                            {data.name}
                                        </option>
                                    ))}
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
