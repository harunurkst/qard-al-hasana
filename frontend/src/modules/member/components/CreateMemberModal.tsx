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
import CustomTextInput from '../../../components/CustomInput';

interface ICreateMemberModal {
    isOpen: boolean;
    onClose: () => void;
}

const CreateMemberModal: React.FC<ICreateMemberModal> = ({ isOpen, onClose }) => {
    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    Create new member
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <CustomTextInput className="mb-2" label="Name" />
                    <CustomTextInput className="mb-2" label="Mobile Number" />
                    <CustomTextInput className="mb-2" label="NID" />
                    <CustomTextInput className="mb-2" label="Guardian Name" />
                    <CustomTextInput className="mb-2" label="Serial Number" />
                    <CustomTextInput className="mb-2" label="Team" />
                    <CustomTextInput className="mb-2" label="Branch" />
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button onClick={onClose}>Close</Button>
                    <Button colorScheme={'brand'}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateMemberModal;
