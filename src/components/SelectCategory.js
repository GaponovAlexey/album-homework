import React from 'react'

export const SelectCategory = ({ option, title, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled value=''>
        {title}
      </option>
      {option.map((el, index) => (
        <option key={el.id} value={el.value}>
          {el.id}
        </option>
      ))}
    </select>
  )
}
