import CustomTextInput from '@/components/CustomInput';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';

interface ICreateBranchModal {
    isOpen: boolean;
    onClose: () => void;
}

const CreateBranchModal: React.FC<ICreateBranchModal> = ({ isOpen, onClose }) => {
    return (
        <Modal size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={1} borderBottomColor="red.100">
                    Create new branch
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <CustomTextInput className="mb-2" label="Branch Name" />
                    <CustomTextInput label="Address" />
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button onClick={onClose}>Close</Button>
                    <Button colorScheme={'brand'}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateBranchModal;
