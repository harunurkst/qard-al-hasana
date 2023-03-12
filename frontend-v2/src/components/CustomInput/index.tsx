import { Input, InputProps } from '@chakra-ui/react';

interface ICustomTextInput extends InputProps {
    className?: string;
    label?: string;
}

const CustomTextInput: React.FC<ICustomTextInput> = ({ className, label, ...rest }) => {
    return (
        <div className={className}>
            {label ? <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label> : null}
            <Input {...rest} background={'white'} focusBorderColor="brand.500" />
        </div>
    );
};

export default CustomTextInput;
