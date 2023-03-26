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
import { Member } from '../../../../pages/member';
import CustomTextInput from '../../../components/CustomInput';

interface ICreateMemberModal {
    isOpen: boolean;
    onClose: () => void;
    member: Member;
}

const EditMemberModal: React.FC<ICreateMemberModal> = ({ isOpen, onClose, member }) => {
    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    Edit member
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <CustomTextInput className="mb-2" label="Name" value={member.name} />
                    <CustomTextInput className="mb-2" label="Mobile Number" value={member.mobile_number} />
                    <CustomTextInput className="mb-2" label="NID" value={member.nid_number} />
                    <CustomTextInput className="mb-2" label="Guardian Name" value={member.guardian_name} />
                    <CustomTextInput className="mb-2" label="Serial Number" value={member.serial_number} />
                    <CustomTextInput className="mb-2" label="Team" value={member.team} />
                    <CustomTextInput className="mb-2" label="Branch" value={member.branch} />
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button onClick={onClose}>Close</Button>
                    <Button colorScheme={'brand'}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditMemberModal;
