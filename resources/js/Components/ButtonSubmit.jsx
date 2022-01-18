import React from 'react';

export default function ButtonSubmit({processing, label, optionalClass = null}) {
    return (
        <button type="submit"
                className={`btn btn-primary font-weight-bold ${optionalClass} ${processing && ('spinner spinner-sm spinner-white spinner-right')}`}
                disabled={processing}>
            {label}
        </button>
    )
}
