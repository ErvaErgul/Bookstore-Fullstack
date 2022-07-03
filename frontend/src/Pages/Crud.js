import ActiveTab from "../Components/Crud/ActiveTab"
import OperationHistory from "../Components/Crud/OperationHistory"
import BookTable from "../Components/Crud/BookTable"

const Crud = () => {

  return (
    <div className="flex-column px-1 mt-1" id="applicationPage">
      <ActiveTab />
      <OperationHistory />
      <BookTable />
    </div>
  )

}

export default Crud