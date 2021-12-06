import React, { useContext, useEffect, useState } from 'react';
import { Columns, Icon } from 'react-bulma-components';
import { CourseContext } from '../../context';
import { updateModel } from '../../utils';

export const MeetingItem = ({ _id, property, value, idx }) => {

    const [itemToEdit, setItemToEdit] = useState();
    const [input, setInput] = useState(value);
    const [val, setVal] = useState();
    const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext)

    const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim()
    const handleInputChange = ({ target: { value } }) => setInput(value);

    const handleCancelEdit = () => {
        setItemToEdit()
        setInput(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateModel('meeting', { _id, [property]: input });
            // target the current property being edited of the selected meeting in the selected course
            const thisCourse = { ...allCourses[selectedCourse] }
            const allMeetings = { ...thisCourse.meetings }
            const thisMeeting = { ...allMeetings[_id] }

            setAllCourses({
                ...allCourses,
                [selectedCourse]: {
                    ...thisCourse,
                    meetings: {
                        ...allMeetings,
                        [_id]: {
                            ...thisMeeting,
                            [property]: input
                        }
                    }
                }
            })

        } catch (error) {
            console.log(error);
            setInput(value)
        }
        setItemToEdit();
    }


    useEffect(() => {
        switch (property) {
            case 'gitHubUsername':
                return setVal(
                    <a href={`https://github.com/${value}`} target="_blank" rel='noreferrer'>{`https://github.com/${value}`}</a>
                );
            case 'zoomLink':
                return setVal(
                    <a href={value} target="_blank" rel='noreferrer'>{value}</a>
                );
            case 'graduationDate':
                return setVal(
                    <span>{new Date(value * 1000).toLocaleDateString()}</span>
                );
            case 'createdAt':
                return setVal(
                    <span>{String(new Date(value * 1000))}</span>
                );
            default:
                return setVal(
                    <span>{`${value}`}</span>
                );
        };
    }, [property, value]);


    useEffect(() => {
        if (!property || !itemToEdit) return
        document.querySelector(`input[name=${property}]`).focus()
    }, [itemToEdit, property])


    return (
        <form name='theForm' onSubmit={handleSubmit}>
            <Columns
                renderAs='li'
                // breakpoint='mobile'
                className={`meeting-item m-0  ${idx % 2 !== 0 && 'has-background-grey-lighter rounded'}`}
            >
                <Columns.Column
                    size={3}
                    align='left'
                >
                    {`${property}:`}

                </Columns.Column>
                <Columns.Column
                    className=' ml-5'
                >
                    {
                        itemToEdit === property
                            ? <input type='input' name={property} value={input} onChange={handleInputChange} />
                            // check for booleans and render with a color code
                            : val
                    }
                    {
                        itemToEdit === property
                            ?
                            <>
                                < Icon className='ml-4' onClick={handleCancelEdit}>
                                    <i className="far fa-times-circle hover has-text-info"></i>
                                </Icon>
                                {inputHasBeenModified() &&
                                    < Icon className='ml-4' onClick={handleSubmit}>
                                        <i className="far fa-save hover has-text-success"></i>
                                    </Icon>
                                }
                            </>
                            : property !== 'createdAt' &&
                            < Icon className='ml-4' onClick={() => setItemToEdit(property)}>
                                <i className="fas fa-pen hover icon-small has-text-info"></i>
                            </Icon>
                    }

                </Columns.Column>
            </Columns>
        </form >
    );
};