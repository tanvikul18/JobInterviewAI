    import React from 'react'
    import { NavLink } from 'react-router-dom';
    import { useRouteError } from 'react-router-dom';
export default function Error() {
    const error = useRouteError();
  return (
    <div>
        Oops You got an error. Please check
        <p>{ error && error.data}</p>
        <NavLink to="/" className="underline text-blue">Go to Home Page</NavLink>
    </div>
  )
}

    