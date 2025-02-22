
export default function DroppableBox({ count = 4 }) {
    const dropBoxes = [];

    //Max count
    if (count > 6) count = 6;
  
    // Generate DropBox components dynamically
    for (let i = 0; i < count; i++) {
      dropBoxes.push(<DropBox key={i} />);
    }
  
    return <div className="horizontal-flex">{dropBoxes}</div>;
  }
  
  function DropBox() {
    return (
      <div className="drop-box">
        
      </div>
    );
  }
  