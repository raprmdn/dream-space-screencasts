import React, {useCallback, useEffect, useState} from 'react';
import {debounce, pickBy} from "lodash";
import {Inertia} from "@inertiajs/inertia";
import {usePrevious} from "react-use";
import {usePage} from "@inertiajs/inertia-react";

export default function SearchFilter({placeholder, identifier = []}) {
    const { filters } = usePage().props;
    const [ params, setParams ] = useState({
        search: filters.search || ''
    });
    const prevValues = usePrevious(params);
    const searchHandler = (e) => setParams({
        ...params,
        [e.target.name]: e.target.value
    })
    const searching = useCallback(
        debounce((params) => {
            Inertia.get(route(identifier ? route().current() : route().current(), identifier), pickBy(params), {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            });
        }, 200)
        ,
        []
    );
    useEffect(() => {
        if (prevValues) {
            searching(params)
        }
    }, [params]);
    return (
        <div>
            <div className="input-group input-group-solid">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="flaticon2-search-1 icon-md"/>
                    </span>
                </div>
                <input type="text"
                       name="search"
                       id="search"
                       value={params.search}
                       onChange={searchHandler}
                       className="form-control"
                       placeholder={placeholder}/>

            </div>
        </div>
    )
}
