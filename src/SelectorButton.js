import React from "react";
const SelectorButton  = ({buttonNames, onSelection, selectionType}) => {
    switch(selectionType) {
      case 'Film Title':
        return buttonNames.map(_ => <button key={_.id} onClick={() => onSelection(_.title)}>{_.title}</button>)
      case 'Description':
        return buttonNames.map(_ => <button key={_.id} onClick={() => onSelection(_.description)}>{_.description}</button>)
      case 'Director':
        return buttonNames.map(_ => <button key={_.id} onClick={() => onSelection(_.director)}>{_.director}</button>)
      default:
        return buttonNames.map(_ => <button key={_.id} onClick={() => onSelection(_.title)}>{_.title}</button>)
    }
  }
  export default SelectorButton;