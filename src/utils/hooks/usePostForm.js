import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/posts';

const initState = {
    title: "",
    message: "",
    tags: [],
    isPrivate: false,
    selectedFiles: []
};
export const usePostForm = (initialState = initState) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState(null);

    const onSubmit = () => {
        setErrors(null);
        const { valid, validateErrors } = validate()
        if(valid) {
            dispatch(createPost(values));
            clearForm();
        } else {
            console.log(validateErrors);
            setErrors(validateErrors)
        }
    }
    const clearForm = () => {
        setErrors(null)
        setValues(initialState);
    }
    const handleAddChip = (chip) => {
        setValues({...values, tags: [...values.tags, chip]})
    }
    const handleRemoveChip= (chip, index) => {
        let copyChip = values.tags.filter(tag => tag !== chip)
        setValues({...values, tags: copyChip})
    }
    const validate = () => {
        const validateErrors = {};
        if(values.title.trim() === "" || values.title === "") validateErrors.title = "This field is empty, 😝";
        if(values.selectedFiles.length === 0) validateErrors.selectedFiles = "There is no file, 😝";
        return {
            valid: Object.keys(validateErrors).length === 0,
            validateErrors
        }
    }
    const setForm = (field, value) => {
        switch (field) {
            case 'title': {
                setValues({...values, title: value})
                break;
            }
            case 'message': {
                setValues({...values, message: value})
                break;
            }
            case 'tags' : {
                setValues({...values, tags: value})
                break;
            } 
            case 'isPrivate': {
                setValues({...values, isPrivate: value})
                break;
            }
            case 'selectedFiles': {
                setValues({...values, selectedFiles: value})
                break;
            }
            default:
                break;
        }
    }

    return { values, errors, validate, onSubmit, handleAddChip, handleRemoveChip, setForm, clearForm };
}