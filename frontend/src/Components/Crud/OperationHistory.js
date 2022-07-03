import useZustand from "../../Hooks/useZustand"

import Operation from "./Operation"

const OperationHistory = () => {

  const crudOperationHistory = useZustand(state => state.crudOperationHistory)

  return (
    <div className="flex flex-none flex-order-0 min240max480 mx-auto my-1 overflow-hidden surface-card" style={{ gap: "1px" }}>
      {crudOperationHistory.map((element, index) => {
        return (
          <Operation key={index} index={index} operation={element} />
        )
      })}
    </div>
  )

}

export default OperationHistory