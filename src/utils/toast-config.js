import { toast } from "react-toastify"

const editConfig = {
    position: toast.POSITION.TOP_RIGHT,
    type: toast.TYPE.SUCCESS
}

const newSubjectConfig = {
    position: toast.POSITION.BOTTOM_RIGHT,
}

const generalError = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000
}

const commissionError = {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 4000
}

export { editConfig, newSubjectConfig, commissionError, generalError }