const removeNullOrEmpty = <T extends { [x: string]: any }>(obj: T) => {
    Object.keys(obj).forEach(
        (key) =>
            (obj[key] && typeof obj[key] === 'object' && removeNullOrEmpty(obj[key])) ||
            ((obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key])
    );
    return obj;
};

export default removeNullOrEmpty;
