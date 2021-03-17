import React, { useState, ChangeEvent, MouseEvent, KeyboardEvent } from "react";

interface Props {
    suggestions: string[];
}

interface State {
    activeSugggestion: number;
    filteredSuggestions: string[];
    showSuggestion: boolean;
    userInput: string;
}

const Autocomplete = ({ suggestions  }: Props): JSX.Element => {
    const [state, setState] = useState<State>({
        activeSugggestion: 0,
        filteredSuggestions: [],
        showSuggestion: false,
        userInput: "",
    });

    const {userInput, activeSugggestion, filteredSuggestions, showSuggestion} = state

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )
        setState(state => ({
            ...state,
            filteredSuggestions,
            showSuggestion: true,
            userInput: e.target.value
        }))
    }

    const onClick = (e:MouseEvent<HTMLElement>) => {
        setState(state => ({
            ...state,
            activeSugggestion: 0,
            filteredSuggestions: [],
            showSuggestion: false,
            userInput: e.currentTarget.innerText,
        }))
    }

    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        // enter key
        if (e.keyCode === 13) {
            setState(state => ({
                ...state,
                activeSugggestion: 0,
                showSuggestion: false,
                userInput: filteredSuggestions[activeSugggestion]
            }))
            // up arrow
        } else if (e.keyCode === 38) {
            if (activeSugggestion === 0) return;
            setState(state => ({
                ...state,
                activeSugggestion: activeSugggestion - 1
            }))
            // down arrow
        } else if (e.keyCode === 40) {
            if (activeSugggestion -1 === filteredSuggestions.length) return;
            setState(state => ({
                ...state,
                activeSugggestion: activeSugggestion + 1
            }))
        }
    }

    // const ListComponent = (): JSX.Element => {
    //    if (showSuggestion && userInput) {
    //         if (filteredSuggestions.length < 1) {return <em>No suggestions!</em> }
    //        return  <ul>{filteredSuggestions.map((suggestion) => <li key={suggestion}>{suggestion}</li>)}</ul>
    //     } else {
    //        return (<em></em>)
    //    }
    // }

    let listComponent;
    if (showSuggestion && userInput) {
        if (filteredSuggestions.length > 1) {
            listComponent = (
                <ul>{filteredSuggestions.map((suggestion) => <li key={suggestion} onClick={onClick}>{suggestion}</li>)}</ul>
            )
        } else {
            listComponent = (<em>No suggestions!</em>)
        }
    }


    return (
        <>
        <input
            type="text"
            value={userInput}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={onKeyDown}
        />
            {listComponent}
        </>
    )
}

export default Autocomplete;

