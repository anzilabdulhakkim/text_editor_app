import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [elements, setElements] = useState([]);
  const [selectedElementIndex, setSelectedElementIndex] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addText = () => {
    if (text.trim() === '') return;

    const newElement = {
      id: Date.now(),
      text,
      styles: {
        color: 'black',
        fontFamily: 'Arial',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textTransform: 'none',
      },
      position: {
        x: 50,
        y: 50,
      },
    };
    setElements([...elements, newElement]);
    setShowModal(false);
  };

  const updateSelectedElementStyle = (newStyle) => {
    if (selectedElementIndex !== null) {
      const updatedElements = elements.map((element, index) =>
        index === selectedElementIndex
          ? { ...element, styles: { ...element.styles, ...newStyle } }
          : element
      );
      setElements(updatedElements);
    }
  };

  const changeTextColor = (color) => updateSelectedElementStyle({ color });
  const changeFontFamily = (fontFamily) => updateSelectedElementStyle({ fontFamily });
  const changeFontSize = (fontSize) => updateSelectedElementStyle({ fontSize });
  const toggleBold = () => {
    updateSelectedElementStyle({
      fontWeight: elements[selectedElementIndex]?.styles.fontWeight === 'bold' ? 'normal' : 'bold',
    });
  };
  const toggleItalic = () => {
    updateSelectedElementStyle({
      fontStyle: elements[selectedElementIndex]?.styles.fontStyle === 'italic' ? 'normal' : 'italic',
    });
  };
  const toggleUppercase = () => {
    updateSelectedElementStyle({
      textTransform: elements[selectedElementIndex]?.styles.textTransform === 'uppercase' ? 'none' : 'uppercase',
    });
  };
  const toggleLowercase = () => {
    updateSelectedElementStyle({
      textTransform: elements[selectedElementIndex]?.styles.textTransform === 'lowercase' ? 'none' : 'lowercase',
    });
  };

  return (
    <div className="canvas-editor">
      <div className="toolbar">
        <button onClick={() => toggleBold()} style={{ fontWeight: elements[selectedElementIndex]?.styles.fontWeight }}>
          Bold
        </button>
        <button onClick={() => toggleItalic()} style={{ fontStyle: elements[selectedElementIndex]?.styles.fontStyle }}>
          Italic
        </button>
        <button onClick={() => toggleUppercase()}>Uppercase</button>
        <button onClick={() => toggleLowercase()}>Lowercase</button>
        <input type="color" onChange={(e) => changeTextColor(e.target.value)} />
        <select onChange={(e) => changeFontFamily(e.target.value)} defaultValue="Arial">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
        </select>
        <select onChange={(e) => changeFontSize(e.target.value)} defaultValue="16px">
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
        <Button className='addtext' onClick={() => setShowModal(true)}>Add Text</Button>
      </div>

      <div className="canvas">
        {elements.map((element, index) => (
          <Draggable
            key={element.id}
            defaultPosition={element.position}
            bounds="parent"
            onStop={(e, data) => {
              const updatedElements = elements.map((el, i) =>
                i === index ? { ...el, position: { x: data.x, y: data.y } } : el
              );
              setElements(updatedElements);
            }}
          >
            <div
              className="draggable-text"
              style={element.styles}
              onClick={() => setSelectedElementIndex(index)}
              contentEditable
              suppressContentEditableWarning
            >
              {element.text}
            </div>
          </Draggable>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows="4"
            cols="50"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addText}>
            Add Text
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TextEditor;
