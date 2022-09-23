import React from 'react'

function SearchCompont() {
  return (
    <>
      <div className="container-fluid bg-primary">
        <div className="container py-5">
          <div className="text-center mx-auto mb-3" style={{ maxWidth: 500 }}>
            <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Find A Health Practitioner</h5>
          </div>
          <div className="mx-auto" style={{ width: '100%', maxWidth: 600 }}>
            <div className="input-group">
              <select className="form-select border-primary w-25" style={{ height: 60 }} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>choose category</option>
                <option value="1">Department 1</option>
                <option value="2">Department 2</option>
                <option value="3">Department 3</option>
              </select>
              <input type="text" className="form-control border-primary w-50" placeholder="Keyword" />
              <button className="btn btn-dark border-0 w-25">Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchCompont