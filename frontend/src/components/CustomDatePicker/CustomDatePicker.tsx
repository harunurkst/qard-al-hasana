import { FormLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
    label: string;
    setDate: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, setDate }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setDate(formatDate(startDate));
    }, [startDate]);

    return (
        <>
            <FormLabel className="mb-1.5 block text-sm font-medium text-gray-700">{label}</FormLabel>
            <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
        </>
    );
};

export default CustomDatePicker;
