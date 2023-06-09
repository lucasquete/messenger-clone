import { IconType } from "react-icons";

const AuthSocialButton = ({icon: Icon, onClick}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="inline-flex w-full justify-center py-2 px-4 bg-white rounded-md text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
        <Icon/>
    </button>
  )
}

export default AuthSocialButton