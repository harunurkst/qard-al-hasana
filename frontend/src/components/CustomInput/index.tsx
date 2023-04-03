import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { forwardRef, useId } from 'react';

interface ICustomTextInput extends InputProps {
    className?: string;
    label?: string;
    error?: boolean;
    helperText?: string;
}

const CustomTextInput: React.FC<ICustomTextInput> = forwardRef<HTMLInputElement, ICustomTextInput>(
    ({ className, label, error, helperText, ...rest }, ref) => {
        const uid = useId();
        return (
            <FormControl id={`${name}-${uid}`} className={className}>
                {label ? (
                    <FormLabel htmlFor={uid + name} className="mb-1.5 block text-sm font-medium text-gray-700">
                        {label}
                    </FormLabel>
                ) : null}
                <Input
                    ref={ref}
                    aria-invalid={error}
                    id={uid + name}
                    {...rest}
                    background={'white'}
                    focusBorderColor="brand.500"
                />
                {helperText ? (
                    error ? (
                        <FormErrorMessage>{helperText}</FormErrorMessage>
                    ) : (
                        <FormHelperText>{helperText}</FormHelperText>
                    )
                ) : null}
            </FormControl>
        );
    }
);

CustomTextInput.displayName = 'CustomTextInput';

export default CustomTextInput;
