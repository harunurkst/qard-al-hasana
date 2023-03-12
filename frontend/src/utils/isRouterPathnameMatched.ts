import isStringMatched from './isStringMatched';

const isRouterPathnameMatched = (pathname: string, routerPath: string, exact: boolean) => {
    let isMatch = false;

    if (exact) {
        isMatch = pathname === routerPath;
    } else {
        isMatch = isStringMatched(routerPath, pathname);
    }

    return isMatch;
};

export default isRouterPathnameMatched;
