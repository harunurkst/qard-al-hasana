import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select } from '@chakra-ui/react';
import { forwardRef, useId } from 'react';
type OptionType = { label: string; value: string | number };

interface ICustomSelectInput {
    className?: string;
    label?: string;
    error?: boolean | string;
    helperText?: string;
    name?: string;
    options: Array<OptionType>;
}

const CustomSelectInput: React.FC<ICustomSelectInput> = forwardRef<HTMLSelectElement, ICustomSelectInput>(
    ({ name, helperText, options, error, label, className, ...rest }, ref) => {
        const uid = useId();
        return (
            <FormControl className={className}>
                {label ? (
                    <FormLabel htmlFor={uid + name} className="mb-1.5 block text-sm font-medium text-gray-700">
                        {label}
                    </FormLabel>
                ) : null}
                <Select
                    ref={ref}
                    placeholder="Select option"
                    id={uid + name}
                    background={'white'}
                    name={name}
                    focusBorderColor="brand.500"
                    {...rest}
                >
                    {options.map((option) => (
                        <option value={option?.value}>{option?.label}</option>
                    ))}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        );
    }
);

export default CustomSelectInput;
