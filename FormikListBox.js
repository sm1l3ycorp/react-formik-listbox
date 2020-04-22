import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../FormComponents/Formik.module.css';
import { Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const popover = (message) => (
  <Popover id="popover-basic">
    <Popover.Content>
      {message}
    </Popover.Content>
  </Popover>
);

const FormikListBox = ({ label, name, size, items, removeText, infoText, error }) => {
  const [listBox, setListBox] = useState(['']);
  const [selectedItem, setSelectedItem] = useState('');
  const [showItemInfo, setShowItemInfo] = useState(false);

  useEffect(() => {
    setListBox(items);
  }, [listBox, items],);

  const selectItem = (e) => {
    setSelectedItem(e.target.value);
  };

  const removeItem = () => {
    if (selectedItem) {
      const itemIndex = items.indexOf(selectedItem);
      items.splice(itemIndex, 1);
      setListBox([items]);
      setSelectedItem('');
    }
  };

  return (
        <>
        <Modal show={showItemInfo} onHide={() => setShowItemInfo(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Item #####</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>INFO 1</li>
              <li>INFO 2</li>
              <li>INFO 3</li>
            </ul>
          </Modal.Body>
        </Modal>
            <label className={`${styles.listBoxLabel}`}>{label}</label>
              <select size={size} className={`form-control ${styles.listBox}`} name={name}>
                {listBox.map((item, i) => <option key={i} value={item} onClick={selectItem}>{item}</option>)}
              </select>
              {error ? (<div className="error">{error}</div>) : null}
              <OverlayTrigger trigger="hover" placement="right" overlay={popover(removeText)}>
                <FontAwesomeIcon icon="trash-alt" className={`${styles.icon}`} onClick={removeItem} />
              </OverlayTrigger>

              <OverlayTrigger trigger="hover" placement="right" overlay={popover(infoText)}>
                <FontAwesomeIcon icon="info-circle" className={`${styles.icon} ${styles.iconInfo}`} onClick={() => setShowItemInfo(true)} />
              </OverlayTrigger>
        </>
  );
};

FormikListBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  removeText: PropTypes.string.isRequired,
  infoText: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormikListBox;
