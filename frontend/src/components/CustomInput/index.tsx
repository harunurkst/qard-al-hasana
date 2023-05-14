import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { forwardRef, useId } from 'react';

interface ICustomTextInput extends InputProps {
    className?: string;
    label?: string;
    error?: boolean | string;
    helperText?: string;
}

const CustomTextInput: React.FC<ICustomTextInput> = forwardRef<HTMLInputElement, ICustomTextInput>(
    ({ className, label, error, helperText, name, ...rest }, ref) => {
        const uid = useId();
        return (
            <FormControl isInvalid={!!error} id={`${name}-${uid}`} className={className}>
                {label ? (
                    <FormLabel htmlFor={uid + name} className="mb-1.5 block text-sm font-medium text-gray-700">
                        {label}
                    </FormLabel>
                ) : null}
                <Input
                    ref={ref}
                    aria-invalid={!!error}
                    id={uid + name}
                    background={'white'}
                    name={name}
                    focusBorderColor="brand.500"
                    {...rest}
                />
                <FormHelperText>{helperText}</FormHelperText>
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        );
    }
);

CustomTextInput.displayName = 'CustomTextInput';

export default CustomTextInput;
