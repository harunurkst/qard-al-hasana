import CustomTextInput from '@/components/CustomInput';
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
import React from 'react';
import { useForm } from 'react-hook-form';
// import { Member } from '../../../../pages/member';

interface IEditMemberModal {
    isOpen: boolean;
    onClose: () => void;
    // member: Member;
    member: object;
}

const EditMemberModal: React.FC<IEditMemberModal> = ({ isOpen, onClose, member }) => {
    //handling put request of member
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const editSubmission = (values) => {
        console.log('submitted values:', values);
        // onClose()
    };
    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    Edit member
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(editSubmission)}>
                    <ModalBody>
                        <CustomTextInput className="mb-2" label="Name" value={member?.name} {...register('name')} />
                        <CustomTextInput
                            className="mb-2"
                            label="Mobile Number"
                            value={member?.mobile_number}
                            {...register('mobile_number')}
                        />
                        <CustomTextInput
                            className="mb-2"
                            label="NID"
                            value={member?.nid_number}
                            {...register('nid_number')}
                        />
                        <CustomTextInput
                            className="mb-2"
                            label="Guardian Name"
                            value={member?.guardian_name}
                            {...register('guardian_name')}
                        />
                        <CustomTextInput
                            className="mb-2"
                            label="Serial Number"
                            value={member?.serial_number}
                            {...register('serial_number')}
                        />
                        <CustomTextInput className="mb-2" label="Team" value={member?.team} {...register('team')} />
                        <CustomTextInput
                            className="mb-2"
                            label="Branch"
                            value={member?.branch}
                            {...register('branch')}
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

export default EditMemberModal;
