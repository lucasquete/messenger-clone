"use client"
import ReactSelect from "react-select";

const Select = ({disable, options, value, label, onChange}) => {
  return (
    <div className="z-[100]">
        <label className="block text-sm text-gray-900 font-medium">
            {label}
        </label>
        <div className="mt-2">
            <ReactSelect
                isDisabled={disable}
                value={value}
                onChange={onChange}
                isMulti
                options={options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 999
                    })
                }}
                classNames={{
                    control: () => "text-sm"
                }}
            />
        </div>
    </div>
  )
}

export default Select