
export default function DroppableBox({ count = 4, maxCount = 6 }) {
    const dropBoxes = [];

    //Max count
    if (count > maxCount) count = maxCount;
  
    // Generate DropBox components dynamically
    for (let i = 0; i < count; i++) {
      dropBoxes.push(<DropBox key={i} boxId={i}/>);
    }
  
    return <div className="horizontal-flex">{dropBoxes}</div>;
  }
  
  function DropBox({boxId}) {
    return (
      <div className="drop-box" id={boxId}>
        
      </div>
    );
  }