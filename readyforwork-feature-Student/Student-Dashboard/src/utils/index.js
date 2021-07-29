import { login, logout, isLogin, getAuth, isAdmin } from './auth';
import isEmail from './isEmail';
import Validator, { config as validationConfig } from './validator';
import useQuery from './useQuery';
import useSearch from './useSearch';
import tableListChecked from './tableListChecked';
import usePagination from './usePagination';
import isValidURL from './isValidURL';

export {
    login,
    logout,
    isLogin,
    getAuth,
    isEmail,
    Validator,
    validationConfig,
    useQuery,
    useSearch,
    isAdmin,
    tableListChecked,
    usePagination,
    isValidURL
}